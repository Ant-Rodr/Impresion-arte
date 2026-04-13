import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendCatalogOrderEmail } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret no configurado" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[Webhook Stripe] Firma inválida:", err);
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const order = await prisma.order.update({
          where: { id: orderId },
          data: { status: "confirmed" },
        });

        // Enviar email de confirmación al cliente
        try {
          const items = order.description
            ? (JSON.parse(order.description) as Array<{ name: string; price: number; qty: number }>)
            : undefined;

          await sendCatalogOrderEmail({
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            orderId: order.id,
            totalPrice: order.totalPrice ?? 0,
            items,
          });
        } catch (emailErr) {
          console.error("[Webhook] Error enviando email de confirmación:", emailErr);
        }
      } else {
        console.warn("[Webhook] checkout.session.completed sin metadata.orderId:", session.id);
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log("[Stripe] Pago fallido:", intent.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
