interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-navy mb-3">Order Confirmed!</h1>
      <p className="text-gray-600 mb-2">
        Thank you for your purchase. Your order has been received and will be delivered soon.
      </p>
      <p className="text-sm text-gray-400 mb-8">Order ID: <span className="font-mono text-navy">{id}</span></p>

      <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 mb-8 text-left space-y-2 text-sm text-gray-700">
        <p className="font-semibold text-navy mb-2">What happens next?</p>
        <p>We will contact you shortly on the phone number you provided to confirm your order.</p>
        <p>Delivery is typically within 3–5 business days.</p>
        <p>For any queries, WhatsApp us at +91 98888 53500.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/products"
          className="inline-block bg-navy text-white px-6 py-3 rounded font-semibold hover:bg-navy-dark transition-colors"
        >
          Continue Shopping
        </a>
        <a
          href="https://wa.me/919888853500"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#25D366] text-white px-6 py-3 rounded font-semibold hover:opacity-90 transition-opacity"
        >
          Track via WhatsApp
        </a>
      </div>
    </div>
  );
}
