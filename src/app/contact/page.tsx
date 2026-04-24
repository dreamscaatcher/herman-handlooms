export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-navy mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">We&apos;d love to hear from you. Reach out any time.</p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-navy/5 rounded-xl p-6">
            <h2 className="font-bold text-navy mb-4 text-lg">Get in Touch</h2>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-navy">Address</p>
                  <p>515 Sector 123, Sunny Enclave<br />Mohali, Punjab</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-navy">Phone</p>
                  <a href="tel:+919888853500" className="text-gold hover:underline">+91 98888 53500</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-semibold text-navy">WhatsApp</p>
                  <a href="https://wa.me/919888853500" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Chat with us on WhatsApp</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="font-semibold text-navy">Store Hours</p>
                  <p>Monday – Saturday: 10:00 AM – 7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div>
          <div className="rounded-xl overflow-hidden border border-gray-200 h-72 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            <div className="text-center">
              <p className="text-3xl mb-2">🗺️</p>
              <p>515 Sector 123, Sunny Enclave</p>
              <a
                href="https://maps.google.com/?q=515+Sector+123+Sunny+Enclave+Mohali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline text-sm block mt-2"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Embed a real Google Maps iframe here once a Maps API key is available.</p>
        </div>
      </div>
    </div>
  );
}
