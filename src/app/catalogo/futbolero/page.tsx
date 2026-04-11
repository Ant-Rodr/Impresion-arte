import { redirect } from "next/navigation";

// Categoría eliminada — redirige al catálogo principal
export default function FutboleroRedirect() {
  redirect("/catalogo");
}
