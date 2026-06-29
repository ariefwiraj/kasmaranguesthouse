import express from 'express';
import supabase from '../utils/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Body parser limits handled in app.js (10mb)
router.post('/', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { file, folder, filename } = req.body; // file should be base64 string
    
    if (!file || !folder || !filename) {
      return res.status(400).json({ error: 'Missing required fields (file, folder, filename)' });
    }

    const base64Data = file.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Determine mime type from base64 if possible
    let contentType = 'image/jpeg';
    if (file.startsWith('data:image/png')) contentType = 'image/png';
    else if (file.startsWith('data:image/webp')) contentType = 'image/webp';

    const path = `${folder}/${filename}`;
    
    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(path, buffer, {
        contentType: contentType,
        upsert: true
      });
      
    if (error) throw error;
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(path);
    
    res.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to upload image' });
  }
});

router.delete('/', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { path } = req.body; // e.g. URL returned from Supabase
    
    if (!path) {
      return res.status(400).json({ error: 'Missing path parameter' });
    }

    // Extract path after 'uploads/'
    const urlParts = path.split('/uploads/');
    if (urlParts.length < 2) {
       return res.status(400).json({ error: 'Invalid Supabase URL' });
    }
    const storagePath = urlParts[1];

    const { error } = await supabase.storage.from('uploads').remove([storagePath]);
    if (error) throw error;

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to delete image' });
  }
});

export default router;
