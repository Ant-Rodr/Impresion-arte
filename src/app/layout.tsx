import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "Impresionarte | Impresión 3D Profesional en España",
  description:
    "Servicio de impresión 3D profesional desde 4€. Gaming, cosplay, decoración, miniaturas de rol y piezas a medida. Envío 24-48h a toda España. Presupuesto instantáneo online.",
  keywords: [
    "impresión 3D España",
    "imprimir 3D online",
    "figuras resina personalizadas",
    "accesorios gaming impresos 3D",
    "miniaturas D&D impresión 3D",
    "cosplay props impresión 3D",
    "decoración 3D personalizada",
    "PLA PETG resina impresión",
    "presupuesto impresión 3D",
    "impresión 3D barata España",
  ],
  openGraph: {
    title: "Impresionarte | Impresión 3D Profesional en España",
    description:
      "Desde 4€ · Envío 24-48h · Sin pedido mínimo. Gaming, cosplay, decoración y piezas 100% personalizadas.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impresionarte | Impresión 3D Profesional en España",
    description: "Desde 4€ · Envío 24-48h · Sin pedido mínimo.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Raleway:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <SessionProviderWrapper>
          <CartProvider>
            <PageLoader />
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
