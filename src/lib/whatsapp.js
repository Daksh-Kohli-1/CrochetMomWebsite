// ─── src/lib/whatsapp.js ─────────────────────────────────────────────────────
// WhatsApp number is read from the environment variable:
//   NEXT_PUBLIC_WHATSAPP_NUMBER  (set in .env.local)
//
// Format: country code + number, no '+' or spaces.
//   e.g.  919876543210  (India +91)

const getPhone = () =>
  process.env.NEXT_PUBLIC_PHONE_NUMBER || '919999999999';

/**
 * Build a WhatsApp link for a single product enquiry.
 * Used by ProductCard ("Stitch One For Me").
 */
export function generateWhatsAppLink(productName) {
  const msg = encodeURIComponent(
    `Hello! I'm interested in ordering: ${productName}. Could you share more details?`
  );
  return `https://wa.me/${getPhone()}?text=${msg}`;
}

/**
 * Build a WhatsApp link for a custom bouquet order.
 * Used by BouquetBuilder ("Order via WhatsApp").
 *
 * @param {Array<{ name: string, qty: number, price: number }>} items
 * @param {number} total
 */
export function generateBouquetWhatsAppLink(items, total) {
  const lines = items
    .map((i) => `${i.name} × ${i.qty} = ₹${i.price * i.qty}`)
    .join('\n');
  const msg = encodeURIComponent(
    `Hello! I'd like to order a custom bouquet:\n\n${lines}\n\nTotal: ₹${total}`
  );
  return `https://wa.me/${getPhone()}?text=${msg}`;
}