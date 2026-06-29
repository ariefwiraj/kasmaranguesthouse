import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Edit3, AlertCircle, Settings } from 'lucide-react';
import { useState } from 'react';
import SiteConfigModal from './SiteConfigModal';
import { useConfig } from '../../contexts/ConfigContext';

export default function AdminToolbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const { refreshConfig } = useConfig();

  if (!isAuthenticated) return null;

  return (
    <div className="bg-primary text-white py-2 px-4 fixed top-0 left-0 right-0 w-full z-[60] flex items-center justify-between shadow-md text-sm">
      <div className="flex items-center gap-2">
        <Edit3 className="w-4 h-4" />
        <span className="font-semibold">Mode Edit Aktif</span>
        <span className="opacity-75 hidden sm:inline">| Login sebagai: {user?.username}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1 text-xs opacity-90 bg-white/10 px-2 py-1 rounded">
          <AlertCircle className="w-3 h-3" />
          Perubahan akan live setelah ~1-3 menit (Vercel rebuild)
        </div>
        <button 
          onClick={() => setIsConfigOpen(true)}
          className="flex items-center gap-1.5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Konfigurasi Situs</span>
        </button>
        <button 
          onClick={logout}
          className="flex items-center gap-1.5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
      <SiteConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
        onSave={refreshConfig} 
      />
    </div>
  );
}
