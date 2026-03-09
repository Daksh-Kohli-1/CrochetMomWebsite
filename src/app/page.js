import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import BouquetBuilder from '../components/BouquetBuilder';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StorySection />
      <ProductGrid />
      <BouquetBuilder/>
      <Footer />
    </main>
  );
}
