"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

// One WhatsApp button that stays at the bottom right and hops on every scroll.
// A property page sends it a ready-made message through the "wa-context" event.
export default function WhatsAppFloat() {
  const [hop, setHop] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setHop(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setHop(false), 650);
    };
    const onCtx = (e: Event) => setText((e as CustomEvent<string | null>).detail);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wa-context", onCtx);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wa-context", onCtx);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <a
      href={whatsappLink(text ?? undefined)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp +234 913 925 5152"
      className={`wa-float fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-lg sm:bottom-6 sm:right-6 ${hop ? "wa-hop" : ""}`}
    >
      <MessageCircle className="h-7 w-7 fill-white text-[#25D366]" />
      <span className="hidden pr-1 text-sm font-semibold text-stone-900 md:inline">Chat on WhatsApp</span>
    </a>
  );
}
