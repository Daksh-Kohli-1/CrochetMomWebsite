/**
 * Generates a WhatsApp redirect link for a given product name.
 * @param {string} productName - The name of the product the user wants to stitch.
 * @returns {string} Full WhatsApp URL with encoded message.
 */
export function generateWhatsAppLink(productName) {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const message = `Hello,\n\nI would like to stitch this product:\nProduct: ${productName}\n\nPlease share details.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
