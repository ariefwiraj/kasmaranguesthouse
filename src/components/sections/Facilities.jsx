import { motion } from "framer-motion";
import { 
  Wifi, 
  Wind, 
  Tv, 
  Bath, 
  ThermometerSun, 
  SquareParking, 
  Coffee, 
  ConciergeBell 
} from "lucide-react";
import { facilities } from "../../data/facilities";

const IconMap = {
  Wifi,
  Wind,
  Tv,
  Bath,
  ThermometerSun,
  SquareParking,
  Coffee,
  ConciergeBell
};

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gold w-8"></div>
            <h2 className="text-gold font-semibold tracking-wider uppercase text-sm">
              Fasilitas Utama
            </h2>
            <div className="h-px bg-gold w-8"></div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Fasilitas Lengkap untuk Anda</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {facilities.map((facility, idx) => {
            const IconComponent = IconMap[facility.icon] || Wifi;
            
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-[#FAF7F2] rounded-xl p-6 md:p-8 text-center border border-transparent hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <IconComponent strokeWidth={1.5} size={28} />
                </div>
                <h4 className="font-bold text-foreground mb-2">{facility.name}</h4>
                <p className="text-sm text-muted-foreground hidden md:block">
                  {facility.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
