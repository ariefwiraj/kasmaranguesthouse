import express from 'express';
import supabase from '../utils/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.from('facilities').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facilities' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const newFacility = req.body;
    
    if (!newFacility.id) {
       newFacility.id = newFacility.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const { data, error } = await supabase.from('facilities').insert([newFacility]).select().single();
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add facility' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { id } = req.params;
    
    const { data, error } = await supabase.from('facilities').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update facility' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { id } = req.params;
    
    const { error } = await supabase.from('facilities').delete().eq('id', id);
    if (error) throw error;
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to delete facility' });
  }
});

export default router;
