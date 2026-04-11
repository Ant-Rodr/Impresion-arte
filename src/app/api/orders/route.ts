import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, material, acabado, description, fileUrl, fileName } = body;

    if (!name || !email || !material || !acabado || !description) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        type: "custom",
        status: "pending",
        customerName: name,
        customerEmail: email,
        material,
        acabado,
        description,
        fileUrl: fileUrl ?? null,
        fileName: fileName ?? null,
      },
    });

    await sendOrderEmail({
      customerName: name,
      customerEmail: email,
      orderId: order.id,
      material,
      acabado,
      description,
      fileName,
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error("[API /orders]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });
  }

  const orders = await prisma.order.findMany({
    where: { customerEmail: email },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      status: true,
      material: true,
      acabado: true,
      totalPrice: true,
      createdAt: true,
    },
  });

  return NextResponse.json(orders);
}
