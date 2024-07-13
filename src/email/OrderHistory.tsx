import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name",
        description: "Some description",
        imagePath:
          "/products/456ed650-7e6c-408f-8a56-d8915f32380f-photo_2024-04-15_14-59-33.jpg",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 2000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name 2",
        description: "Some other desc",
        imagePath:
          "/products/22232ad1-e108-40a9-a879-97bfdc455348-435896513_949051780561431_4102423800911517662_n.jpg",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
