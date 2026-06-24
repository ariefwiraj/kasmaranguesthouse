import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { siteConfig } from "../../data/siteConfig";

import logoDark from "../../assets/images/LOGO.svg";
import logoWhite from "../../assets/images/LOGO-WHITE(2).svg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Tentang", href: "#about" },
    { name: "Kamar", href: "#rooms" },
    { name: "Fasilitas", href: "#facilities" },
    { name: "Lokasi", href: "#location" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section
      const sections = ["home", "about", "rooms", "facilities", "location"];
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  const whatsappUrl = buildWhatsAppLink();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-white shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center min-h-[60px]">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, "#home")}
          className="relative flex items-center z-10 w-48 md:w-64"
        >
          <img 
            src={(isScrolled || mobileMenuOpen) ? logoDark : logoWhite} 
            alt="Kasmaran Guest House" 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-20 md:h-28 w-auto transition-all duration-300 drop-shadow-md"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors pb-1 ${
                  isScrolled || mobileMenuOpen
                    ? isActive 
                      ? "text-primary border-b-2 border-primary" 
                      : "text-foreground/80 hover:text-primary"
                    : isActive
                      ? "text-white border-b-2 border-white drop-shadow-md"
                      : "text-white/90 hover:text-white drop-shadow-md"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={`${
              isScrolled || mobileMenuOpen
                ? "bg-primary hover:bg-primary/90 text-white" 
                : "bg-white text-primary hover:bg-white/90"
            } px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg`}
          >
            Pesan Sekarang
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors z-10 ${(isScrolled || mobileMenuOpen) ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-border flex flex-col py-4 px-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-3 text-base font-medium border-b border-border/50 ${
                  activeSection === link.href.substring(1)
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 bg-primary text-white text-center py-3 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pesan Sekarang
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
