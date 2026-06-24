import { siteConfig } from "../data/siteConfig";

/**
 * Builds a WhatsApp API link.
 * @param {string} phoneNumber - The WhatsApp phone number
 * @param {string} message - The pre-filled message
 * @returns {string} The formatted WhatsApp URL
 */
export function buildWhatsAppLink(phoneNumber, message) {
  // Use fallback from siteConfig if not provided
  const numberToUse = phoneNumber || siteConfig.whatsappNumber;
  const messageToUse = message || siteConfig.whatsappDefaultMessage;
  
  // Clean phone number (remove non-digits)
  const cleanNumber = String(numberToUse || "").replace(/\D/g, "");
  
  // Encode the message
  const encodedMessage = encodeURIComponent(messageToUse || "");
  
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
