"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/schema";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCart((s) => s.addItem);
  const images: string[] = product.images ? JSON.parse(product.images) : [];
  const thumb = images[0] ?? "/placeholder.jpg";

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price, image: thumb, slug: product.slug });
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow bg-white">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={thumb}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-navy text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-gold font-semibold uppercase tracking-wide">{product.category}</span>
        <h3 className="font-semibold text-navy mt-1 truncate">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-navy">₹{product.price.toLocaleString()}</span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="bg-gold text-white text-sm px-3 py-1.5 rounded hover:bg-gold-dark transition-colors disabled:opacity-40"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
