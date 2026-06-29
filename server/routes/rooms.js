import express from 'express';
import supabase from '../utils/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const mapToDb = (room) => {
  const db = { ...room };
  if ('startingPrice' in room) { db.starting_price = room.startingPrice; delete db.startingPrice; }
  if ('whatsappMessage' in room) { db.whatsapp_message = room.whatsappMessage; delete db.whatsappMessage; }
  if ('roomInfo' in room) { db.room_info = room.roomInfo; delete db.roomInfo; }
  return db;
};

const mapToClient = (room) => {
  const client = { ...room };
  if ('starting_price' in room) { client.startingPrice = room.starting_price; delete client.starting_price; }
  if ('whatsapp_message' in room) { client.whatsappMessage = room.whatsapp_message; delete client.whatsapp_message; }
  if ('room_info' in room) { client.roomInfo = room.room_info; delete client.room_info; }
  delete client.created_at;
  return client;
};

router.get('/', async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.from('rooms').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    res.json(data ? data.map(mapToClient) : []);
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

    const { data, error } = await supabase.from('rooms').insert([mapToDb(newRoom)]).select().single();
    if (error) throw error;
    
    res.status(201).json(mapToClient(data));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add room' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { id } = req.params;
    
    const { data, error } = await supabase.from('rooms').update(mapToDb(req.body)).eq('id', id).select().single();
    if (error) throw error;
    
    res.json(mapToClient(data));
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
