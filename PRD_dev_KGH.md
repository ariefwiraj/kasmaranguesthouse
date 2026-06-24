# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# Kasmaran Guest House Syariah

Version: 1.0
Status: MVP
Platform: Website Landing Page
Type: Single Page Website

---

# 1. PROJECT OVERVIEW

## Project Name

Kasmaran Guest House Syariah

## Project Description

Kasmaran Guest House Syariah membutuhkan website resmi sebagai media promosi digital yang menampilkan informasi penginapan secara profesional dan terpercaya.

Website berfungsi sebagai:

* Company Profile
* Media Promosi
* Informasi Kamar & Harga
* Informasi Fasilitas
* Informasi Lokasi
* Sarana Reservasi melalui WhatsApp

Website akan dibuat dalam bentuk Single Page Landing Page yang responsif pada perangkat desktop maupun mobile.

Reservasi dilakukan melalui WhatsApp sehingga tidak diperlukan sistem booking online pada fase awal.

---

# 2. BUSINESS OBJECTIVES

## Tujuan Bisnis

* Meningkatkan kredibilitas penginapan.
* Memiliki website resmi yang mudah dibagikan.
* Mempermudah calon tamu mendapatkan informasi.
* Meningkatkan jumlah reservasi melalui WhatsApp.
* Menjadi fondasi pengembangan sistem reservasi online di masa depan.

---

# 3. TARGET USERS

## Primary Users

* Wisatawan domestik
* Keluarga
* Pelancong bisnis

## Secondary Users

* Tamu luar kota
* Pasangan menikah
* Pengunjung acara keluarga di Jakarta Timur

---

# 4. BRAND IDENTITY

## Brand Personality

* Elegan
* Hangat
* Profesional
* Nyaman
* Syariah Modern

---

## Color Palette

Primary
#942325

Gold Soft
#C8A96B

White
#FFFFFF

Background
#FAF7F2

Text
#222222

---

## Design Direction

Modern Boutique Guest House

Karakter visual:

* Bersih
* Banyak whitespace
* Foto berkualitas tinggi
* Tidak terlalu ramai
* Elegan dan premium
* Fokus pada kenyamanan dan kepercayaan

---

# 5. TECH STACK

## Frontend

* React (Vite)
* Tailwind CSS
* ShadCN UI
* Framer Motion
* Lucide React
* Embla Carousel

---

## Backend (Future Development)

* Express.js
* Supabase
* PostgreSQL

---

## Deployment

Frontend:

* Vercel

Backend:

* Supabase
* Express API

---

# 6. WEBSITE NAVIGATION

Navbar (Sticky)

Logo

Tentang

Kamar

Fasilitas

Lokasi

Pesan Sekarang

---

# 7. APP FLOW

User membuka website

↓

Hero Section

↓

Melihat informasi penginapan

↓

Melihat kamar dan harga

↓

Melihat fasilitas

↓

Melihat galeri

↓

Melihat lokasi dan kontak

↓

Klik tombol Pesan Sekarang

↓

WhatsApp terbuka

↓

Calon tamu melakukan reservasi

---

# 8. PAGE STRUCTURE

## SECTION 1 — HERO

### Tujuan

Memberikan kesan pertama yang profesional.

### Content

* Logo Kasmaran
* Nama Penginapan
* Tagline
* Lokasi singkat
* Hero Image

### CTA

Button Primary

Pesan Sekarang

(Button membuka WhatsApp)

Button Secondary

Lihat Kamar

(Scroll ke section kamar)

---

## SECTION 2 — TENTANG

### Tujuan

Menjelaskan identitas penginapan.

### Content

* Deskripsi singkat penginapan
* Konsep syariah
* Lokasi strategis
* Kenyamanan bagi keluarga dan wisatawan

### Layout

2 Column

Desktop:
Image + Content

Mobile:
Stack Vertical

---

## SECTION 3 — KAMAR

### Tujuan

Menampilkan pilihan kamar dan harga.

### Content

Untuk setiap kamar:

