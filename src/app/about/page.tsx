export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4 text-center">
        <p className="text-gold uppercase tracking-widest text-sm font-semibold mb-3">Our Story</p>
        <h1 className="text-4xl font-bold mb-4">About Harman Handloom &amp; Decor</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          A labour of love — rooted in tradition, crafted for the modern home.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Harman Handloom &amp; Decor was born from a deep appreciation of traditional Punjabi weaving and craftsmanship. We believe that every home deserves the warmth and authenticity that only handmade textiles can provide.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Based in Sunny Enclave, we work directly with skilled artisans to bring you a curated collection of handloom fabrics, home decor, and bedding — each piece reflecting the rich textile heritage of Punjab.
            </p>
          </div>
          <div className="bg-gold/10 rounded-2xl aspect-video flex items-center justify-center text-7xl">
            🧵
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🤲", title: "Handcrafted", desc: "Every product made by skilled artisans with care" },
            { icon: "🌿", title: "Natural Materials", desc: "Pure cotton, silk & wool — no shortcuts" },
            { icon: "🏡", title: "Home First", desc: "Designed to bring warmth to your living spaces" },
          ].map((item) => (
            <div key={item.title} className="bg-navy/5 rounded-xl p-6">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-navy text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Visit Our Store</h2>
          <p className="text-gray-300 mb-4">
            Come experience our collection in person at our newly opened store.
          </p>
          <p className="text-gold font-semibold text-lg">515 Sector 123, Sunny Enclave</p>
          <p className="text-gray-300 text-sm mt-1">Open Monday – Saturday, 10:00 AM – 7:00 PM</p>
        </div>
      </div>
    </div>
  );
}
