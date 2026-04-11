import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ error: "Imagen demasiado grande (máx 5 MB)" }, { status: 400 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Formato no permitido. Usa JPG, PNG o WebP" }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `product-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");

    await mkdir(uploadDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

    return NextResponse.json({ url: `/uploads/products/${filename}` });
  } catch (err) {
    console.error("[upload-image]", err);
    return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
  }
}
