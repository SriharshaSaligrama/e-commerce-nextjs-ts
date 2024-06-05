import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from "@react-email/components"
import OrderInformation from "./components/OrderInformation"
import { Fragment } from "react"

type OrderHistoryEmailProps = {
    orders: {
        id: string
        createdAt: Date
        pricePaidInCents: number,
        downloadVerificationId: string
        product: {
            name: string,
            description: string,
            imagePath: string
        }
    }[]
}

const OrderHistoryEmail = ({ orders }: OrderHistoryEmailProps) => {
    return (
        <Html>
            <Preview>Order History and Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => (
                            <Fragment key={order.id}>
                                <OrderInformation
                                    order={order}
                                    product={order.product}
                                    downloadVerificationId={order.downloadVerificationId}
                                />
                                {index < orders.length - 1 && <Hr />}
                            </Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default OrderHistoryEmail

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            product: {
                name: "Product name",
                description: "Some description",
                imagePath: "/products/7ac415a1-399c-47e5-847a-8f1a6fb5c222-phone img.png",
            },
            downloadVerificationId: crypto.randomUUID(),
        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            product: {
                name: "Product name 2",
                description: "Some other description",
                imagePath: "/products/6fe215e6-5adc-46cf-bcc1-5322e7b63369-address img.png",
            },
            downloadVerificationId: crypto.randomUUID(),
        }
    ],
} satisfies OrderHistoryEmailProps