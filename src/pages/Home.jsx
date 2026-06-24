import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsAppButton from "../components/layout/FloatingWhatsAppButton";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Rooms from "../components/sections/Rooms";
import Facilities from "../components/sections/Facilities";
import Gallery from "../components/sections/Gallery";
import LocationInfo from "../components/sections/LocationInfo";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Facilities />
        <Gallery />
        <LocationInfo />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
