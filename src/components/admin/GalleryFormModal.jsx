import { useState, useEffect } from 'react';
import { X, Upload, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

export default function GalleryFormModal({ isOpen, onClose, initialData, categories, onSave }) {
  const [formData, setFormData] = useState({ id: '', title: '', category: categories[0] || 'Umum' });
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
        setImage(initialData.url || null);
      } else {
        setFormData({ id: '', title: '', category: categories[0] || 'Umum' });
        setImage(null);
      }
    }
  }, [isOpen, initialData, categories]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, preview: reader.result, isNew: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFileToServer = async (fileObj) => {
    if (!fileObj || !fileObj.isNew) return fileObj?.url || fileObj;
    try {
      const filename = `gal-${Date.now()}-${fileObj.file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const res = await api.post('/upload', {
        file: fileObj.preview,
        folder: 'gallery',
        filename
      });
      return res.data.url;
    } catch (err) {
      throw new Error("Gagal upload gambar");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let finalImageUrl = image;
      if (image && image.isNew) {
        finalImageUrl = await uploadFileToServer(image);
      }

      const payload = { ...formData, url: finalImageUrl };

      if (isEditing) {
        await api.put(`/gallery/${payload.id}`, payload);
      } else {
        await api.post('/gallery', payload);
      }
      onSave();
      onClose();
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
      >
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-primary">
            {isEditing ? 'Edit Foto' : 'Tambah Foto Galeri'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="galleryForm" onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Pilih Foto</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden h-48">
              {(image?.preview || (typeof image === 'string' && image)) ? (
                <>
                  <img src={image.preview || image} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white bg-primary px-3 py-1 rounded text-sm flex items-center gap-1"><Upload className="w-4 h-4"/> Ganti</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </>
              ) : (
                <label className="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-primary font-medium">Klik untuk upload foto</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Judul Foto</label>
            <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="ex: Area Parkir" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border rounded-lg px-3 py-2 bg-white">
              <option value="" disabled>Pilih Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </form>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-gray-50">
          <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-white transition-colors">Batal</button>
          <button type="submit" form="galleryForm" disabled={isSaving || !image} className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors disabled:opacity-70">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Menyimpan...' : 'Simpan Foto'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
