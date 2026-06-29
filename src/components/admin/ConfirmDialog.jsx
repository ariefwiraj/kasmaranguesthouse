import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, isDeleting = false }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${isDeleting ? 'bg-red-100 text-red-600' : 'bg-gold/20 text-gold'}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
            </div>
            
            <p className="text-muted-foreground text-sm">
              {message}
            </p>
            
            <div className="mt-8 flex gap-3 justify-end">
              <button 
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                  isDeleting ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'
                }`}
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
