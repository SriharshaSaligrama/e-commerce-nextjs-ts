import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components"
import OrderInformation from "./components/OrderInformation"

type PurchaseReceiptEmailProps = {
    product: {
        name: string,
        description: string,
        imagePath: string
    }
    order: {
        id: string
        createdAt: Date
        pricePaidInCents: number
    }
    downloadVerificationId: string
}

const PurchaseReceiptEmail = ({ product, order, downloadVerificationId }: PurchaseReceiptEmailProps) => {
    return (
        <Html>
            <Preview>Download {product.name} and view receipt</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation order={order} product={product} downloadVerificationId={downloadVerificationId} />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default PurchaseReceiptEmail

PurchaseReceiptEmail.PreviewProps = {
    product: {
        name: "Product name",
        description: "Some description",
        imagePath: "/products/7ac415a1-399c-47e5-847a-8f1a6fb5c222-phone-img.png",
    },
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInCents: 10000,
    },
    downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps