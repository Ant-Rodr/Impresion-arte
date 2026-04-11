"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NuevoPedidoRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/personalizado"); }, [router]);
  return null;
}
