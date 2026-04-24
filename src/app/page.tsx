import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/schema";

async function getFeaturedProducts(): Promise<Product[]> {
  // In prod, fetch from D1 via the Cloudflare binding.
  // In local dev, returns empty so page renders without DB.
  return [];
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* Grand Opening Banner */}
      <div className="bg-gold text-white text-center text-sm py-2 px-4 font-medium">
        Grand Opening — Saturday, 4 April 2026 at 10:00 AM &nbsp;|&nbsp; 515 Sector 123, Sunny Enclave
      </div>

      {/* Hero */}
      <section className="bg-navy text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm font-semibold uppercase mb-4">Welcome to</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Harman Handloom<br />
            <span className="text-gold">&amp; Decor</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Weaving tradition into every thread — premium handloom fabrics and home decor for your living space.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="bg-gold text-white px-8 py-3 rounded font-semibold hover:bg-gold-dark transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="border border-gold text-gold px-8 py-3 rounded font-semibold hover:bg-gold/10 transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-navy text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Handloom Fabrics", desc: "Traditional weaves, rich textures", href: "/products?category=Handloom", emoji: "🧵" },
            { label: "Home Decor", desc: "Cushions, curtains & more", href: "/products?category=Decor", emoji: "🏡" },
            { label: "Bedding", desc: "Soft handcrafted bed covers", href: "/products?category=Bedding", emoji: "🛏️" },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="border-2 border-gold/30 rounded-xl p-6 text-center hover:border-gold hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <h3 className="font-bold text-navy text-lg group-hover:text-gold transition-colors">{cat.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-navy text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="inline-block border-2 border-navy text-navy px-8 py-3 rounded font-semibold hover:bg-navy hover:text-white transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Strip */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Our Craft</p>
          <h2 className="text-3xl font-bold text-navy mb-4">Tradition Woven With Love</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            At Harman Handloom &amp; Decor, every piece tells a story — carefully handcrafted using traditional weaving techniques passed down through generations. We bring authentic handloom products to your home, blending heritage with contemporary design.
          </p>
          <Link href="/about" className="text-gold font-semibold hover:underline">Learn more about us &rarr;</Link>
        </div>
        <div className="bg-navy/5 rounded-2xl aspect-video flex items-center justify-center text-6xl">
          🧵
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Visit Us at Our Grand Opening</h2>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          Join us on Saturday, 4 April 2026 at 10:00 AM. Followed by Sukhmani Sahib Path, Kirtan at 12 PM, and Guru Ka Langar at 1 PM.
        </p>
        <p className="text-gold font-semibold text-lg mb-6">515 Sector 123, Sunny Enclave</p>
        <a
          href="https://wa.me/919888853500"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold text-white px-8 py-3 rounded font-semibold hover:bg-gold-dark transition-colors"
        >
          RSVP on WhatsApp
        </a>
      </section>
    </>
  );
}
