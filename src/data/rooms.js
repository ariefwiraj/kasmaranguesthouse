import room1Img from "../assets/images/rooms/room-1.jpg";
import room2Img from "../assets/images/rooms/room-2.jpg";
import room3Img from "../assets/images/rooms/room-3.jpg";
import room4Img from "../assets/images/rooms/room-4.jpg";

export const rooms = [
  {
    id: "standard-room",
    name: "Standard Room",
    startingPrice: "Rp 250.000",
    capacity: "2 Tamu",
    features: ["AC", "WiFi", "TV", "Kamar Mandi Dalam"],
    image: room4Img, 
    gallery: [
      { id: 1, title: "Kamar Tidur", url: room4Img },
      { id: 2, title: "Wastafel", url: room1Img },
      { id: 3, title: "Kamar Mandi", url: room2Img }
    ],
    roomInfo: [
      { icon: "Maximize", label: "12.0 m²" },
      { icon: "BedDouble", label: "1 queen bed" },
      { icon: "Eye", label: "Pemandangan Kota" },
      { icon: "Users", label: "2 tamu" }
    ],
    facilities: [
      "AC",
      "Air minum kemasan cuma-cuma",
      "TV Layar Datar",
      "Kamar Mandi Dalam",
      "Shower Air Dingin/Panas",
      "Free WiFi"
    ],
    whatsappMessage:
      "Halo, saya tertarik dengan Standard Room di Kasmaran Guest House Syariah. Mohon info ketersediaan.",
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    startingPrice: "Rp 350.000",
    capacity: "2 Tamu",
    features: ["AC", "WiFi", "TV", "Kamar Mandi Dalam", "Air Panas", "Lebih Luas"],
    image: room3Img,
    gallery: [
      { id: 1, title: "Kamar Tidur Utama", url: room3Img },
      { id: 2, title: "Wastafel", url: room1Img },
      { id: 3, title: "Kamar Mandi", url: room2Img }
    ],
    roomInfo: [
      { icon: "Maximize", label: "18.0 m²" },
      { icon: "BedDouble", label: "1 king bed" },
      { icon: "Eye", label: "Pemandangan Taman" },
      { icon: "Users", label: "2 tamu" }
    ],
    facilities: [
      "AC",
      "Air minum kemasan cuma-cuma",
      "TV Layar Datar 40 inch",
      "Kamar Mandi Dalam",
      "Shower Air Dingin/Panas",
      "Area tempat duduk terpisah",
      "Pembuat kopi / teh",
      "Free WiFi"
    ],
    whatsappMessage:
      "Halo, saya tertarik dengan Deluxe Room di Kasmaran Guest House Syariah. Mohon info ketersediaan.",
  },
  {
    id: "family-room",
    name: "Family Room",
    startingPrice: "Rp 500.000",
    capacity: "4 Tamu",
    features: ["AC", "WiFi", "TV", "Kamar Mandi Dalam", "Air Panas", "2 Bed Besar"],
    image: room3Img,
    gallery: [
      { id: 1, title: "Kamar Tidur Utama", url: room3Img },
      { id: 2, title: "Kamar Mandi", url: room2Img },
      { id: 3, title: "Wastafel", url: room1Img }
    ],
    roomInfo: [
      { icon: "Maximize", label: "24.0 m²" },
      { icon: "BedDouble", label: "2 queen bed" },
      { icon: "Eye", label: "Pemandangan Taman" },
      { icon: "Users", label: "4 tamu" }
    ],
    facilities: [
      "AC",
      "Air minum kemasan cuma-cuma",
      "TV Layar Datar 43 inch",
      "Kamar Mandi Dalam Luas",
      "Shower Air Dingin/Panas",
      "Area makan kecil",
      "Pembuat kopi / teh",
      "Free WiFi"
    ],
    whatsappMessage:
      "Halo, saya tertarik dengan Family Room di Kasmaran Guest House Syariah. Mohon info ketersediaan.",
  }
];
