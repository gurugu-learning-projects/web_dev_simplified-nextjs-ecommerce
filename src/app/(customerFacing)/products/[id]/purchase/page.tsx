import { notFound } from "next/navigation";
import Stripe from "stripe";

import db from "@/db/db";
import { CheckoutForm } from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type PurchasePageProps = {
  params: {
    id: string;
  };
};

export default async function PurchasePage({
  params: { id },
}: PurchasePageProps) {
  const product = await db.product.findUnique({ where: { id } });

  if (product === null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if (paymentIntent === null) {
    throw new Error("Stripe failed to create payment intent");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
