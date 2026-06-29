import express from 'express';
import { uploadFile, deleteFile, readFile } from '../utils/github.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Body parser limits handled in app.js (10mb)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { file, folder, filename } = req.body; // file should be base64 string
    
    if (!file || !folder || !filename) {
      return res.status(400).json({ error: 'Missing required fields (file, folder, filename)' });
    }

    const path = `public/uploads/${folder}/${filename}`;
    
    await uploadFile(path, file, `Upload image: ${filename}`);
    
    // Return relative URL for frontend usage
    res.json({ url: `/uploads/${folder}/${filename}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

router.delete('/', requireAuth, async (req, res) => {
  try {
    const { path } = req.body; // e.g. /uploads/rooms/room-1.jpg
    
    if (!path) {
      return res.status(400).json({ error: 'Missing path parameter' });
    }

    // Strip leading slash to match github path
    const githubPath = `public${path}`;
    
    // Get file SHA first
    const { sha } = await readFile(githubPath);
    if (!sha) {
       return res.status(404).json({ error: 'File not found' });
    }

    await deleteFile(githubPath, sha, `Delete image: ${path}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
