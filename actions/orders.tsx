"use server"

import db from "@/db/db";
import OrderHistoryEmail from "@/email/OrderHistory";
import { Resend } from "resend";
import { z } from "zod"
import Stripe from "stripe"
import { getDiscountedAmount, usableDiscountCodeWhere } from "@/lib/discountCodeHelpers";

const emailSchema = z.string().email()
const resend = new Resend(process.env.RESEND_API_KEY as string)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const emailOrderHistory = async (prevState: unknown, formData: FormData): Promise<{ message?: string; error?: string; }> => {
    const result = emailSchema.safeParse(formData.get("email"))

    if (result.success === false) {
        return { error: "Invalid email" }
    }

    const user = await db.user.findUnique({
        where: { email: result.data },
        select: {
            email: true,
            orders: {
                select: {
                    pricePaidInCents: true,
                    id: true,
                    createdAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            imagePath: true,
                            description: true
                        }
                    }
                }
            }
        }
    })

    if (user == null) {
        return { message: "Check your email to view your order history and download your products." }
    }

    const orders = user.orders.map(async (order) => {
        return {
            ...order,
            downloadVerificationId: (await db.downloadVerification.create({
                data: {
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
                    productId: order.product.id
                },
            })).id
        }
    })

    const data = await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: user.email,
        subject: "Order History",
        react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
    })

    if (data.error) {
        return { error: "There was an error sending the email. Please try again." }
    }
    return { message: "Check your email to view your order history and download your products." }
}

export const createPaymentIntent = async (email: string, productId: string, discountCodeId?: string) => {
    const product = await db.product.findUnique({ where: { id: productId } })

    if (product == null) return { error: "Unexpected error" }

    const discountCode = discountCodeId == null ? null : await db.discountCode.findUnique({
        where: { id: discountCodeId, ...usableDiscountCodeWhere(product.id) }
    })

    if (discountCode == null && discountCodeId != null) {
        return { error: "Coupon has expired" }
    }

    const existingOrder = await db.order.findFirst({ where: { user: { email }, productId }, select: { id: true } })

    if (existingOrder != null) {
        return { error: "You have already purchased this product. Try downloading it from the My Orders page." }
    }

    const amount = discountCode == null ? product.priceInCents : getDiscountedAmount(discountCode, product.priceInCents)

    const customer = await stripe.customers.create({
        name: 'Jenny Rosen',
        address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
        },
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: product.description,
        customer: customer.id,
        metadata: {
            productId: product.id,
            discountCodeId: discountCode?.id || null,
        },
    })

    if (paymentIntent.client_secret == null) {
        return { error: "Unknown error" }
    }

    return { clientSecret: paymentIntent.client_secret }
}