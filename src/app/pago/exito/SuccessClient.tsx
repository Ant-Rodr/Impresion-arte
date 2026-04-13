"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const { clear } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    clear();
  }, [clear]);

  if (!orderId) return null;

  return (
    <p className="text-sm font-mono text-gray-400 mt-2">
      Referencia: <span className="font-semibold text-gray-600 dark:text-gray-300">#{orderId.slice(0, 8).toUpperCase()}</span>
    </p>
  );
}
