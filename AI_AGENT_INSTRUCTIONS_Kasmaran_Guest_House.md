# AI_AGENT_INSTRUCTIONS_Kasmaran_Guest_House.md

# AI Agent Implementation Guide

## Kasmaran Guest House Syariah

**Version:** 1.0
**Project Type:** Website Landing Page MVP
**Related PRD:** `PRD_KGH.md` / `PRD_dev_KGH.md`

---

# 1. PURPOSE OF THIS DOCUMENT

Dokumen ini berisi instruksi implementasi untuk AI coding agent yang akan membangun website **Kasmaran Guest House Syariah** berdasarkan PRD utama.
Fokus dokumen ini adalah mengurangi ambiguity saat agent mengerjakan proyek, menjaga konsistensi struktur kode, memastikan scope MVP tidak melebar, dan memberikan acceptance criteria yang terukur.

Dokumen ini **melengkapi PRD**, bukan menggantikannya.

---

# 2. AGENT OBJECTIVE

AI agent harus membangun **website landing page single-page** untuk **Kasmaran Guest House Syariah** dengan tujuan utama:

1. Menampilkan profil penginapan secara profesional.
2. Menampilkan informasi kamar, fasilitas, galeri, lokasi, dan kontak.
3. Mendorong calon tamu melakukan reservasi/inquiry melalui **WhatsApp**.
4. Menyediakan fondasi frontend yang rapi untuk pengembangan ke versi berikutnya.

---

# 3. PRIMARY DELIVERABLE

Agent harus menghasilkan **frontend landing page MVP** dengan stack yang telah ditentukan pada PRD, terdiri dari:

* Sticky navbar
* Hero section
* About section
* Rooms section
* Facilities section
* Gallery section
* Location & contact section
* Footer
* Floating WhatsApp button
* Responsive layout desktop + mobile
* SEO dasar (title, description, OG minimal)
* Smooth scroll antar section

---

# 4. SOURCE OF TRUTH

Agent harus menggunakan dokumen berikut sebagai sumber kebenaran:

## Primary Source

* `PRD_KGH.md` / `PRD_dev_KGH.md`

## Secondary Source

* Dokumen ini: `AI_AGENT_INSTRUCTIONS_Kasmaran_Guest_House.md`

## Conflict Resolution Rule

Jika ada konflik antara PRD dan dokumen ini, gunakan aturan berikut:

1. **Business scope / feature scope** mengikuti **PRD**
2. **Implementation detail / coding convention / acceptance criteria / data structure** mengikuti **AI Agent Instructions**
3. Jika tetap ambigu, **jangan mengarang aturan bisnis baru**; gunakan placeholder aman dan tandai di komentar/TODO

---

# 5. IN-SCOPE MVP

Agent hanya boleh membangun fitur berikut:

## Page / Section Scope

* Navbar
* Hero
* About
* Rooms
* Facilities
* Gallery
* Location & Information
* Footer

## Functional Scope

* Sticky navbar
* Smooth scroll ke section
* CTA WhatsApp
* CTA “Lihat Kamar”
* Google Maps embed / placeholder map area jika URL final belum tersedia
* Floating WhatsApp button
* Responsive navigation menu
* Basic animation ringan
* SEO meta tags dasar
* Open Graph tags dasar

## Content Scope

* Menampilkan informasi penginapan
* Menampilkan daftar kamar
* Menampilkan fasilitas
* Menampilkan galeri
* Menampilkan alamat, jam check-in/out, kontak
* Menampilkan CTA pemesanan via WhatsApp

---

# 6. OUT OF SCOPE

Agent **TIDAK BOLEH** mengimplementasikan fitur berikut pada MVP:

* Sistem booking online
* Form booking yang menyimpan data ke database
* Admin dashboard
* Authentication / login / register
* Payment gateway
* Availability checking
* Kalender booking
* CMS / panel CRUD
* Backend Express.js
* Integrasi Supabase
* Fitur multi-page kompleks
* Blog / artikel
* Testimonial management system
* Review system
* Multi-language system
* Dark mode toggle kecuali diminta eksplisit

Jika agent merasa fitur tambahan akan “membantu”, **tetap jangan diimplementasikan** kecuali ada instruksi eksplisit.

---

# 7. IMPLEMENTATION PRINCIPLES

