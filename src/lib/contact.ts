import { Property, formatPrice } from "@/data/properties";

export const WHATSAPP_NUMBER = "2349139255152"; // +234 913 925 5152
export const ENQUIRY_EMAIL = "ikorodurealtors@gmail.com";

export const listingRef = (p: Property) => `IK-${p.id.padStart(3, "0")}`;

const message = (p: Property) =>
  `Hello, I’m interested in the ${p.title} in ${p.area} (Ref ${listingRef(p)}, ${formatPrice(p.price)}).`;

export const whatsappLink = (p?: Property) =>
  `https://wa.me/${WHATSAPP_NUMBER}` +
  (p ? `?text=${encodeURIComponent(message(p) + " Is it still available?")}` : "");

export const emailLink = (p: Property) =>
  `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
    `Enquiry: ${p.title} (${listingRef(p)})`
  )}&body=${encodeURIComponent(message(p) + " Please send me more details.")}`;

export const whatsappText = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
