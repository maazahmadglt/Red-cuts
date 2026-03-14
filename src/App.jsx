// ── App.jsx ───────────────────────────────────────────────────
// Root component — assembles all sections in layout order
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Products from './components/Products';
import About from './components/About';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      {/* Sticky navigation */}
      <Navbar />

      {/* Main page sections */}
      <main>
        {/* 1. Hero — headline + primary CTA */}
        <Hero />



        {/* 3. Products — animated 4-card grid */}
        <Products />

        {/* 3. About / Why Choose Us */}
        <About />

        {/* 4. Customer Reviews */}
        <Reviews />
      </main>

      {/* Footer with social links */}
      <Footer />

      {/* Floating WhatsApp button — always visible */}
      <WhatsAppButton />
    </>
  );
}