Agent harus mengikuti prinsip berikut:

1. **Build only what is needed for MVP**
2. **Do not invent business rules that are not present in PRD**
3. **Do not hardcode repeated constants in multiple places**
4. **Separate data/content from UI components**
5. **Prefer reusable sections and configuration-driven content**
6. **Use mobile-first responsive design**
7. **Use accessible semantic HTML**
8. **Keep animations subtle and lightweight**
9. **Preserve extensibility for future admin/dashboard integration**
10. **Use placeholders safely when final content/assets are unavailable**

---

# 8. REQUIRED TECH STACK

Agent harus menggunakan stack berikut:

## Frontend Core

* React
* Vite

## Styling

* Tailwind CSS

## UI / Utility

* shadcn/ui
* Lucide React
* Framer Motion
* Embla Carousel

## Optional Utility

Boleh menambahkan library ringan bila benar-benar diperlukan untuk kualitas implementasi, tetapi hindari dependency berlebihan.

---

# 9. LANGUAGE & FILE CONVENTION

## Programming Language

Gunakan **JavaScript + JSX** bila project existing belum menggunakan TypeScript.
Jika project sudah diinisialisasi dengan TypeScript, maka gunakan TypeScript secara konsisten.

**Default rule untuk MVP ini:**

* Jika belum ada preferensi existing dari repo, gunakan **JavaScript (React + Vite)** agar implementasi tetap sederhana.

## Naming Convention

* Components: `PascalCase`
* Hooks: `useSomething`
* Data/config files: `camelCase` atau `kebab-case` yang konsisten
* Section IDs: lowercase kebab-case

Contoh:

* `Navbar.jsx`
* `Hero.jsx`
* `RoomsSection.jsx`
* `siteConfig.js`
* `rooms.js`

---

# 10. REQUIRED PROJECT STRUCTURE

Gunakan struktur berikut sebagai baseline:

```txt
src/
  assets/
    images/
    icons/

  components/
    layout/
      Navbar.jsx
      Footer.jsx
      FloatingWhatsAppButton.jsx

    sections/
      Hero.jsx
      About.jsx
      Rooms.jsx
      Facilities.jsx
      Gallery.jsx
      LocationInfo.jsx

    ui/
      (opsional untuk wrapper komponen reusable)

  data/
    siteConfig.js
    rooms.js
    facilities.js
    gallery.js

  lib/
    whatsapp.js
    utils.js

  pages/
    Home.jsx

  App.jsx
  main.jsx
```

## Notes

* Semua konten statis yang mudah berubah **harus** diletakkan di folder `data/`
* Semua helper CTA WhatsApp **harus** diletakkan di `lib/whatsapp.js`
* Jangan menyimpan data room/facility/gallery langsung di komponen section

---

# 11. DESIGN DIRECTION RULES

Agent harus mengikuti identitas brand dari PRD:

## Brand Feel

* Elegan
* Hangat
* Profesional
* Nyaman
* Syariah modern

## Visual Direction

* Clean
* Banyak whitespace
* Tidak ramai
* Foto menjadi elemen penting
* Nuansa premium namun tetap ramah
* Fokus pada trust dan kenyamanan

## Avoid

* UI terlalu ramai
* Warna terlalu mencolok
* Animasi berlebihan
* Layout terlalu “startup SaaS”
* Visual yang terasa generik seperti dashboard admin

---

# 12. COLOR TOKENS

Gunakan warna dari PRD sebagai source of truth. Simpan sebagai token/theme constants jika diperlukan.

```txt
Primary: #942325
Gold Soft: #C8A96B
White: #FFFFFF
Background: #FAF7F2
Text: #222222
```

## Usage Guidance

* Primary → CTA utama, highlight, badge penting
* Gold Soft → aksen premium ringan
* Background → section background lembut
* Text → body text utama

Jangan gunakan terlalu banyak warna tambahan di luar palet ini kecuali warna netral untuk border, muted text, dan surface.

---

# 13. CONTENT STATUS POLICY

Karena tidak semua konten final tersedia di PRD, agent harus mengikuti aturan ini:

## Final / Known Content

Anggap informasi berikut sebagai final jika tersedia di PRD:

* Nama bisnis
* Alamat
* Jam check-in/check-out
* daftar section
* daftar fasilitas umum
* konsep website single page
* CTA utama via WhatsApp

