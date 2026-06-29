import express from 'express';
import { readFile, writeFile } from '../utils/github.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const DATA_PATH = 'src/data/facilities.json';

router.get('/', async (req, res) => {
  try {
    const { data } = await readFile(DATA_PATH);
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facilities' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { data, sha } = await readFile(DATA_PATH);
    const facilities = data || [];
    const newFacility = req.body;
    
    if (!newFacility.id) {
       newFacility.id = newFacility.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    facilities.push(newFacility);
    await writeFile(DATA_PATH, facilities, sha, `Add facility: ${newFacility.name}`);
    res.status(201).json(newFacility);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add facility' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, sha } = await readFile(DATA_PATH);
    const facilities = data || [];
    
    const index = facilities.findIndex(f => f.id === id);
    if (index === -1) return res.status(404).json({ error: 'Facility not found' });

    facilities[index] = { ...facilities[index], ...req.body, id };
    await writeFile(DATA_PATH, facilities, sha, `Update facility: ${id}`);
    res.json(facilities[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update facility' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, sha } = await readFile(DATA_PATH);
    let facilities = data || [];
    
    facilities = facilities.filter(f => f.id !== id);
    await writeFile(DATA_PATH, facilities, sha, `Delete facility: ${id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete facility' });
  }
});

export default router;
