import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Reviews from '@/components/sections/Reviews';
import Contacts from '@/components/sections/Contacts';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Reviews />
      <Contacts />
      <Footer />
    </main>
  );
}