## Potentially Missing / Placeholder-Allowed Content

Jika belum tersedia secara eksplisit, agent boleh menggunakan placeholder terstruktur untuk:

* tagline hero
* deskripsi singkat about
* detail tiap kamar
* jumlah kamar
* harga tiap kamar
* foto kamar
* foto galeri
* nomor WhatsApp final
* email final
* Google Maps embed URL final

## Placeholder Rules

Jika menggunakan placeholder:

1. Gunakan placeholder yang **rapi dan realistis**
2. Simpan di file data, bukan hardcoded di JSX
3. Beri komentar `TODO: replace with final content`
4. Jangan membuat klaim bisnis sensitif/faktual yang tidak diketahui kebenarannya

---

# 14. SITE CONFIG CONTRACT

Agent harus membuat file konfigurasi terpusat, misalnya `src/data/siteConfig.js`.

Contoh struktur minimal:

```js
export const siteConfig = {
  businessName: "Kasmaran Guest House Syariah",
  tagline: "Penginapan nyaman dan strategis untuk keluarga dan wisatawan",
  shortLocation: "Condet, Jakarta Timur",
  address: [
    "Jl. Kweni No. 25",
    "Condet Balekambang",
    "Kramat Jati",
    "Jakarta Timur 13530",
  ],
  phoneNumber: "",
  whatsappNumber: "",
  whatsappDefaultMessage:
    "Halo, saya ingin bertanya tentang ketersediaan kamar di Kasmaran Guest House Syariah.",
  email: "",
  checkInTime: "14.00 WIB",
  checkOutTime: "12.00 WIB",
  reservationHours: "24 Jam",
  googleMapsEmbedUrl: "",
  googleMapsPlaceUrl: "",
};
```

## Rules

* Semua nomor, alamat, CTA default, dan informasi kontak harus bersumber dari file config ini
* Jangan mengulang string yang sama di banyak komponen

---

# 15. DATA CONTRACTS

Agent harus menyiapkan data statis terpisah untuk rooms, facilities, dan gallery.

---

## 15.1 Rooms Data Contract

Buat `src/data/rooms.js`

```js
export const rooms = [
  {
    id: "standard-room",
    name: "Standard Room",
    startingPrice: "Rp xxx.xxx / malam",
    capacity: "2 Tamu",
    features: ["AC", "WiFi", "TV", "Kamar Mandi Dalam"],
    image: "/placeholder-room.jpg",
    whatsappMessage:
      "Halo, saya tertarik dengan Standard Room di Kasmaran Guest House Syariah. Mohon info ketersediaan dan harga.",
  },
];
```

### Rules

* `id` harus unik
* `name` wajib
* `startingPrice` boleh placeholder bila harga final belum tersedia
* `features` adalah array string
* `whatsappMessage` disiapkan per kamar agar CTA kamar lebih relevan

---

## 15.2 Facilities Data Contract

Buat `src/data/facilities.js`

```js
export const facilities = [
  {
    id: "wifi",
    name: "WiFi Gratis",
    icon: "Wifi",
    description: "Akses internet untuk kenyamanan tamu selama menginap.",
  },
];
```

### Rules

* `icon` mengacu ke icon Lucide yang akan dipetakan di komponen
* Jika deskripsi tidak ingin ditampilkan, tetap boleh disimpan untuk extensibility

---

## 15.3 Gallery Data Contract

Buat `src/data/gallery.js`

```js
export const galleryItems = [
  {
    id: "front-1",
    title: "Tampak Depan",
    image: "/placeholder-gallery-1.jpg",
    category: "front",
  },
];
```

### Allowed categories

* `front`
* `room`
* `bathroom`
* `common-area`
* `parking`

---

# 16. WHATSAPP CTA IMPLEMENTATION RULES

Semua CTA pemesanan harus mengikuti aturan ini.

## Required Helper

Buat helper di `src/lib/whatsapp.js`

Contoh:

```js
export function buildWhatsAppLink(phoneNumber, message) {
  const cleanNumber = String(phoneNumber || "").replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message || "");
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
```

## CTA Rules

