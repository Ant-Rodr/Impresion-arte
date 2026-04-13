import { Resend } from "resend";

export async function sendCatalogOrderEmail(data: {
  customerName: string;
  customerEmail: string;
  orderId: string;
  totalPrice: number;
  items?: Array<{ name: string; price: number; qty: number }>;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_xxx")) {
    console.log("[Email simulado - configura RESEND_API_KEY]", data);
    return { success: true, simulated: true };
  }

  const resend = getResend();
  const itemsHtml = data.items
    ? data.items
        .map(
          (i) =>
            `<tr><td style="padding:6px 0;">${i.name}</td><td style="padding:6px 0;text-align:right;">${i.qty} × ${i.price.toFixed(2)}€</td></tr>`
        )
        .join("")
    : "";

  // Notificación al negocio
  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@impresion-arte.es",
    to: process.env.EMAIL_TO ?? "info@impresion-arte.es",
    subject: `[Pedido Catálogo] ${data.customerName} — ${data.orderId.slice(0, 8).toUpperCase()} — ${data.totalPrice.toFixed(2)}€`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#6C3CE1;">Nuevo pedido de catálogo pagado</h2>
        <p><strong>ID:</strong> ${data.orderId}</p>
        <p><strong>Cliente:</strong> ${data.customerName} (${data.customerEmail})</p>
        <p><strong>Total:</strong> ${data.totalPrice.toFixed(2)}€</p>
        ${itemsHtml ? `<table style="width:100%;border-top:1px solid #eee;margin-top:12px;">${itemsHtml}</table>` : ""}
      </div>
    `,
  });

  // Confirmación al cliente
  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@impresion-arte.es",
    to: data.customerEmail,
    subject: `Pedido confirmado — Impresion-arte #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#6C3CE1;">¡Gracias, ${data.customerName}!</h2>
        <p>Hemos recibido tu pago y tu pedido está en preparación.</p>
        <p><strong>Referencia:</strong> #${data.orderId.slice(0, 8).toUpperCase()}</p>
        <p><strong>Total:</strong> ${data.totalPrice.toFixed(2)}€</p>
        ${
          itemsHtml
            ? `<table style="width:100%;border-top:1px solid #eee;margin-top:12px;font-size:14px;">${itemsHtml}</table>`
            : ""
        }
        <hr style="border-color:#eee;margin-top:20px;" />
        <p style="font-size:13px;color:#999;">Puedes consultar el estado de tu pedido en <a href="${process.env.NEXTAUTH_URL}/mis-pedidos" style="color:#6C3CE1;">mis-pedidos</a>.</p>
        <p style="color:#999;font-size:12px;">Impresion-arte · info@impresion-arte.es</p>
      </div>
    `,
  });
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

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

  const resend = getResend();
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

  const resend = getResend();
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
