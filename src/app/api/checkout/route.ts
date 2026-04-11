import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith("sk_test_xxx")) {
      return NextResponse.json(
        { error: "Stripe no configurado. Añade STRIPE_SECRET_KEY en .env" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    const session = await createCheckoutSession(items);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[API /checkout]", err);
    return NextResponse.json({ error: "Error al crear sesión de pago" }, { status: 500 });
  }
}
