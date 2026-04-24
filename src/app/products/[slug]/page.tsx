import { notFound } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/lib/schema";
import AddToCartButton from "@/components/products/AddToCartButton";

async function getProduct(slug: string): Promise<Product | null> {
  const mock: Record<string, Product> = {
    "phulkari-dupatta": { id: "1", name: "Phulkari Dupatta", slug: "phulkari-dupatta", description: "Hand-embroidered phulkari dupatta in vibrant colors. Made with pure cotton fabric and traditional embroidery by skilled artisans.", price: 1299, images: "[]", category: "Handloom", stock: 10, featured: 1, createdAt: new Date().toISOString() },
    "handloom-cotton-saree": { id: "2", name: "Handloom Cotton Saree", slug: "handloom-cotton-saree", description: "Pure cotton handloom saree with traditional motifs. Lightweight and comfortable for daily wear.", price: 2499, images: "[]", category: "Handloom", stock: 5, featured: 1, createdAt: new Date().toISOString() },
    "silk-cushion-covers": { id: "3", name: "Silk Cushion Covers (Set of 2)", slug: "silk-cushion-covers", description: "Luxurious silk cushion covers with embroidered patterns. Perfect to elevate your living room decor.", price: 899, images: "[]", category: "Decor", stock: 20, featured: 0, createdAt: new Date().toISOString() },
    "handwoven-bedsheet": { id: "4", name: "Handwoven Bedsheet", slug: "handwoven-bedsheet", description: "Soft pure cotton handwoven bedsheet with 2 pillow covers. Breathable and durable for all seasons.", price: 1899, images: "[]", category: "Bedding", stock: 8, featured: 1, createdAt: new Date().toISOString() },
    "woolen-shawl": { id: "5", name: "Woolen Shawl", slug: "woolen-shawl", description: "Warm handloom woolen shawl with traditional Punjabi border. Perfect for winters.", price: 1499, images: "[]", category: "Handloom", stock: 12, featured: 0, createdAt: new Date().toISOString() },
    "table-runner": { id: "6", name: "Table Runner", slug: "table-runner", description: "Handwoven cotton table runner with golden thread work. Adds elegance to any dining table.", price: 599, images: "[]", category: "Decor", stock: 15, featured: 0, createdAt: new Date().toISOString() },
  };
  return mock[slug] ?? null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const images: string[] = product.images ? JSON.parse(product.images) : [];
  const mainImage = images[0] ?? null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center text-8xl">
          {mainImage ? (
            <Image src={mainImage} alt={product.name} fill className="object-cover" />
          ) : (
            "🧵"
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-gold text-sm font-semibold uppercase tracking-wide mb-2">{product.category}</span>
          <h1 className="text-3xl font-bold text-navy mb-3">{product.name}</h1>
          <p className="text-3xl font-bold text-navy mb-4">₹{product.price.toLocaleString()}</p>

          {product.stock === 0 ? (
            <span className="inline-block bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full mb-4 w-fit">
              Out of Stock
            </span>
          ) : (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4 w-fit">
              In Stock ({product.stock} left)
            </span>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <AddToCartButton product={product} />

          <div className="mt-6 pt-6 border-t text-sm text-gray-500 space-y-2">
            <p>Free delivery on orders above ₹2,000</p>
            <p>Easy returns within 7 days</p>
            <a href="https://wa.me/919888853500" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline block">
              Questions? Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
