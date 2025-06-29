import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import SocialShare from './components/SocialShare';
import UpdatedFooter from './components/UpdatedFooter';
import CalculatorOnly from './components/CalculatorOnly';
import CalculatorEmbed from './components/CalculatorEmbed';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';

import './App.css';

// Main App Layout Component
const AppLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 font-inter">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Features />
        <Calculator />
        <SocialShare />
      </motion.div>
      <UpdatedFooter />
    </div>
  );
};

// Calculator Only Layout Component
const CalculatorOnlyLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <CalculatorOnly />
    </motion.div>
  );
};

// Calculator Embed Layout Component
const CalculatorEmbedLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <CalculatorEmbed />
    </motion.div>
  );
};

// How It Works Layout Component
const HowItWorksLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 font-inter">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HowItWorks />
      </motion.div>
      <UpdatedFooter />
    </div>
  );
};

// Contact Layout Component
const ContactLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 font-inter">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Contact />
      </motion.div>
      <UpdatedFooter />
    </div>
  );
};

function App() {
  useEffect(() => {
    // Set initial document language
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  return (
    <Router>
      <Routes>
        {/* Calculator routes */}
        <Route path="/calc" element={<CalculatorOnlyLayout />} />
        <Route path="/embed" element={<CalculatorEmbedLayout />} />
        
        {/* Content pages */}
        <Route path="/how-it-works" element={<HowItWorksLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        
        {/* Home page */}
        <Route path="/" element={<AppLayout />} />
        
        {/* Fallback route */}
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;