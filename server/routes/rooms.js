import express from 'express';
import supabase from '../utils/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.from('rooms').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch rooms' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const newRoom = req.body;
    
    if (!newRoom.id) {
       newRoom.id = newRoom.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const { data, error } = await supabase.from('rooms').insert([newRoom]).select().single();
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add room' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { id } = req.params;
    
    const { data, error } = await supabase.from('rooms').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update room' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { id } = req.params;
    
    const { error } = await supabase.from('rooms').delete().eq('id', id);
    if (error) throw error;
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to delete room' });
  }
});

export default router;
