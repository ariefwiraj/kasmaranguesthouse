import express from 'express';
import supabase from '../utils/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const mapToDb = (config) => {
  const db = { ...config };
  if ('businessName' in config) { db.business_name = config.businessName; delete db.businessName; }
  if ('shortLocation' in config) { db.short_location = config.shortLocation; delete db.shortLocation; }
  if ('phoneNumber' in config) { db.phone_number = config.phoneNumber; delete db.phoneNumber; }
  if ('whatsappNumber' in config) { db.whatsapp_number = config.whatsappNumber; delete db.whatsappNumber; }
  if ('whatsappDefaultMessage' in config) { db.whatsapp_default_message = config.whatsappDefaultMessage; delete db.whatsappDefaultMessage; }
  if ('checkInTime' in config) { db.check_in_time = config.checkInTime; delete db.checkInTime; }
  if ('checkOutTime' in config) { db.check_out_time = config.checkOutTime; delete db.checkOutTime; }
  if ('reservationHours' in config) { db.reservation_hours = config.reservationHours; delete db.reservationHours; }
  if ('googleMapsEmbedUrl' in config) { db.google_maps_embed_url = config.googleMapsEmbedUrl; delete db.googleMapsEmbedUrl; }
  if ('googleMapsPlaceUrl' in config) { db.google_maps_place_url = config.googleMapsPlaceUrl; delete db.googleMapsPlaceUrl; }
  if ('heroImageDesktop' in config) { db.hero_image_desktop = config.heroImageDesktop; delete db.heroImageDesktop; }
  if ('heroImageMobile' in config) { db.hero_image_mobile = config.heroImageMobile; delete db.heroImageMobile; }
  return db;
};

const mapToClient = (config) => {
  const client = { ...config };
  if ('business_name' in config) { client.businessName = config.business_name; delete client.business_name; }
  if ('short_location' in config) { client.shortLocation = config.short_location; delete client.short_location; }
  if ('phone_number' in config) { client.phoneNumber = config.phone_number; delete client.phone_number; }
  if ('whatsapp_number' in config) { client.whatsappNumber = config.whatsapp_number; delete client.whatsapp_number; }
  if ('whatsapp_default_message' in config) { client.whatsappDefaultMessage = config.whatsapp_default_message; delete client.whatsapp_default_message; }
  if ('check_in_time' in config) { client.checkInTime = config.check_in_time; delete client.check_in_time; }
  if ('check_out_time' in config) { client.checkOutTime = config.check_out_time; delete client.check_out_time; }
  if ('reservation_hours' in config) { client.reservationHours = config.reservation_hours; delete client.reservation_hours; }
  if ('google_maps_embed_url' in config) { client.googleMapsEmbedUrl = config.google_maps_embed_url; delete client.google_maps_embed_url; }
  if ('google_maps_place_url' in config) { client.googleMapsPlaceUrl = config.google_maps_place_url; delete client.google_maps_place_url; }
  if ('hero_image_desktop' in config) { client.heroImageDesktop = config.hero_image_desktop; delete client.hero_image_desktop; }
  if ('hero_image_mobile' in config) { client.heroImageMobile = config.hero_image_mobile; delete client.hero_image_mobile; }
  return client;
};

router.get('/', async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.from('site_config').select('*').eq('id', 1).single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found (0 rows)
    res.json(data ? mapToClient(data) : {});
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch config' });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    if (!supabase) throw new Error("Supabase is not configured");
    
    // UPSERT (Insert or Update) for id = 1
    const configData = { ...mapToDb(req.body), id: 1 };
    
    const { data, error } = await supabase.from('site_config').upsert(configData).select().single();
    if (error) throw error;
    
    res.json(mapToClient(data));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update config' });
  }
});

export default router;
