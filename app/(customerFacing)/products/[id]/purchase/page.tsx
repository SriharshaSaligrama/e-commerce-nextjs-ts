import db from '@/db/db'
import { notFound } from 'next/navigation'
import CheckoutForm from './_components/CheckoutForm'
import { usableDiscountCodeWhere } from '@/lib/discountCodeHelpers'


const ProductPurchasePage = async ({ params: { id }, searchParams: { coupon } }: { params: { id: string }, searchParams: { coupon: string } }) => {
    const product = await db.product.findUnique({ where: { id } })

    if (product == null) return notFound()

    const discountCode = coupon == null ? undefined : await getDiscountCode(coupon)

    return (
        <CheckoutForm
            discountCode={discountCode || undefined}
            product={product}
        />
    )
}

export default ProductPurchasePage

const getDiscountCode = (coupon: string) => {
    return db.discountCode.findUnique({
        select: { id: true, discountAmount: true, discountType: true },
        where: { ...usableDiscountCodeWhere, code: coupon }
    })
}