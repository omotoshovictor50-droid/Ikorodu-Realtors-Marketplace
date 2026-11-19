export const WHATSAPP_NUMBER = "2349139255152"; // +234 913 925 5152
export const ENQUIRY_EMAIL = "ikorodurealtors@gmail.com";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}` +
  (text ? `?text=${encodeURIComponent(text)}` : "");

export const whatsappText = (text: string) => whatsappLink(text);

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
