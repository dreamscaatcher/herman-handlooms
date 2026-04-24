"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });

  const cartTotal = total();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Failed to load payment gateway. Check your connection.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartTotal }),
    });
    const { orderId, amount } = await res.json() as { orderId: string; amount: number };

    const rzp = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency: "INR",
      name: "Harman Handloom & Decor",
      description: "Order payment",
      order_id: orderId,
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: "#c9a84c" },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        const verify = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            order: { ...form, total: cartTotal, items: JSON.stringify(items) },
          }),
        });
        const { orderId: newOrderId } = await verify.json() as { orderId: string };
        clearCart();
        router.push(`/orders/${newOrderId}`);
      },
    });

    rzp.open();
    setLoading(false);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <a href="/products" className="text-gold font-semibold hover:underline">Browse products &rarr;</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-navy mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-semibold text-navy text-lg">Delivery Details</h2>

          {[
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email (optional)", type: "email", required: false },
            { name: "phone", label: "Phone Number", type: "tel", required: true },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                required={f.required}
                value={form[f.name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              required
              rows={3}
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "city", label: "City" },
              { name: "pincode", label: "Pincode" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  name={f.name}
                  type="text"
                  required
                  value={form[f.name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-white py-3 rounded font-semibold text-lg hover:bg-gold-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Processing..." : `Pay ₹${cartTotal.toLocaleString()}`}
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <h2 className="font-semibold text-navy text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.qty}</span></span>
                <span className="font-medium text-navy">₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-navy text-lg">
            <span>Total</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">Payments secured by Razorpay</p>
        </div>
      </div>
    </div>
  );
}
