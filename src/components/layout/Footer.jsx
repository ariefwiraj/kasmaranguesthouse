import { useConfig } from "../../contexts/ConfigContext";

export default function Footer() {
  const { config: siteConfig } = useConfig();
  
  if (!siteConfig) return null;

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          
          {/* Column 1: Info */}
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4 text-[#C8A96B]">
              {siteConfig.businessName}
            </h3>
            <div className="space-y-2 text-white/80 text-sm">
              {siteConfig.address.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          {/* Column 2: Navigasi */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4 text-white">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { name: "Tentang Kami", href: "#about" },
                { name: "Kamar", href: "#rooms" },
                { name: "Fasilitas", href: "#facilities" },
                { name: "Lokasi", href: "#location" },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-[#C8A96B] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kontak */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4 text-white">Kontak</h4>
            <ul className="space-y-3">
              {siteConfig.whatsappNumber && (
                <li>
                  <a 
                    href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-white/70 hover:text-[#C8A96B] transition-colors text-sm flex items-center gap-2"
                  >
                    WhatsApp: {siteConfig.whatsappNumber}
                  </a>
                </li>
              )}
              {siteConfig.email && (
                <li>
                  <a 
                    href={`mailto:${siteConfig.email}`} 
                    className="text-white/70 hover:text-[#C8A96B] transition-colors text-sm flex items-center gap-2"
                  >
                    Email: {siteConfig.email}
                  </a>
                </li>
              )}
              {!siteConfig.whatsappNumber && !siteConfig.email && (
                <li className="text-white/50 text-sm ">
                  
                </li>
              )}
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
