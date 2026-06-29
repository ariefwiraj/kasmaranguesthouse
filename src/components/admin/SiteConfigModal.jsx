import { useState, useEffect } from 'react';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../lib/api';

export default function SiteConfigModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    businessName: '', tagline: '', shortLocation: '', address: [],
    phoneNumber: '', whatsappNumber: '', whatsappDefaultMessage: '',
    email: '', checkInTime: '', checkOutTime: '', reservationHours: '',
    googleMapsEmbedUrl: '', googleMapsPlaceUrl: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadConfig();
    }
  }, [isOpen]);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/config');
      setFormData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (index, value) => {
    setFormData(prev => {
      const newAddress = [...prev.address];
      newAddress[index] = value;
      return { ...prev, address: newAddress };
    });
  };

  const addAddressLine = () => setFormData(prev => ({ ...prev, address: [...prev.address, ''] }));
  const removeAddressLine = (index) => setFormData(prev => ({ ...prev, address: prev.address.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/config', formData);
      if (onSave) onSave();
      onClose();
    } catch (err) {
      alert('Gagal menyimpan konfigurasi: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-xl">
          <h2 className="text-xl font-bold font-serif text-primary">Konfigurasi Website</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        
        {isLoading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="p-6 overflow-y-auto flex-1">
            <form id="configForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
                <h3 className="col-span-full font-bold text-foreground">Informasi Dasar</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Bisnis</label>
                  <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lokasi Singkat (ex: Condet, Jakarta)</label>
                  <input required type="text" name="shortLocation" value={formData.shortLocation} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium mb-1">Tagline</label>
                  <input required type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground">Alamat Lengkap</h3>
                  <button type="button" onClick={addAddressLine} className="text-primary text-sm flex items-center gap-1 hover:underline"><Plus className="w-4 h-4"/> Tambah Baris</button>
                </div>
                <div className="space-y-2">
                  {formData.address?.map((line, index) => (
                    <div key={index} className="flex gap-2">
                      <input required type="text" value={line} onChange={(e) => handleAddressChange(index, e.target.value)} className="flex-1 border rounded-lg px-3 py-2" />
                      <button type="button" onClick={() => removeAddressLine(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
                <h3 className="col-span-full font-bold text-foreground">Kontak & Reservasi</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                  <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nomor WhatsApp (628...)</label>
                  <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jam Reservasi</label>
                  <input type="text" name="reservationHours" value={formData.reservationHours} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium mb-1">Pesan WhatsApp Default</label>
                  <input type="text" name="whatsappDefaultMessage" value={formData.whatsappDefaultMessage} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jam Check-In</label>
                  <input type="text" name="checkInTime" value={formData.checkInTime} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jam Check-Out</label>
                  <input type="text" name="checkOutTime" value={formData.checkOutTime} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <h3 className="col-span-full font-bold text-foreground">Google Maps</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Google Maps Embed URL (src iframe)</label>
                  <input type="url" name="googleMapsEmbedUrl" value={formData.googleMapsEmbedUrl} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Google Maps Place URL (Link peta)</label>
                  <input type="url" name="googleMapsPlaceUrl" value={formData.googleMapsPlaceUrl} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>
            </form>
          </div>
        )}
        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-gray-50 rounded-b-xl sticky bottom-0">
          <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-white">Batal</button>
          <button type="submit" form="configForm" disabled={isSaving || isLoading} className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-70">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Menyimpan...' : 'Simpan Konfigurasi'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