1. Semua tombol `Pesan Sekarang` harus menggunakan helper ini
2. Nomor WhatsApp tidak boleh di-hardcode di beberapa komponen
3. CTA global menggunakan `siteConfig.whatsappDefaultMessage`
4. CTA per kamar menggunakan `room.whatsappMessage`
5. Link dibuka di tab baru:

   * `target="_blank"`
   * `rel="noreferrer"`
6. Jika nomor WhatsApp final belum tersedia:

   * agent boleh tetap menyiapkan helper dan wiring CTA
   * namun gunakan placeholder kosong / TODO di config
   * jangan mengarang nomor acak

---

# 17. SECTION ID RULES

Gunakan ID berikut untuk smooth scroll:

* Hero → `#home`
* About → `#about`
* Rooms → `#rooms`
* Facilities → `#facilities`
* Gallery → `#gallery`
* Location → `#location`

Navbar harus menaut ke ID-ID tersebut.

---

# 18. NAVBAR REQUIREMENTS

## Must Have

* Sticky navbar
* Logo / nama bisnis
* Menu desktop
* Mobile menu
* CTA “Pesan Sekarang”

## Menu Items

* Tentang
* Kamar
* Fasilitas
* Lokasi
* Pesan Sekarang

## Behavior

* Sticky di top
* Navbar berubah subtle saat scroll jika diperlukan
* Mobile menu harus bisa dibuka/tutup
* Smooth scroll ke section terkait
* CTA “Pesan Sekarang” menuju WhatsApp

---

# 19. HERO SECTION REQUIREMENTS

## Purpose

Membuat kesan pertama yang profesional dan meyakinkan.

## Required Content

* Nama penginapan
* Tagline
* Lokasi singkat
* Hero image
* CTA “Pesan Sekarang”
* CTA “Lihat Kamar”

## Recommended Layout

* Desktop: 2 kolom
* Mobile: 1 kolom

## Acceptance Criteria

Hero dianggap selesai jika:

1. Menampilkan brand name, tagline, lokasi singkat
2. Menampilkan minimal 2 CTA
3. CTA “Pesan Sekarang” membuka WhatsApp
4. CTA “Lihat Kamar” scroll ke section rooms
5. Hero image responsif dan memiliki alt text
6. Hierarki visual jelas: heading > subheading > CTA

---

# 20. ABOUT SECTION REQUIREMENTS

## Required Content

* Deskripsi singkat penginapan
* Konsep syariah modern
* Lokasi strategis
* Penekanan pada kenyamanan untuk keluarga dan wisatawan

## Acceptance Criteria

1. Terdapat heading section
2. Terdapat deskripsi 1–3 paragraf singkat atau poin ringkas
3. Layout nyaman dibaca di mobile dan desktop
4. Tidak menampilkan klaim syariah yang tidak ada di PRD

---

# 21. ROOMS SECTION REQUIREMENTS

## Required Content per room

* Foto kamar
* Nama kamar
* Harga mulai dari
* Kapasitas tamu
* Fasilitas kamar
* CTA WhatsApp

## Acceptance Criteria

1. Section menampilkan list kamar dari file data
2. Setiap card kamar memiliki nama, harga, kapasitas, fitur, dan CTA
3. CTA kamar menggunakan pesan WhatsApp spesifik kamar
4. Layout card konsisten di berbagai breakpoint
5. Jika data final kamar belum tersedia, gunakan data placeholder yang rapi

---

# 22. FACILITIES SECTION REQUIREMENTS

## Required Content

Tampilkan fasilitas utama penginapan, minimal sesuai PRD:

* WiFi Gratis
* AC
* TV
* Kamar Mandi Dalam
* Air Panas
* Area Parkir
* Area Bersantai
* Resepsionis

## Acceptance Criteria

1. Data fasilitas berasal dari file `facilities.js`
2. Setiap item menampilkan icon + nama
3. Layout grid responsif
4. Jumlah kolom menyesuaikan breakpoint dengan nyaman

---

# 23. GALLERY SECTION REQUIREMENTS

## Required Content

* Tampak depan
* Kamar
* Kamar mandi
* Area umum
* Parkir

## Responsive Behavior

* Desktop: grid / masonry-like feel
* Mobile: carousel atau stacked layout yang nyaman

## Acceptance Criteria

