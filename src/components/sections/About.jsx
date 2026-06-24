import { motion } from "framer-motion";

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
            <div className="aspect-[4/5] md:aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-xl relative z-10">
              {/* CSS Placeholder */}
              <div className="w-full h-full bg-[#E8E2D9] flex items-center justify-center">
                <span className="text-muted-foreground font-medium">
                  [ About Image Placeholder ]
                </span>
              </div>
            </div>
            
            {/* Background offset square */}
            <div className="absolute top-8 -right-4 md:-right-8 w-full max-w-md h-full bg-[#FAF7F2] rounded-xl z-0 border border-border"></div>
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
