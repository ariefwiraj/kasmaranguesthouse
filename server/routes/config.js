import express from 'express';
import supabase from '../utils/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.from('site_config').select('*').eq('id', 1).single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found (0 rows)
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch config' });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    
    // UPSERT (Insert or Update) for id = 1
    const configData = { ...req.body, id: 1 };
    
    const { data, error } = await supabase.from('site_config').upsert(configData).select().single();
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update config' });
  }
});

export default router;