1. Gallery menampilkan item dari `gallery.js`
2. Gambar memiliki alt text
3. Layout mobile dan desktop sama-sama usable
4. Jika Embla Carousel dipakai untuk mobile, implementasi harus stabil dan tidak memecah layout desktop

---

# 24. LOCATION & INFORMATION SECTION REQUIREMENTS

## Required Content

* Alamat lengkap
* Informasi kontak
* Jam check-in
* Jam check-out
* Reservasi WhatsApp
* Google Maps embed / link
* Tombol buka Google Maps
* Tombol hubungi WhatsApp

## Acceptance Criteria

1. Alamat tampil jelas dan mudah dibaca
2. Informasi check-in / check-out tampil jelas
3. CTA Google Maps dan WhatsApp tersedia
4. Jika embed URL belum tersedia, agent boleh menampilkan placeholder area map + tombol buka maps ketika URL final belum ada
5. Jangan membuat embed URL palsu yang tidak valid

---

# 25. FOOTER REQUIREMENTS

## Required Content

* Logo / nama bisnis
* Alamat singkat
* WhatsApp
* Email jika tersedia
* Copyright

## Acceptance Criteria

1. Footer menampilkan identitas bisnis secara ringkas
2. Informasi kontak tetap mudah ditemukan
3. Layout footer tidak terlalu padat di mobile

---

# 26. FLOATING WHATSAPP BUTTON REQUIREMENTS

## Must Have

* Fixed button di area bawah layar
* Selalu visible namun tidak menutupi konten penting
* Link ke WhatsApp default message

## Acceptance Criteria

1. Button muncul di desktop dan mobile
2. Tidak mengganggu CTA utama lain
3. Menggunakan nomor dan pesan dari config/helper

---

# 27. SEO REQUIREMENTS

Agent harus menambahkan SEO dasar.

## Minimal Required

* `<title>`
* meta description
* Open Graph title
* Open Graph description
* Open Graph type
* favicon / placeholder bila tersedia

## Suggested Default SEO Copy

Agent boleh menggunakan copy dasar berikut jika belum ada versi final:

* **Title:** Kasmaran Guest House Syariah | Penginapan Nyaman di Condet Jakarta Timur
* **Description:** Kasmaran Guest House Syariah menyediakan penginapan nyaman di Condet, Jakarta Timur dengan fasilitas lengkap dan reservasi mudah melalui WhatsApp.

## Rules

* Jangan membuat klaim berlebihan yang tidak ada di PRD
* Meta description usahakan tidak terlalu panjang
* Jika project memakai React Helmet atau pendekatan metadata lain, gunakan cara yang paling sederhana dan konsisten

---

# 28. ACCESSIBILITY RULES

Agent harus menjaga aksesibilitas dasar:

1. Gunakan semantic HTML (`header`, `main`, `section`, `footer`, dll)
2. Semua image memiliki `alt`
3. Tombol dan link punya label jelas
4. Warna memiliki kontras yang cukup
5. Mobile menu bisa digunakan dengan keyboard dasar
6. Heading hierarchy masuk akal
7. Jangan menjadikan elemen non-interaktif sebagai tombol tanpa alasan

---

# 29. RESPONSIVE RULES

Website harus mobile-first dan usable di:

* Mobile: 320px+
* Tablet: 768px+
* Desktop: 1024px+
* Large Desktop: 1440px+

## General Rules

* Hindari text terlalu kecil
* Hindari card terlalu sempit
* CTA utama tetap terlihat di mobile
* Navbar mobile tidak boleh rusak
* Gallery dan room cards tetap rapi di layar kecil

---

# 30. ANIMATION RULES

Agent boleh menggunakan Framer Motion secara ringan.

## Allowed

* Fade in ringan
* Slide up ringan saat section masuk viewport
* Hover effect ringan pada card / button

## Avoid

* Parallax berat
* Animasi panjang berlebihan
* Motion yang mengganggu readability
* Animasi besar pada semua elemen sekaligus

Prioritas utama tetap **clarity dan performance**.

---

# 31. IMAGE / ASSET POLICY

## If final assets are available

Gunakan asset final dan simpan di lokasi yang terstruktur.

## If final assets are NOT available

Agent boleh:

* menggunakan placeholder image
* menggunakan rasio gambar yang konsisten
* menandai TODO untuk replacement asset

## Recommended Ratios

