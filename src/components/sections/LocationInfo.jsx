import { MapPin, Clock, CalendarDays } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { buildWhatsAppLink } from "../../lib/whatsapp";

export default function LocationInfo() {
  return (
    <section id="location" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Map Content */}
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-[4/3] w-full bg-[#E8E2D9]">
            {siteConfig.googleMapsEmbedUrl ? (
              <iframe 
                src={siteConfig.googleMapsEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Lokasi Kasmaran Guest House"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground font-medium">
                  [ Google Maps Placeholder ]
                </span>
              </div>
            )}
          </div>

          {/* Info Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-gold w-8"></div>
              <h2 className="text-gold font-semibold tracking-wider uppercase text-sm">
                Lokasi & Informasi
              </h2>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-8">Temukan Kami</h3>

            <div className="space-y-8 mb-10">
              
              <div className="flex gap-4">
                <div className="mt-1 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Alamat</h4>
                  <div className="text-muted-foreground leading-relaxed">
                    {siteConfig.address.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Waktu Menginap</h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                    <div>
                      <span className="block text-sm font-medium text-foreground">Check-in</span>
                      {siteConfig.checkInTime}
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-foreground">Check-out</span>
                      {siteConfig.checkOutTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CalendarDays size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Reservasi</h4>
                  <p className="text-muted-foreground">
                    Layanan reservasi online via WhatsApp melayani selama {siteConfig.reservationHours}.
                  </p>
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={siteConfig.googleMapsPlaceUrl || siteConfig.googleMapsEmbedUrl} 
                target="_blank" 
                rel="noreferrer"
                className="bg-white hover:bg-surface-hover text-foreground border border-border px-6 py-3.5 rounded-md font-semibold transition-all text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <MapPin size={18} />
                Buka Google Maps
              </a>
              <a 
                href={buildWhatsAppLink()} 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3.5 rounded-md font-semibold transition-all text-center"
              >
                Hubungi WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
