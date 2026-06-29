import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../lib/api';

const AVAILABLE_ICONS = Object.keys(LucideIcons).filter(key => typeof LucideIcons[key] === 'function' && key !== 'createLucideIcon' && key !== 'LucideIcon');

export default function FacilityFormModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({ id: '', name: '', icon: 'Wifi', description: '' });
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { id: '', name: '', icon: 'Wifi', description: '' });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (isEditing) {
        await api.put(`/facilities/${formData.id}`, formData);
      } else {
        await api.post('/facilities', formData);
      }
      onSave();
      onClose();
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const SelectedIcon = LucideIcons[formData.icon] || LucideIcons.HelpCircle;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-primary">{isEditing ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        <form id="facilityForm" onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Fasilitas</label>
            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="ex: WiFi Gratis" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pilih Ikon (Lucide)</label>
            <div className="flex gap-2 items-center">
              <div className="p-2 border rounded-lg bg-gray-50 flex-shrink-0 text-primary">
                <SelectedIcon className="w-6 h-6" />
              </div>
              <input list="icon-options" required type="text" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="flex-1 border rounded-lg px-3 py-2" placeholder="ex: Wifi, Coffee, Wind" />
              <datalist id="icon-options">
                {AVAILABLE_ICONS.slice(0, 100).map(icon => <option key={icon} value={icon} />)}
              </datalist>
            </div>
            <p className="text-xs text-gray-500 mt-1">Gunakan nama ikon dari <a href="https://lucide.dev/icons/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Lucide Icons</a></p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
            <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 min-h-[80px]" placeholder="Penjelasan fasilitas..." />
          </div>
        </form>
        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-gray-50">
          <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-white">Batal</button>
          <button type="submit" form="facilityForm" disabled={isSaving} className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-70">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
