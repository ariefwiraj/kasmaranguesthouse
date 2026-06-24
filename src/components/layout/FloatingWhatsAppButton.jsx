import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppLink } from "../../lib/whatsapp";

export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Tampilkan button setelah scroll sedikit atau delay
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Fallback: show after 3 seconds anyway
    const timer = setTimeout(() => setIsVisible(true), 3000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const whatsappUrl = buildWhatsAppLink();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 group"
        >
          {/* Tooltip */}
          <div className="absolute -top-10 right-0 bg-white text-foreground text-xs font-medium px-3 py-1.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none">
            Chat via WhatsApp
          </div>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative"
            aria-label="Chat via WhatsApp"
          >
            {/* Pulse effect rings */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" style={{ animationDuration: '2s' }}></span>
            
            <MessageCircle size={28} className="relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