* Hero image: 16:9 atau 4:3 tergantung komposisi
* Room card image: 4:3
* Gallery: fleksibel tapi konsisten per grid

---

# 32. PERFORMANCE RULES

Target performa mengikuti PRD:

* Performance ≥ 90
* Accessibility ≥ 90
* Best Practices ≥ 90
* SEO ≥ 90

## Practical implementation guidance

* Gunakan gambar terkompresi / placeholder ringan
* Hindari dependency yang tidak perlu
* Jangan menambahkan efek berat
* Jangan membuat state kompleks yang tidak dibutuhkan

---

# 33. NO-INVENTION RULES

Agent **tidak boleh mengarang** hal-hal berikut tanpa dasar dari PRD atau data final:

* Nomor WhatsApp final
* Harga kamar final
* Daftar kamar final jika belum diberikan
* Email resmi final
* URL Google Maps final
* Aturan syariah spesifik
* Klaim bisnis seperti “rating terbaik”, “paling murah”, “terdekat”, dsb

Jika informasi tidak tersedia:

* gunakan placeholder netral
* beri TODO
* jangan mengklaim sebagai data final

---

# 34. BUILD ORDER

Agent harus mengerjakan proyek dengan urutan berikut:

1. Setup struktur project / folder
2. Buat `siteConfig.js`
3. Buat `rooms.js`, `facilities.js`, `gallery.js`
4. Buat helper `buildWhatsAppLink()`
5. Implement `Navbar`
6. Implement `Hero`
7. Implement `About`
8. Implement `Rooms`
9. Implement `Facilities`
10. Implement `Gallery`
11. Implement `LocationInfo`
12. Implement `Footer`
13. Implement `FloatingWhatsAppButton`
14. Integrasikan smooth scroll & CTA
15. Tambahkan SEO dasar
16. Review responsive behavior
17. Review accessibility dasar
18. Final cleanup

---

# 35. REQUIRED OUTPUT BEHAVIOR FOR AGENT

Saat menyelesaikan pekerjaan, agent sebaiknya:

1. Menyebut file apa saja yang dibuat/diubah
2. Menjelaskan placeholder mana yang masih perlu diganti
3. Menjelaskan asumsi yang diambil jika ada data yang belum tersedia
4. Tidak mengklaim data placeholder sebagai data final

---

# 36. DEFINITION OF DONE

Implementasi MVP dianggap selesai jika seluruh poin berikut terpenuhi:

## Functional

* Navbar sticky berfungsi
* Smooth scroll berfungsi
* CTA WhatsApp berfungsi secara teknis
* Floating WhatsApp button berfungsi
* Semua section utama tampil

## Content / Structure

* Hero, About, Rooms, Facilities, Gallery, Location, Footer tersedia
* Data room/facility/gallery dipisah dari komponen
* Kontak dan informasi lokasi tampil jelas

## UI / UX

* Responsive di mobile dan desktop
* CTA utama mudah ditemukan
* Layout tidak rusak pada breakpoint umum
* Visual sesuai nuansa elegan, hangat, profesional

## Technical

* Tidak ada error fatal di console
* Tidak ada broken internal navigation
* Tidak ada hardcoded WhatsApp link di banyak tempat
* SEO dasar sudah dipasang
* Aksesibilitas dasar diterapkan

---

# 37. HANDOFF NOTES FOR FUTURE VERSION

Struktur kode harus memudahkan pengembangan ke:

* Admin dashboard
* CRUD kamar/fasilitas/galeri/harga
* Booking request form
* Supabase integration
* Online reservation system

Karena itu:

* pisahkan data dari UI
* hindari coupling berlebihan
* gunakan naming yang konsisten
* siapkan komponen agar mudah di-refactor ke data dinamis di masa depan

---

# 38. FINAL INSTRUCTION TO AGENT

Bangun website landing page MVP **Kasmaran Guest House Syariah** secara rapi, ringan, dan konsisten dengan PRD.
Prioritaskan:

1. kejelasan informasi,
2. kualitas presentasi visual,
3. CTA WhatsApp yang berfungsi,
4. responsive design,
5. maintainable code structure.

Jangan menambahkan fitur di luar scope.
Jika data final belum tersedia, gunakan placeholder yang aman, tandai dengan TODO, dan tetap jaga kualitas struktur implementasi.
