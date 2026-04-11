import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia",
});

export async function createCheckoutSession(items: Array<{
  name: string;
  price: number;
  quantity: number;
  image?: string;
}>) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    locale: "es",
    line_items: items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/catalogo`,
    metadata: {
      source: "catalog",
    },
  });

  return session;
}
