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
import PartnerDirectory from './components/PartnerDirectory';
import PartnerProfile from './components/PartnerProfile';
import PartnerSetup from './components/PartnerSetup';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';

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

// Partners Layout Component
const PartnersLayout = () => {
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
        <PartnerDirectory />
      </motion.div>
      <UpdatedFooter />
    </div>
  );
};

// Partner Profile Layout Component
const PartnerProfileLayout = () => {
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
        <PartnerProfile />
      </motion.div>
      <UpdatedFooter />
    </div>
  );
};

// Partner Setup Layout Component
const PartnerSetupLayout = () => {
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
        <PartnerSetup />
      </motion.div>
      <UpdatedFooter />
    </div>
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

// Admin Dashboard Layout Component
const AdminDashboardLayout = () => {
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
      <AdminDashboard />
    </motion.div>
  );
};

// Super Admin Dashboard Layout Component
const SuperAdminDashboardLayout = () => {
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
      <SuperAdminDashboard />
    </motion.div>
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
        {/* Main routes */}
        <Route path="/calc" element={<CalculatorOnlyLayout />} />
        <Route path="/embed" element={<CalculatorEmbedLayout />} />
        <Route path="/partners" element={<PartnersLayout />} />
        <Route path="/partner/:slug" element={<PartnerProfileLayout />} />
        <Route path="/partner-setup" element={<PartnerSetupLayout />} />
        <Route path="/how-it-works" element={<HowItWorksLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        <Route path="/admin" element={<AdminDashboardLayout />} />
        <Route path="/super-admin" element={<SuperAdminDashboardLayout />} />
        <Route path="/" element={<AppLayout />} />
        {/* Fallback route */}
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;