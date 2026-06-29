import express from 'express';
import { readFile, writeFile } from '../utils/github.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const DATA_PATH = 'src/data/siteConfig.json';

router.get('/', async (req, res) => {
  try {
    const { data } = await readFile(DATA_PATH);
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch config' });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    const { data, sha } = await readFile(DATA_PATH);
    const config = { ...(data || {}), ...req.body };
    
    await writeFile(DATA_PATH, config, sha, 'Update site configuration');
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update config' });
  }
});

export default router;
