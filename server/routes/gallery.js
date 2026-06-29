import express from 'express';
import { readFile, writeFile } from '../utils/github.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const DATA_PATH = 'src/data/gallery.json';

router.get('/', async (req, res) => {
  try {
    const { data } = await readFile(DATA_PATH);
    res.json(data || { categories: [], items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { data, sha } = await readFile(DATA_PATH);
    const gallery = data || { categories: [], items: [] };
    const newItem = req.body;
    
    if (!newItem.id) {
       newItem.id = Date.now(); // simple unique id
    }

    gallery.items.push(newItem);
    await writeFile(DATA_PATH, gallery, sha, `Add gallery item: ${newItem.title}`);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id) || req.params.id; // handle number or string
    const { data, sha } = await readFile(DATA_PATH);
    const gallery = data || { categories: [], items: [] };
    
    const index = gallery.items.findIndex(i => i.id == id);
    if (index === -1) return res.status(404).json({ error: 'Item not found' });

    gallery.items[index] = { ...gallery.items[index], ...req.body, id }; 
    await writeFile(DATA_PATH, gallery, sha, `Update gallery item: ${id}`);
    res.json(gallery.items[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id) || req.params.id;
    const { data, sha } = await readFile(DATA_PATH);
    const gallery = data || { categories: [], items: [] };
    
    gallery.items = gallery.items.filter(i => i.id != id);
    await writeFile(DATA_PATH, gallery, sha, `Delete gallery item: ${id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// Category endpoints
router.post('/categories', requireAuth, async (req, res) => {
  try {
    const { category } = req.body;
    const { data, sha } = await readFile(DATA_PATH);
    const gallery = data || { categories: [], items: [] };
    
    if (!gallery.categories.includes(category)) {
      gallery.categories.push(category);
      await writeFile(DATA_PATH, gallery, sha, `Add gallery category: ${category}`);
    }
    res.json(gallery.categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add category' });
  }
});

router.delete('/categories/:name', requireAuth, async (req, res) => {
  try {
    const { name } = req.params;
    const { data, sha } = await readFile(DATA_PATH);
    const gallery = data || { categories: [], items: [] };
    
    gallery.categories = gallery.categories.filter(c => c !== name);
    // Optional: could also update/remove category from items here
    await writeFile(DATA_PATH, gallery, sha, `Delete gallery category: ${name}`);
    res.json(gallery.categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
