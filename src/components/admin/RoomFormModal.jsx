import { useState, useEffect } from 'react';
import { X, Upload, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

export default function RoomFormModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    id: '', name: '', startingPrice: '', capacity: '', whatsappMessage: '',
    features: [], roomInfo: [], facilities: [], gallery: []
  });
  const [mainImage, setMainImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
        setMainImage(initialData.image || null);
      } else {
        setFormData({
          id: '', name: '', startingPrice: '', capacity: '', whatsappMessage: '',
          features: [], roomInfo: [], facilities: [], gallery: []
        });
        setMainImage(null);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value, subfield = null) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      if (subfield) {
        newArray[index] = { ...newArray[index], [subfield]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field, defaultItem = '') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], defaultItem] }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e, isMain = true, galleryIndex = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isMain) {
          setMainImage({ file, preview: reader.result, isNew: true });
        } else {
          setFormData(prev => {
            const newGallery = [...prev.gallery];
            newGallery[galleryIndex] = { ...newGallery[galleryIndex], file, preview: reader.result, isNew: true };
            return { ...prev, gallery: newGallery };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFileToServer = async (fileObj, prefix) => {
    if (!fileObj || !fileObj.isNew) return fileObj?.url || fileObj; // return existing url
    try {
      const filename = `${prefix}-${Date.now()}-${fileObj.file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const res = await api.post('/upload', {
        file: fileObj.preview,
        folder: 'rooms',
        filename
      });
      return res.data.url;
    } catch (err) {
      console.error("Upload failed", err);
      throw new Error("Gagal upload gambar");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let finalImageUrl = mainImage;
      if (mainImage && mainImage.isNew) {
        finalImageUrl = await uploadFileToServer(mainImage, 'main');
      }

      // Handle gallery uploads
      const processedGallery = await Promise.all(
        formData.gallery.map(async (item, index) => {
          if (item.isNew) {
            const url = await uploadFileToServer(item, `gal-${index}`);
            return { id: item.id || Date.now() + index, title: item.title, url };
          }
          return item; // existing
        })
      );

      const payload = {
        ...formData,
        image: finalImageUrl,
        gallery: processedGallery,
      };

      if (isEditing) {
        await api.put(`/rooms/${payload.id}`, payload);
      } else {
        await api.post('/rooms', payload);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        <div className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-xl">
          <h2 className="text-xl font-bold font-serif text-primary">
            {isEditing ? 'Edit Kamar' : 'Tambah Kamar Baru'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="roomForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Kamar</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga (ex: Rp 250.000)</label>
                <input required type="text" name="startingPrice" value={formData.startingPrice} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kapasitas (ex: 2 Tamu)</label>
                <input required type="text" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pesan WhatsApp Default</label>
                <input required type="text" name="whatsappMessage" value={formData.whatsappMessage} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Gambar Utama Kamar</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden h-40">
                {(mainImage?.preview || (typeof mainImage === 'string' && mainImage)) ? (
                  <>
                    <img src={mainImage.preview || mainImage} alt="Preview" className="h-full object-cover rounded-lg" />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white bg-primary px-3 py-1 rounded text-sm flex items-center gap-1"><Upload className="w-4 h-4"/> Ganti Foto</span>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                    </label>
                  </>
                ) : (
                  <label className="cursor-pointer text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-primary font-medium">Klik untuk upload foto</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Galeri Kamar (Carousel Detail)</label>
                <button type="button" onClick={() => addArrayItem('gallery', { id: Date.now(), title: '', url: '' })} className="text-primary text-sm flex items-center gap-1 hover:underline">
                  <Plus className="w-4 h-4" /> Tambah Foto
                </button>
              </div>
              <div className="space-y-3">
                {formData.gallery.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center border p-3 rounded-lg bg-gray-50">
                    <label className="relative w-20 h-20 bg-gray-200 rounded cursor-pointer overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {(item.preview || item.url) ? (
                        <img src={item.preview || item.url} alt="Gallery" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="w-5 h-5 text-gray-400" />
                      )}
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false, index)} className="hidden" />
                    </label>
                    <div className="flex-1">
                      <input type="text" placeholder="Judul Foto (ex: Kamar Mandi)" value={item.title} onChange={(e) => handleArrayChange('gallery', index, e.target.value, 'title')} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <button type="button" onClick={() => removeArrayItem('gallery', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features (Tags) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Fitur Kamar (Tags di Card)</label>
                <button type="button" onClick={() => addArrayItem('features')} className="text-primary text-sm flex items-center gap-1 hover:underline">
                  <Plus className="w-4 h-4" /> Tambah Fitur
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="text" value={feature} onChange={(e) => handleArrayChange('features', index, e.target.value)} className="w-full border rounded-lg px-2 py-1 text-sm" placeholder="ex: AC" />
                    <button type="button" onClick={() => removeArrayItem('features', index)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Info Utama (Modal Detail)</label>
                <button type="button" onClick={() => addArrayItem('roomInfo', { icon: 'Maximize', label: '' })} className="text-primary text-sm flex items-center gap-1 hover:underline">
                  <Plus className="w-4 h-4" /> Tambah Info
                </button>
              </div>
              <div className="space-y-2">
                {formData.roomInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select value={info.icon} onChange={(e) => handleArrayChange('roomInfo', index, e.target.value, 'icon')} className="border rounded-lg px-2 py-1 text-sm">
                      <option value="Maximize">Maximize (Ukuran)</option>
                      <option value="BedDouble">BedDouble (Kasur)</option>
                      <option value="Eye">Eye (Pemandangan)</option>
                      <option value="Users">Users (Kapasitas)</option>
                    </select>
                    <input type="text" value={info.label} onChange={(e) => handleArrayChange('roomInfo', index, e.target.value, 'label')} className="flex-1 border rounded-lg px-2 py-1 text-sm" placeholder="ex: 12.0 m²" />
                    <button type="button" onClick={() => removeArrayItem('roomInfo', index)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Daftar Fasilitas Lengkap (Modal Detail)</label>
                <button type="button" onClick={() => addArrayItem('facilities')} className="text-primary text-sm flex items-center gap-1 hover:underline">
                  <Plus className="w-4 h-4" /> Tambah Fasilitas
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.facilities.map((fac, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="text" value={fac} onChange={(e) => handleArrayChange('facilities', index, e.target.value)} className="w-full border rounded-lg px-2 py-1 text-sm" placeholder="ex: TV Layar Datar" />
                    <button type="button" onClick={() => removeArrayItem('facilities', index)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

          </form>
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-gray-50 rounded-b-xl sticky bottom-0">
          <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-white transition-colors">
            Batal
          </button>
          <button type="submit" form="roomForm" disabled={isSaving} className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors disabled:opacity-70">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Menyimpan...' : 'Simpan Kamar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
