import { motion } from "framer-motion";
import { galleryItems } from "../../data/gallery";
import useEmblaCarousel from "embla-carousel-react";

export default function Gallery() {
  const [emblaRef] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true
  });

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-gold w-8"></div>
              <h2 className="text-gold font-semibold tracking-wider uppercase text-sm">
                Galeri
              </h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">Melihat Lebih Dekat</h3>
          </div>
          <p className="text-white/60 text-sm md:text-base max-w-sm hidden md:block">
            Jelajahi setiap sudut Kasmaran Guest House Syariah yang didesain untuk kenyamanan maksimal Anda.
          </p>
        </div>
      </div>

      {/* Mobile: Carousel view */}
      <div className="md:hidden overflow-hidden pl-4" ref={emblaRef}>
        <div className="flex gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="flex-[0_0_85%] min-w-0 relative rounded-xl overflow-hidden aspect-[4/5] bg-[#2A2A2A]">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/40 font-medium text-sm">
                  [ {item.title} ]
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                <h4 className="font-bold text-lg">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Masonry-ish Grid View */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-4 grid-rows-2 gap-4 h-[600px]">
        {galleryItems.slice(0, 5).map((item, idx) => {
          // Buat layout variatif
          let colSpan = "col-span-1";
          let rowSpan = "row-span-1";
          
          if (idx === 0) {
            colSpan = "col-span-2";
            rowSpan = "row-span-2";
          } else if (idx === 1 || idx === 2) {
            colSpan = "col-span-1";
            rowSpan = "row-span-1";
          }
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${colSpan} ${rowSpan} relative rounded-xl overflow-hidden group bg-[#2A2A2A]`}
            >
              <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                <span className="text-white/40 font-medium">
                  [ {item.title} ]
                </span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-xl">{item.title}</h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
