import { useState } from 'react';
import { Plus, Trash2, Tag, Loader2 } from 'lucide-react';
import api from '../../lib/api';

export default function CategoryManager({ categories, onCategoriesChange }) {
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [deletingCat, setDeletingCat] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    setIsAdding(true);
    try {
      const res = await api.post('/gallery/categories', { category: newCategory.trim() });
      onCategoriesChange(res.data);
      setNewCategory('');
    } catch (err) {
      alert('Gagal menambah kategori');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!confirm(`Hapus kategori "${cat}"? Foto di kategori ini mungkin tidak akan muncul.`)) return;
    
    setDeletingCat(cat);
    try {
      const res = await api.delete(`/gallery/categories/${encodeURIComponent(cat)}`);
      onCategoriesChange(res.data);
    } catch (err) {
      alert('Gagal menghapus kategori');
    } finally {
      setDeletingCat(null);
    }
  };

  return (
    <div className="bg-card border border-border p-4 rounded-xl shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Kelola Kategori Galeri</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-1 bg-gray-100 text-sm px-3 py-1.5 rounded-full border border-gray-200">
            <span>{cat}</span>
            <button 
              onClick={() => handleDelete(cat)}
              disabled={deletingCat === cat}
              className="text-gray-400 hover:text-red-500 transition-colors ml-1"
            >
              {deletingCat === cat ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input 
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nama kategori baru..."
          className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
          maxLength={30}
        />
        <button 
          type="submit" 
          disabled={!newCategory.trim() || isAdding}
          className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1 disabled:opacity-50"
        >
          {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Tambah
        </button>
      </form>
    </div>
  );
}
