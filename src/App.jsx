import React, { useEffect, useState } from 'react';
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

// Admin CMS & Context
import { AdminAuthProvider, useAdminAuth } from './admin/context/AdminAuthContext';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/pages/Login';

function AdminContainer() {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0b0b', color: '#b8ff35', fontFamily: 'system-ui, sans-serif' }}>
        Authenticating session security boundary...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return <AdminLayout />;
}

export default function App() {
  const [isAdminPath, setIsAdminPath] = useState(false);

  useEffect(() => {
    const checkPath = () => {
      const isAdmin = window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin');
      setIsAdminPath(isAdmin);
    };

    checkPath();
    window.addEventListener('popstate', checkPath);
    window.addEventListener('hashchange', checkPath);
    return () => {
      window.removeEventListener('popstate', checkPath);
      window.removeEventListener('hashchange', checkPath);
    };
  }, []);

  useEffect(() => {
    // Add custom cursor active class to document body on fine pointer devices when on public site
    if (!isAdminPath && !window.matchMedia('(pointer: coarse)').matches) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
  }, [isAdminPath]);

  // If accessing /admin route, render secure Admin CMS
  if (isAdminPath) {
    return (
      <AdminAuthProvider>
        <AdminContainer />
      </AdminAuthProvider>
    );
  }

  // Public Experience
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
