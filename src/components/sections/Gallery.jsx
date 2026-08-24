import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, LayoutGrid, ChevronLeft, ChevronRight, Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";
import GalleryFormModal from "../admin/GalleryFormModal";
import ConfirmDialog from "../admin/ConfirmDialog";
import CategoryManager from "../admin/CategoryManager";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [browserModalOpen, setBrowserModalOpen] = useState(false);
  const [browserCategory, setBrowserCategory] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Data states
  const [galleryItems, setGalleryItems] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin states
  const { isAuthenticated } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  
  // Drag and drop states
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [dragOverItemId, setDragOverItemId] = useState(null);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/gallery');
      setGalleryItems(res.data.items || []);
      setCategoriesData(res.data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDeleteItem = async () => {
    try {
      await api.delete(`/gallery/${deletingItemId}`);
      fetchGallery();
    } catch (err) {
      alert('Gagal menghapus foto');
    }
  };

  const categories = ["Semua", ...categoriesData];

  const filteredData = useMemo(() => {
    if (activeTab === "Semua") return galleryItems;
    return galleryItems.filter(item => item.category === activeTab);
  }, [activeTab, galleryItems]);

  const browserFilteredData = useMemo(() => {
    if (browserCategory === "Semua") return galleryItems;
    return galleryItems.filter(item => item.category === browserCategory);
  }, [browserCategory, galleryItems]);

  const getCategoryCount = (cat) => {
    if (cat === "Semua") return galleryItems.length;
    return galleryItems.filter(item => item.category === cat).length;
  };

  const openBrowser = (category = activeTab) => {
    setBrowserCategory(category);
    setBrowserModalOpen(true);
  };

  const closeBrowser = () => {
    setBrowserModalOpen(false);
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === browserFilteredData.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? browserFilteredData.length - 1 : prev - 1));
    }
  };

  const handleDragStart = (e, id) => {
    if (!isAuthenticated || browserCategory !== "Semua") return;
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (!isAuthenticated || browserCategory !== "Semua" || draggedItemId === id) return;
    setDragOverItemId(id);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    if (!isAuthenticated || browserCategory !== "Semua" || !draggedItemId || draggedItemId === targetId) {
      handleDragEnd();
      return;
    }

    const newItems = [...galleryItems];
    const sourceIndex = newItems.findIndex(i => i.id === draggedItemId);
    const targetIndex = newItems.findIndex(i => i.id === targetId);

    const [draggedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setGalleryItems(newItems);
    handleDragEnd();

    try {
      await api.put('/gallery/reorder', { order: newItems.map(i => i.id) });
    } catch (err) {
      alert('Gagal mengatur urutan galeri');
      fetchGallery();
    }
  };

  const visibleImages = filteredData.slice(0, 6);
  const hasMore = filteredData.length > 6;
  const remainingCount = filteredData.length - 6;

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-white to-primary/5 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gold w-8"></div>
            <h2 className="text-gold font-semibold tracking-wider uppercase text-sm">
              Galeri
            </h2>
            <div className="h-px bg-gold w-8"></div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Momen & Suasana</h3>
          <p className="text-muted-foreground text-lg">
            Jelajahi setiap sudut kenyamanan di Kasmaran Guest House Syariah.
          </p>
        </div>

        {isAuthenticated && (
          <div className="mb-10">
            <CategoryManager 
              categories={categoriesData} 
              onCategoriesChange={(newCats) => setCategoriesData(newCats)} 
            />
            <div className="flex justify-center mb-6">
              <button 
                onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Foto Galeri
              </button>
            </div>
          </div>
        )}

        {/* Category Tabs (Landing Page) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
            {visibleImages.map((item, idx) => {
              const isLastVisible = idx === 5 && hasMore;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer bg-muted"
                  onClick={() => !isAuthenticated && openBrowser(activeTab)}
                >
                  {/* Edit Overlay */}
                  {isAuthenticated && (
                    <div className="absolute top-3 left-3 z-20 flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setEditingItem(item); setIsFormOpen(true); }} className="p-2 bg-white/90 backdrop-blur text-primary rounded-lg shadow hover:bg-primary hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setDeletingItemId(item.id); }} className="p-2 bg-white/90 backdrop-blur text-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {item.url ? (
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-[#FAF7F2]">
                      <ImageIcon size={32} className="mb-2 opacity-50" />
                      <span className="font-medium text-sm text-center px-4">[ {item.title} ]</span>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 z-20 transition-opacity duration-300 flex flex-col justify-end p-6 ${isLastVisible ? 'bg-black/60 opacity-100 items-center justify-center' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
                    {isLastVisible ? (
                      <div className="text-center text-white">
                        <span className="block text-3xl font-light mb-1">+{remainingCount}</span>
                        <span className="font-medium">Foto Lainnya</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">{item.category}</span>
                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        )}

        <div className="mt-10 text-center">
           <button
             onClick={() => openBrowser("Semua")}
             className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
           >
             <LayoutGrid size={18} />
             <span>Buka Semua Galeri</span>
           </button>
        </div>

      </div>

      {/* Gallery Browser Modal (OTA Style) */}
      <AnimatePresence>
        {browserModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-6">
            {/* Backdrop for closing */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeBrowser}
            />

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative bg-white w-full h-full md:rounded-xl shadow-2xl flex flex-col overflow-hidden max-w-7xl max-h-[95vh]"
            >
              {/* Modal Header */}
              <div className="flex-shrink-0 h-14 md:h-16 border-b border-border flex justify-between items-center px-4 md:px-6 bg-white z-20">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold">Galeri Foto</h3>
                </div>
                <button 
                  onClick={closeBrowser}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={24} className="text-muted-foreground" />
                </button>
              </div>

              {/* Modal Body: Split Content */}
              <div className="flex flex-col md:flex-row flex-grow overflow-hidden bg-gray-50/50">
                
                {/* Left Side: Photo Grid */}
                <div className="flex-grow overflow-y-auto p-4 md:p-6 order-2 md:order-1 relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {browserFilteredData.map((item, idx) => (
                      <div 
                        key={`${item.id}-${idx}`} 
                        onClick={() => !isAuthenticated && setLightboxIndex(idx)}
                        draggable={isAuthenticated && browserCategory === "Semua"}
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragOver={(e) => handleDragOver(e, item.id)}
                        onDragEnd={handleDragEnd}
                        onDrop={(e) => handleDrop(e, item.id)}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-white border group shadow-sm hover:shadow-md transition-all ${dragOverItemId === item.id ? 'border-primary border-4 scale-105 z-10' : 'border-border/50 hover:border-primary/50'} ${isAuthenticated && browserCategory === "Semua" ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${draggedItemId === item.id ? 'opacity-50' : 'opacity-100'}`}
                      >
                        {isAuthenticated && (
                          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
                            <button onClick={(e) => { e.stopPropagation(); setEditingItem(item); setIsFormOpen(true); }} className="p-1.5 bg-white/90 text-primary rounded shadow hover:bg-primary hover:text-white">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setDeletingItemId(item.id); }} className="p-1.5 bg-white/90 text-red-500 rounded shadow hover:bg-red-500 hover:text-white">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                        {item.url ? (
                          <img 
                            src={item.url} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-[#FAF7F2]">
                            <ImageIcon size={32} className="mb-2 opacity-30" />
                          </div>
                        )}
                        {isAuthenticated && browserCategory !== "Semua" && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <span className="text-white text-xs font-medium text-center px-4">Pindah ke tab "Semua" untuk mengatur urutan</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <p className="text-white text-sm font-medium">{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Sidebar Filters */}
                <div className="w-full md:w-64 lg:w-72 flex-shrink-0 bg-white border-b md:border-b-0 md:border-l border-border flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto order-1 md:order-2 p-2 md:p-4 gap-1 hide-scrollbar">
                  {categories.map((cat) => {
                    const count = getCategoryCount(cat);
                    const isActive = browserCategory === cat;
                    
                    return (
                      <button
                        key={`sidebar-${cat}`}
                        onClick={() => {
                          setBrowserCategory(cat);
                          setLightboxIndex(null);
                        }}
                        className={`flex-shrink-0 md:w-full flex items-center justify-between px-4 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="whitespace-nowrap">{cat}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-md ml-2 ${isActive ? "bg-white/20 text-white" : "bg-muted-foreground/10 text-muted-foreground"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Inner Lightbox Modal (Enlarged Image) */}
              <AnimatePresence>
                {lightboxIndex !== null && browserFilteredData[lightboxIndex] && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black flex flex-col"
                    onClick={() => setLightboxIndex(null)}
                  >
                    {/* Lightbox Header */}
                    <div className="flex-shrink-0 h-14 md:h-16 flex justify-between items-center px-4 md:px-6 bg-black/50 z-20 absolute top-0 left-0 right-0">
                      <div className="text-white flex items-center gap-2">
                        <span className="font-medium text-sm md:text-base">{browserFilteredData[lightboxIndex].title}</span>
                        <span className="text-white/50 text-sm hidden md:inline-block">•</span>
                        <span className="text-white/50 text-sm hidden md:inline-block">{lightboxIndex + 1} / {browserFilteredData.length}</span>
                      </div>
                      <button 
                        onClick={() => setLightboxIndex(null)}
                        className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Lightbox Image Container */}
                    <div className="flex-grow relative flex items-center justify-center overflow-hidden">
                      {browserFilteredData[lightboxIndex].url ? (
                        <>
                          <img 
                            src={browserFilteredData[lightboxIndex].url}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40 pointer-events-none"
                          />
                          <img 
                            src={browserFilteredData[lightboxIndex].url}
                            alt={browserFilteredData[lightboxIndex].title}
                            className="relative z-10 max-h-full max-w-full object-contain cursor-default p-2 md:p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </>
                      ) : (
                        <div 
                          className="w-full h-full flex flex-col items-center justify-center text-white/50 cursor-default"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ImageIcon size={64} className="mb-4 opacity-50" />
                          <span className="font-medium text-xl">[ {browserFilteredData[lightboxIndex].title} ]</span>
                        </div>
                      )}
                      
                      {/* Navigation Arrows */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-2 md:left-6 w-10 h-10 md:w-14 md:h-14 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors z-10 text-white border border-white/20 backdrop-blur"
                      >
                        <ChevronLeft size={24} className="md:w-8 md:h-8 pr-1" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-2 md:right-6 w-10 h-10 md:w-14 md:h-14 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors z-10 text-white border border-white/20 backdrop-blur"
                      >
                        <ChevronRight size={24} className="md:w-8 md:h-8 pl-1" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GalleryFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingItem}
        categories={categoriesData}
        onSave={fetchGallery}
      />

      <ConfirmDialog 
        isOpen={!!deletingItemId}
        onClose={() => setDeletingItemId(null)}
        onConfirm={handleDeleteItem}
        title="Hapus Foto"
        message="Yakin ingin menghapus foto ini dari galeri?"
        isDeleting
      />
    </section>
  );
}
