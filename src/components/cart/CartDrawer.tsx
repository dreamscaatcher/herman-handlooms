"use client";
import { useCart } from "@/lib/cart-store";
import Link from "next/link";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 bg-navy text-white">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <button onClick={onClose} className="text-gold text-2xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-8">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-start border-b pb-4">
              <div className="relative w-16 h-16 rounded shrink-0 overflow-hidden bg-gray-100">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy truncate">{item.name}</p>
                <p className="text-gold font-semibold text-sm">₹{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded border border-gray-300 text-sm flex items-center justify-center hover:bg-gray-100"
                  >-</button>
                  <span className="text-sm w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded border border-gray-300 text-sm flex items-center justify-center hover:bg-gray-100"
                  >+</button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-red-400 text-xs hover:text-red-600"
                  >Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between text-navy font-semibold mb-4">
              <span>Total</span>
              <span>₹{total().toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-gold text-white text-center py-3 rounded font-semibold hover:bg-gold-dark transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
