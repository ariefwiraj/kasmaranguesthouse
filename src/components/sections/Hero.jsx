import { motion } from "framer-motion";
import { useConfig } from "../../contexts/ConfigContext";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import heroImg from "../../assets/images/hero.png";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { config: siteConfig } = useConfig();
  const whatsappUrl = buildWhatsAppLink(null, null, siteConfig);

  const handleScrollToRooms = (e) => {
    e.preventDefault();
    const roomsSection = document.getElementById("rooms");
    if (roomsSection) {
      const topOffset = roomsSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    /* PERUBAHAN: 
      - Mengubah min-h-[105vh] menjadi min-h-[85vh] (atau bisa pakai min-h-screen jika ingin pas 1 layar).
      - Menyesuaikan padding top untuk mobile (pt-32) dan desktop (md:pt-44) agar konten agak turun ke bawah.
    */
    <section 
      id="home" 
      className="relative min-h-screen md:min-h-screen flex items-center justify-center pt-32 md:pt-44 pb-12 overflow-hidden isolate"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImg} 
          alt="Kasmaran Guest House Syariah" 
          className="w-full h-full object-cover object-[center_60%]"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Konten Utama */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10 text-center mb-6 sm:mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Decorative Eyebrow */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6">
            <div className="h-[1px] w-5 sm:w-16 bg-gradient-to-r from-transparent to-gold"></div>
            <span className="uppercase tracking-[0.25em] sm:tracking-[0.3em] text-xs md:text-sm text-gold font-bold drop-shadow-md">
              Kasmaran Guest House Syariah
            </span>
            <div className="h-[1px] w-5 sm:w-16 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-8 text-white drop-shadow-2xl font-heading">
            Kenyamanan dan Ketenangan <br className="hidden sm:block" />
            <span className="text-gold italic font-medium drop-shadow-lg">dalam Setiap Persinggahan</span>
          </h1>
          
          {/* Description */}
          <p className="text-white/80 font-light text-base md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto drop-shadow-md">
            Guest house syariah yang menghadirkan suasana hangat,
            fasilitas lengkap, dan lokasi strategis di Jakarta Timur.
          </p>
          
          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto px-4 sm:px-0">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="relative group bg-primary text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 shadow-[0_4px_20px_rgba(148,35,37,0.4)] hover:shadow-[0_8px_30px_rgba(148,35,37,0.6)] hover:-translate-y-1 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
              <span className="relative z-10 tracking-wide">Pesan Sekarang</span>
            </a>
            
            <a 
              href="#rooms"
              onClick={handleScrollToRooms}
              className="group bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-md px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:-translate-y-1 text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="tracking-wide">Lihat Kamar</span>
              <span className="group-hover:translate-y-1 transition-transform duration-300 opacity-70">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}