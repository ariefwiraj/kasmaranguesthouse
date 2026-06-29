import express from 'express';
import { readFile, writeFile } from '../utils/github.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const DATA_PATH = 'src/data/rooms.json';

router.get('/', async (req, res) => {
  try {
    const { data } = await readFile(DATA_PATH);
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { data, sha } = await readFile(DATA_PATH);
    const rooms = data || [];
    const newRoom = req.body;
    
    // Simple id generation if not provided
    if (!newRoom.id) {
       newRoom.id = newRoom.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    rooms.push(newRoom);
    await writeFile(DATA_PATH, rooms, sha, `Add room: ${newRoom.name}`);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add room' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, sha } = await readFile(DATA_PATH);
    const rooms = data || [];
    
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ error: 'Room not found' });

    rooms[index] = { ...rooms[index], ...req.body, id }; // Keep original ID
    await writeFile(DATA_PATH, rooms, sha, `Update room: ${id}`);
    res.json(rooms[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update room' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, sha } = await readFile(DATA_PATH);
    let rooms = data || [];
    
    rooms = rooms.filter(r => r.id !== id);
    await writeFile(DATA_PATH, rooms, sha, `Delete room: ${id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

export default router;
