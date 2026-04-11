import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    });

    await sendContactEmail({ name, email, subject, message });

    return NextResponse.json({ success: true, id: contact.id });
  } catch (err) {
    console.error("[API /contact]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
