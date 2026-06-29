import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const expectedUsername = process.env.OWNER_USERNAME || 'admin';
  const passwordHash = process.env.OWNER_PASSWORD_HASH || bcrypt.hashSync('admin123', 10);
  
  if (username !== expectedUsername) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || 'fallback-secret-for-dev',
    { expiresIn: '24h' }
  );

  res.json({ token });
});

router.get('/verify', requireAuth, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;
