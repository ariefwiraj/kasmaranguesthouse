import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsAppButton from "../components/layout/FloatingWhatsAppButton";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Rooms from "../components/sections/Rooms";
import Facilities from "../components/sections/Facilities";
import Gallery from "../components/sections/Gallery";
import LocationInfo from "../components/sections/LocationInfo";
import AdminToolbar from "../components/admin/AdminToolbar";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <AdminToolbar />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Gallery />
        <Facilities />
        <LocationInfo />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
