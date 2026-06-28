import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import aboutImg from "../../assets/images/about.jpg";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl relative z-10">
              <img 
                src={aboutImg} 
                alt="Lobby Kasmaran Guest House Syariah" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            
            {/* Floating Badge */}
            {/* <div className="absolute -bottom-6 -right-6 md:right-auto md:-left-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                ✨
              </div>
              <div>
                <p className="font-heading font-bold text-foreground">Nyaman</p>
                <p className="text-sm text-muted-foreground">& Bersih</p>
              </div>
            </div> */}
          </motion.div>

          {/* Text Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gold w-12"></div>
              <h2 className="text-gold font-semibold tracking-wider uppercase text-sm">
                Tentang Kami
              </h2>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Kenyamanan Menyeluruh di Jantung Condet
            </h3>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Kasmaran Guest House Syariah adalah pilihan tepat bagi Anda yang mencari penginapan nyaman, aman, dan berkonsep syariah modern di kawasan Jakarta Timur.
              </p>
              <p>
                Dengan lokasi yang strategis, kami menawarkan kemudahan akses ke berbagai pusat aktivitas sekaligus ketenangan beristirahat layaknya di rumah sendiri.
              </p>
            </div>
            
            <div className="mt-10 space-y-4">
              {[
                "Konsep Syariah Modern yang menenangkan",
                "Lokasi Strategis di Condet Balekambang",
                "Sangat Nyaman untuk Keluarga & Wisatawan",
                "Fasilitas lengkap dengan harga terjangkau"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
