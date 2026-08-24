import express from 'express';
import supabase from '../utils/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    
    // Fetch categories and items
    const { data: catData, error: catError } = await supabase.from('gallery_categories').select('name');
    if (catError) throw catError;
    
    const { data: itemData, error: itemError } = await supabase.from('gallery_items').select('*').order('order_index', { ascending: true }).order('created_at', { ascending: true });
    if (itemError) throw itemError;
    
    res.json({
      categories: catData.map(c => c.name),
      items: itemData || []
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch gallery' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const newItem = req.body;
    
    // Convert id if passed as timestamp string/number (our old format), otherwise let serial handle it.
    // Actually, in Supabase we use SERIAL for id, so we delete id from payload
    delete newItem.id;

    const { data, error } = await supabase.from('gallery_items').insert([newItem]).select().single();
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add gallery item' });
  }
});

router.put('/reorder', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { order } = req.body;
    
    for (let i = 0; i < order.length; i++) {
      await supabase.from('gallery_items').update({ order_index: i }).eq('id', order[i]);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to reorder gallery' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { id } = req.params;
    
    const { data, error } = await supabase.from('gallery_items').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update gallery item' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { id } = req.params;
    
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (error) throw error;
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to delete gallery item' });
  }
});

// Category endpoints
router.post('/categories', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { category } = req.body;
    
    const { error } = await supabase.from('gallery_categories').insert([{ name: category }]);
    // Ignore duplicate key errors if category already exists
    if (error && error.code !== '23505') throw error;
    
    // Return all categories
    const { data } = await supabase.from('gallery_categories').select('name');
    res.json(data.map(c => c.name));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add category' });
  }
});

router.delete('/categories/:name', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { name } = req.params;
    
    const { error } = await supabase.from('gallery_categories').delete().eq('name', name);
    if (error) throw error;
    
    // Return all categories
    const { data } = await supabase.from('gallery_categories').select('name');
    res.json(data.map(c => c.name));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to delete category' });
  }
});

export default router;