* Foto
* Nama kamar
* Harga mulai dari
* Kapasitas tamu
* Fasilitas kamar

### CTA

Pesan Sekarang

(Button WhatsApp)

---

## SECTION 4 — FASILITAS

### Tujuan

Menampilkan fasilitas utama penginapan.

### Fasilitas

* WiFi Gratis
* AC
* TV
* Kamar Mandi Dalam
* Air Panas
* Area Parkir
* Area Bersantai
* Resepsionis

### Layout

Grid Card

Desktop:
4 kolom

Tablet:
2 kolom

Mobile:
1-2 kolom

---

## SECTION 5 — GALERI

### Tujuan

Menampilkan visual penginapan.

### Konten

* Tampak depan
* Kamar
* Kamar mandi
* Area umum
* Parkir

### Layout

Responsive Gallery

Desktop:
Masonry Grid

Mobile:
Carousel

---

## SECTION 6 — LOKASI & INFORMASI

### Tujuan

Membantu tamu menemukan lokasi dan menghubungi pengelola.

### Alamat

Jl. Kweni No. 25
Condet Balekambang
Kramat Jati
Jakarta Timur 13530

---

### Informasi Kontak

* WhatsApp
* Nomor Telepon
* Email (Opsional)

---

### Informasi Menginap

Check-in:
14.00 WIB

Check-out:
12.00 WIB

Reservasi WhatsApp:
24 Jam

---

### Google Maps

Embed Google Maps

---

### Actions

Button:

* Buka Google Maps
* Hubungi WhatsApp

---

## SECTION 7 — FOOTER

### Content

Logo

Kasmaran Guest House Syariah

Alamat Singkat

WhatsApp

Email (Opsional)

Copyright

© 2026 Kasmaran Guest House Syariah

---

# 9. MVP FEATURES

## Included

### Navigation

* Sticky Navbar
* Smooth Scroll
* Mobile Menu

### Hero

* Hero Banner
* CTA WhatsApp

### About

* Informasi Penginapan

### Rooms

* Daftar Kamar
* Harga
* CTA WhatsApp

### Facilities

* Fasilitas Penginapan

### Gallery

* Galeri Foto

### Location

* Google Maps
* Kontak
* Informasi Check-in

### Footer

* Informasi Dasar

### Additional

* Floating WhatsApp Button
* Framer Motion Animation
* Responsive Design
* SEO Meta Tags
* Open Graph Tags

---

# 10. NON-FUNCTIONAL REQUIREMENTS

## Performance

Lighthouse Score Target:

Performance ≥ 90

Accessibility ≥ 90

Best Practices ≥ 90

SEO ≥ 90

---

## Responsive

Mobile:
320px+

Tablet:
768px+

Desktop:
1024px+

Large Desktop:
1440px+

---

## Accessibility

* Semantic HTML
* Alt Image
* Keyboard Navigation
* Color Contrast Compliance

---

# 11. FUTURE ROADMAP

## Version 2

Admin Dashboard

* CRUD Kamar
* CRUD Galeri
* CRUD Fasilitas
* CRUD Harga

---

## Version 3

Booking Request Form

* Nama
* Nomor Telepon
* Tanggal Check-in
* Tanggal Check-out

Data tersimpan ke Supabase

---

## Version 4

Online Reservation System

* Availability Checking
* Booking Management
* Payment Integration

---

# 12. PROJECT STRUCTURE

src/

assets/

components/

* Navbar
* Hero
* About
* Rooms
* Facilities
* Gallery
* Location
* Footer

data/

* rooms.js
* facilities.js
* gallery.js

hooks/

lib/

pages/

* Home.jsx

App.jsx

main.jsx

---

# SUCCESS METRICS

* Website responsive di semua perangkat.
* Semua CTA WhatsApp berfungsi.
* Loading cepat (< 3 detik).
* Pengunjung dapat menemukan informasi kamar dalam ≤ 10 detik.
* Peningkatan jumlah inquiry melalui WhatsApp.
