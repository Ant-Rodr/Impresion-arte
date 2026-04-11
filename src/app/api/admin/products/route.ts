import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "admin") return null;
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const { name, slug, description, price, material, category, tags, imageUrl, modelUrl, inStock } = body;

  if (!name || !slug || !description || price == null || !material || !category) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price: parseFloat(price),
      material,
      category,
      tags: Array.isArray(tags) ? tags.join(",") : tags ?? "",
      imageUrl: imageUrl || null,
      modelUrl: modelUrl || null,
      inStock: inStock ?? true,
    },
  });

  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const { id, ...data } = body;

  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  if (data.price != null) data.price = parseFloat(data.price);
  if (Array.isArray(data.tags)) data.tags = data.tags.join(",");

  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
