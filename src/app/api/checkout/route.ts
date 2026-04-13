import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe no configurado. Añade STRIPE_SECRET_KEY en .env" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { items, customerName, customerEmail } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    if (!customerName?.trim() || !customerEmail?.trim()) {
      return NextResponse.json({ error: "Nombre y email son obligatorios" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    const totalPrice = items.reduce(
      (sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity,
      0
    );

    // Crear Order en DB ANTES de ir a Stripe
    const order = await prisma.order.create({
      data: {
        type: "catalog",
        status: "pending",
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        totalPrice,
        description: JSON.stringify(
          items.map((i: { name: string; price: number; quantity: number }) => ({
            name: i.name,
            price: i.price,
            qty: i.quantity,
          }))
        ),
      },
    });

    // Crear sesión de Stripe con orderId en metadata
    const session = await createCheckoutSession(items, {
      customerEmail: customerEmail.trim().toLowerCase(),
      orderId: order.id,
    });

    // Guardar el ID de sesión Stripe en la order
    await prisma.order.update({
      where: { id: order.id },
      data: { stripePaymentId: session.id },
    });

    return NextResponse.json({ url: session.url, orderId: order.id });
  } catch (err) {
    console.error("[API /checkout]", err);
    return NextResponse.json({ error: "Error al crear sesión de pago" }, { status: 500 });
  }
}
