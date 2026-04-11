import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_xxx")) {
    console.log("[Email simulado - configura RESEND_API_KEY]", data);
    return { success: true, simulated: true };
  }

  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@impresion-arte.es",
    to: process.env.EMAIL_TO ?? "info@impresion-arte.es",
    replyTo: data.email,
    subject: `[Contacto Web] ${data.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6C3CE1;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Asunto:</strong> ${data.subject}</p>
        <hr style="border-color: #eee;" />
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    `,
  });
}

export async function sendOrderEmail(data: {
  customerName: string;
  customerEmail: string;
  orderId: string;
  material: string;
  acabado: string;
  description: string;
  fileName?: string;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_xxx")) {
    console.log("[Email simulado - configura RESEND_API_KEY]", data);
    return { success: true, simulated: true };
  }

  // Email al negocio
  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@impresion-arte.es",
    to: process.env.EMAIL_TO ?? "info@impresion-arte.es",
    subject: `[Pedido Personalizado] ${data.customerName} — ${data.orderId.slice(0, 8)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6C3CE1;">Nuevo pedido personalizado</h2>
        <p><strong>ID:</strong> ${data.orderId}</p>
        <p><strong>Cliente:</strong> ${data.customerName} (${data.customerEmail})</p>
        <p><strong>Material:</strong> ${data.material}</p>
        <p><strong>Acabado:</strong> ${data.acabado}</p>
        ${data.fileName ? `<p><strong>Archivo:</strong> ${data.fileName}</p>` : ""}
        <hr style="border-color: #eee;" />
        <p style="white-space: pre-wrap;">${data.description}</p>
      </div>
    `,
  });

  // Confirmación al cliente
  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@impresion-arte.es",
    to: data.customerEmail,
    subject: "Hemos recibido tu solicitud — Impresion-arte",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6C3CE1;">¡Solicitud recibida, ${data.customerName}!</h2>
        <p>Hemos recibido tu pedido personalizado (ref: <strong>${data.orderId.slice(0, 8).toUpperCase()}</strong>).</p>
        <p>Te enviaremos un presupuesto detallado en menos de <strong>24 horas</strong>.</p>
        <hr style="border-color: #eee;" />
        <p style="color: #999; font-size: 12px;">Impresion-arte · info@impresion-arte.es</p>
      </div>
    `,
  });
}
