"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useCart((s) => s.count());

  return (
    <>
      <header className="bg-navy text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-gold font-bold text-xl tracking-wide">
            Harman Handloom
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 hover:text-gold transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                }
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden bg-navy-dark border-t border-navy-light px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-gold transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
