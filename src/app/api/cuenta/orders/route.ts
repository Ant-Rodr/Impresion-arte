import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    // Detalle de un pedido concreto
    const order = await prisma.order.findFirst({
      where: { id, customerEmail: session.user.email },
      include: { items: { include: { product: true } } },
    });
    if (!order) return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    return NextResponse.json(order);
  }

  // Lista de pedidos del usuario
  const orders = await prisma.order.findMany({
    where: { customerEmail: session.user.email },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      status: true,
      material: true,
      acabado: true,
      totalPrice: true,
      createdAt: true,
      description: true,
      fileName: true,
    },
  });

  return NextResponse.json(orders);
}
