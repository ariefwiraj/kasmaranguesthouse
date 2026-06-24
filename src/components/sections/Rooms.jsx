import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { rooms } from "../../data/rooms";
import { buildWhatsAppLink } from "../../lib/whatsapp";

export default function Rooms() {
  return (
    <section id="rooms" className="py-20 md:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gold w-8"></div>
            <h2 className="text-gold font-semibold tracking-wider uppercase text-sm">
              Kamar Kami
            </h2>
            <div className="h-px bg-gold w-8"></div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Pilihan Kamar Nyaman</h3>
          <p className="text-muted-foreground text-lg">
            Temukan pilihan kamar yang sesuai dengan kebutuhan Anda. Semua kamar didesain untuk kenyamanan istirahat terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group flex flex-col"
            >
              {/* Image Area */}
              <div className="aspect-[4/3] relative overflow-hidden bg-[#E8E2D9]">
                {/* CSS Placeholder */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground font-medium text-sm">
                    [ {room.name} Image ]
                  </span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur py-2 px-4 rounded-lg shadow-sm border border-border/50">
                  <div className="text-xs text-muted-foreground mb-0.5">Mulai dari</div>
                  <div className="font-bold text-primary">{room.startingPrice}</div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold font-heading">{room.name}</h4>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-[#FAF7F2] px-2.5 py-1 rounded-md">
                    <Users size={14} className="text-gold" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((feature, fIdx) => (
                    <span 
                      key={fIdx} 
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-border">
                  <a
                    href={buildWhatsAppLink(null, room.whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-3 text-center rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                  >
                    Pesan Kamar Ini
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
