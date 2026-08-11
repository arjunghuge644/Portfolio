import React, { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import About from './components/About';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Add custom cursor active class to document body on fine pointer devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
      document.body.classList.add('custom-cursor-active');
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
      {/* Custom Lime Interactive Cursor */}
      <CustomCursor />

      {/* Floating Pill Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services / Technical Capabilities Accordion */}
      <Capabilities />

      {/* About & Integrated Technical Capabilities */}
      <About />

      {/* Featured Projects Visual Case Studies */}
      <Projects />

      {/* Experience & Achievements Editorial Timeline */}
      <Achievements />

      {/* Testimonials */}
      <Testimonials />

      {/* Frequently Asked Questions Accordion */}
      <Faq />

      {/* Visual Contact Form Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
