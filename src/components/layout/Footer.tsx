import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-gold font-bold text-lg mb-3">Harman Handloom & Decor</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Weaving tradition into every thread. Premium handloom fabrics and home decor at 515 Sector 123, Sunny Enclave.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/products" className="hover:text-gold transition-colors">Shop</Link></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>515 Sector 123, Sunny Enclave</li>
            <li>
              <a href="tel:+919888853500" className="hover:text-gold transition-colors">
                +91 98888 53500
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919888853500"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-light text-center text-xs text-gray-400 py-4">
        &copy; {new Date().getFullYear()} Harman Handloom & Decor. All rights reserved.
      </div>
    </footer>
  );
}
