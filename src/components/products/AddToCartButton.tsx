"use client";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/schema";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCart((s) => s.addItem);
  const images: string[] = product.images ? JSON.parse(product.images) : [];
  const thumb = images[0] ?? "";

  if (product.stock === 0) return null;

  return (
    <button
      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: thumb, slug: product.slug })}
      className="w-full bg-gold text-white py-3 rounded-lg font-semibold text-lg hover:bg-gold-dark transition-colors"
    >
      Add to Cart
    </button>
  );
}
