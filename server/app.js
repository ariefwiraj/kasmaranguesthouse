import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import roomsRoutes from './routes/rooms.js';
import galleryRoutes from './routes/gallery.js';
import facilitiesRoutes from './routes/facilities.js';
import configRoutes from './routes/config.js';
import uploadRoutes from './routes/upload.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/config', configRoutes);
app.use('/api/upload', uploadRoutes);

export default app;
