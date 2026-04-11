export type OrderStatus =
  | "pending"
  | "confirmed"
  | "printing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type MaterialId = "pla" | "pla-silk" | "petg" | "resin";
export type AcabadoId = "raw" | "sand" | "primer" | "paint";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  material: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderSummary {
  id: string;
  type: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  totalPrice?: number;
  createdAt: string;
}
