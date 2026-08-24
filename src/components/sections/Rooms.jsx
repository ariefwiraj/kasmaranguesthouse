import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X, ChevronLeft, ChevronRight, Maximize, BedDouble, Eye, Edit2, Trash2, Plus, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import api from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";
import { useConfig } from "../../contexts/ConfigContext";
import RoomFormModal from "../admin/RoomFormModal";
import ConfirmDialog from "../admin/ConfirmDialog";

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Admin states
  const { isAuthenticated } = useAuth();
  const { config: siteConfig } = useConfig();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoomId, setDeletingRoomId] = useState(null);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDeleteRoom = async () => {
    try {
      await api.delete(`/rooms/${deletingRoomId}`);
      fetchRooms();
    } catch (err) {
      alert('Gagal menghapus kamar');
    }
  };

  const handleReorder = async (direction, index) => {
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === rooms.length - 1) return;
    
    const newRooms = [...rooms];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    
    // Swap
    [newRooms[index], newRooms[targetIndex]] = [newRooms[targetIndex], newRooms[index]];
    
    setRooms(newRooms); // Optimistic UI
    
    try {
      await api.put('/rooms/reorder', { order: newRooms.map(r => r.id) });
    } catch (err) {
      alert('Gagal mengatur urutan kamar');
      fetchRooms(); // revert on failure
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Maximize": return <Maximize size={18} className="text-muted-foreground shrink-0" />;
      case "BedDouble": return <BedDouble size={18} className="text-muted-foreground shrink-0" />;
      case "Eye": return <Eye size={18} className="text-muted-foreground shrink-0" />;
      case "Users": return <Users size={18} className="text-muted-foreground shrink-0" />;
      default: return null;
    }
  };
  return (
    <section id="rooms" className="py-20 md:py-28 bg-[#FAF7F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        
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

        <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
          <div>
            {isAuthenticated && (
              <button 
                onClick={() => { setEditingRoom(null); setIsFormOpen(true); }}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Tambah Kamar
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => emblaApi?.scrollPrev()}
              className="w-10 h-10 rounded-full border-2 border-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="w-10 h-10 rounded-full border-2 border-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-hidden pb-8 -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-6 md:-ml-8 cursor-grab active:cursor-grabbing">
              {rooms.map((room, idx) => (
                <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 sm:pl-6 md:pl-8 min-w-0" key={room.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group flex flex-col h-full relative"
                  >
                    {/* Edit Overlay */}
                    {isAuthenticated && (
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        {idx > 0 && (
                          <button onClick={() => handleReorder('left', idx)} className="p-2 bg-white/90 backdrop-blur text-gray-700 rounded-lg shadow hover:bg-gray-200 transition-colors" title="Geser Kiri">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                        )}
                        {idx < rooms.length - 1 && (
                          <button onClick={() => handleReorder('right', idx)} className="p-2 bg-white/90 backdrop-blur text-gray-700 rounded-lg shadow hover:bg-gray-200 transition-colors" title="Geser Kanan">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => { setEditingRoom(room); setIsFormOpen(true); }} className="p-2 bg-white/90 backdrop-blur text-primary rounded-lg shadow hover:bg-primary hover:text-white transition-colors" title="Edit Kamar">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeletingRoomId(room.id)} className="p-2 bg-white/90 backdrop-blur text-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white transition-colors" title="Hapus Kamar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  {/* Image Area */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#E8E2D9]">
                    {room.image ? (
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground font-medium text-sm">
                          [ {room.name} Image ]
                        </span>
                      </div>
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur py-2 px-4 rounded-lg shadow-sm border border-border/50">
                      <div className="text-xs text-muted-foreground mb-0.5">harga</div>
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

                    <div className="mt-auto pt-4 border-t border-border flex flex-col gap-3">
                      <button
                        onClick={() => {
                          setSelectedRoom(room);
                          setCurrentImageIndex(0);
                        }}
                        className="block w-full py-2.5 text-center rounded-lg bg-transparent border border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
                      >
                        Lihat Detail Kamar
                      </button>
                      <a
                        href={buildWhatsAppLink(null, `Halo, saya tertarik dengan kamar ${room.name} di Kasmaran Guest House Syariah. Mohon info ketersediaan.`, siteConfig)}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-3 text-center rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        Pesan Kamar Ini
                      </a>
                    </div>
                  </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedRoom(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 bg-white md:rounded-2xl shadow-2xl w-full max-w-5xl h-full md:h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex-shrink-0 p-4 border-b border-border flex justify-between items-center bg-white z-10">
                <h3 className="text-xl font-bold font-heading pr-4">{selectedRoom.name}</h3>
                <button 
                  onClick={() => setSelectedRoom(null)}
                  className="p-1.5 hover:bg-black/5 rounded-full transition-colors flex-shrink-0"
                >
                  <X size={24} className="text-muted-foreground" />
                </button>
              </div>
              
              {/* Modal Body: Split Screen */}
              <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                
                {/* Left Column: Gallery */}
                <div className="w-full md:w-[60%] bg-[#12161f] flex flex-col relative h-[50vh] md:h-full overflow-hidden">
                  {/* Main Image */}
                  <div className="flex-grow relative flex items-center justify-center overflow-hidden p-2 md:p-4">
                    {selectedRoom.gallery[currentImageIndex]?.url && (
                      <img 
                        src={selectedRoom.gallery[currentImageIndex]?.url} 
                        alt="" 
                        aria-hidden="true" 
                        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40 pointer-events-none" 
                      />
                    )}
                    <img 
                      src={selectedRoom.gallery[currentImageIndex]?.url || `https://placehold.co/800x600/2a3441/FFF?text=${encodeURIComponent(selectedRoom.gallery[currentImageIndex]?.title || 'Image')}`}
                      alt={selectedRoom.gallery[currentImageIndex]?.title || selectedRoom.name}
                      className="relative z-10 max-h-full max-w-full object-contain shadow-2xl rounded-sm"
                    />
                    
                    {/* Navigation Arrows */}
                    <button 
                      onClick={() => setCurrentImageIndex((prev) => prev === 0 ? selectedRoom.gallery.length - 1 : prev - 1)}
                      className="absolute left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-20"
                    >
                      <ChevronLeft size={24} className="text-primary pr-0.5" />
                    </button>
                    <button 
                      onClick={() => setCurrentImageIndex((prev) => prev === selectedRoom.gallery.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-20"
                    >
                      <ChevronRight size={24} className="text-primary pl-0.5" />
                    </button>
                    
                    {/* Bottom overlay info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end z-20">
                      <span className="text-white font-medium drop-shadow">{selectedRoom.gallery[currentImageIndex]?.title}</span>
                      <span className="text-white font-medium font-mono text-sm drop-shadow">{currentImageIndex + 1}/{selectedRoom.gallery.length}</span>
                    </div>
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="flex-shrink-0 min-h-[88px] bg-[#12161f] p-3.5 flex items-center gap-3 overflow-x-auto z-10 border-t border-white/10 hide-scrollbar">
                    {selectedRoom.gallery.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 md:w-24 h-14 md:h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${currentImageIndex === idx ? 'border-primary ring-2 ring-primary/40 scale-105 z-10' : 'border-white/20 opacity-70 hover:opacity-100'}`}
                      >
                        <img 
                          src={img.url || `https://placehold.co/150x100/2a3441/FFF?text=${idx+1}`}
                          alt={img.title || `Thumbnail ${idx+1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Right Column: Info */}
                <div className="w-full md:w-[40%] flex flex-col bg-white overflow-hidden">
                  <div className="flex-grow overflow-y-auto p-6">
                    {/* Info Kamar */}
                    <div className="mb-8">
                      <h4 className="font-bold text-foreground mb-4">Info Kamar</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedRoom.roomInfo?.map((info, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {getIcon(info.icon)}
                            <span className="text-sm text-foreground">{info.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Fasilitas Kamar */}
                    <div className="mb-4">
                      <h4 className="font-bold text-foreground mb-4 border-t border-border pt-6">Fasilitas Kamar</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                        {selectedRoom.facilities?.map((fac, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0"></div>
                            <span className="text-sm text-foreground leading-snug">{fac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Fixed Footer */}
                  <div className="p-5 border-t border-border bg-white mt-auto flex-shrink-0">
                    <div className="text-sm font-medium text-foreground mb-1">harga</div>
                    <div className="text-xl font-bold text-primary mb-4">{selectedRoom.startingPrice} <span className="text-sm font-normal text-muted-foreground">/ kamar / malam</span></div>
                    <a
                      href={buildWhatsAppLink(null, `Halo, saya tertarik dengan kamar ${selectedRoom.name} di Kasmaran Guest House Syariah. Mohon info ketersediaan.`, siteConfig)}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm text-center"
                    >
                      Pesan Kamar Ini
                    </a>
                  </div>
                </div>
              </div>
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <RoomFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingRoom} 
        onSave={fetchRooms} 
        existingRooms={rooms}
      />
      
      <ConfirmDialog 
        isOpen={!!deletingRoomId} 
        onClose={() => setDeletingRoomId(null)} 
        onConfirm={handleDeleteRoom} 
        title="Hapus Kamar" 
        message="Yakin ingin menghapus kamar ini? Perubahan akan langsung disimpan." 
        isDeleting 
      />
    </section>
  );
}
