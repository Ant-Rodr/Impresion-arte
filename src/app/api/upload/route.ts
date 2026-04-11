import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_EXTENSIONS = ["stl", "obj", "3mf"];
const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "El archivo supera el límite de 50 MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: "Formato no permitido. Solo .STL, .OBJ o .3MF" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const safeFilename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, safeFilename), buffer);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileUrl: `/uploads/${safeFilename}`,
      fileSize: file.size,
    });
  } catch (err) {
    console.error("[API /upload]", err);
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 });
  }
}
