import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";
import FacilityFormModal from "../admin/FacilityFormModal";
import ConfirmDialog from "../admin/ConfirmDialog";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin states
  const { isAuthenticated } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const fetchFacilities = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/facilities');
      setFacilities(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleDeleteItem = async () => {
    try {
      await api.delete(`/facilities/${deletingItemId}`);
      fetchFacilities();
    } catch (err) {
      alert('Gagal menghapus fasilitas');
    }
  };

  return (
    <section id="facilities" className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-gold/10 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gold w-8"></div>
            <h2 className="text-gold font-semibold tracking-wider uppercase text-sm">
              Fasilitas Utama
            </h2>
            <div className="h-px bg-gold w-8"></div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Fasilitas Lengkap untuk Anda</h3>
          
          {isAuthenticated && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Fasilitas
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {facilities.map((facility, idx) => {
            const IconComponent = LucideIcons[facility.icon] || LucideIcons.HelpCircle;
            
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-[#FAF7F2] rounded-xl p-6 md:p-8 text-center border border-transparent hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center relative"
              >
                {/* Edit Overlay */}
                {isAuthenticated && (
                  <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setEditingItem(facility); setIsFormOpen(true); }} className="p-1.5 bg-white shadow rounded hover:bg-primary hover:text-white text-primary">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setDeletingItemId(facility.id); }} className="p-1.5 bg-white shadow rounded hover:bg-red-500 hover:text-white text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
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
        )}
        
      </div>

      <FacilityFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingItem}
        onSave={fetchFacilities}
      />

      <ConfirmDialog 
        isOpen={!!deletingItemId}
        onClose={() => setDeletingItemId(null)}
        onConfirm={handleDeleteItem}
        title="Hapus Fasilitas"
        message="Yakin ingin menghapus fasilitas ini?"
        isDeleting
      />
    </section>
  );
}
