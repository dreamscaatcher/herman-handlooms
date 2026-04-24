import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/schema";

const CATEGORIES = ["All", "Handloom", "Decor", "Bedding"];

async function getProducts(category?: string): Promise<Product[]> {
  // In prod, fetch from D1. In local dev, returns mock data.
  const mock: Product[] = [
    { id: "1", name: "Phulkari Dupatta", slug: "phulkari-dupatta", description: "Hand-embroidered phulkari dupatta in vibrant colors", price: 1299, images: "[]", category: "Handloom", stock: 10, featured: 1, createdAt: new Date().toISOString() },
    { id: "2", name: "Handloom Cotton Saree", slug: "handloom-cotton-saree", description: "Pure cotton handloom saree with traditional motifs", price: 2499, images: "[]", category: "Handloom", stock: 5, featured: 1, createdAt: new Date().toISOString() },
    { id: "3", name: "Silk Cushion Covers (Set of 2)", slug: "silk-cushion-covers", description: "Luxurious silk cushion covers with embroidered patterns", price: 899, images: "[]", category: "Decor", stock: 20, featured: 0, createdAt: new Date().toISOString() },
    { id: "4", name: "Handwoven Bedsheet", slug: "handwoven-bedsheet", description: "Soft pure cotton handwoven bedsheet with pillow covers", price: 1899, images: "[]", category: "Bedding", stock: 8, featured: 1, createdAt: new Date().toISOString() },
    { id: "5", name: "Woolen Shawl", slug: "woolen-shawl", description: "Warm handloom woolen shawl with traditional Punjabi border", price: 1499, images: "[]", category: "Handloom", stock: 12, featured: 0, createdAt: new Date().toISOString() },
    { id: "6", name: "Table Runner", slug: "table-runner", description: "Handwoven cotton table runner with golden thread work", price: 599, images: "[]", category: "Decor", stock: 15, featured: 0, createdAt: new Date().toISOString() },
  ];
  if (category && category !== "All") return mock.filter((p) => p.category === category);
  return mock;
}

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const products = await getProducts(category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">Our Products</h1>
      <p className="text-gray-500 mb-8">Handcrafted with love — browse our full collection.</p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {CATEGORIES.map((cat) => {
          const active = (cat === "All" && !category) || cat === category;
          return (
            <a
              key={cat}
              href={cat === "All" ? "/products" : `/products?category=${cat}`}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                active
                  ? "bg-navy text-white border-navy"
                  : "border-gray-300 text-gray-600 hover:border-navy hover:text-navy"
              }`}
            >
              {cat}
            </a>
          );
        })}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
