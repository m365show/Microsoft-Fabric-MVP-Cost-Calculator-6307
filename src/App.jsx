import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
import { supportedLanguages } from './i18n';
import './i18n';
import './App.css';

// Language Route Wrapper Component
const LanguageWrapper = ({ children }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentLanguageFromPath = () => {
    const path = location.pathname;
    // Check if path starts with a language code
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      const langFromPath = supportedLanguages.find(l => l.code === firstSegment);
      if (langFromPath) {
        return langFromPath.code;
      }
    }
    return 'en'; // Default to English
  };

  useEffect(() => {
    console.log('LanguageWrapper useEffect - lang param:', lang);
    console.log('Current path:', location.pathname);
    console.log('Current i18n language:', i18n.language);

    const currentLangFromPath = getCurrentLanguageFromPath();
    console.log('Language from path:', currentLangFromPath);

    // Determine which language should be active
    const targetLanguage = lang || currentLangFromPath;
    
    // Validate language
    const isValidLang = supportedLanguages.some(l => l.code === targetLanguage);
    
    if (isValidLang && i18n.language !== targetLanguage) {
      console.log('Setting language to:', targetLanguage);
      i18n.changeLanguage(targetLanguage);
      document.documentElement.lang = targetLanguage;
      document.documentElement.dir = ['ar', 'he'].includes(targetLanguage) ? 'rtl' : 'ltr';
    } else if (!isValidLang && targetLanguage !== 'en') {
      console.log('Invalid language, redirecting to English');
      // Redirect to English if invalid language
      navigate('/', { replace: true });
    }

    // Always scroll to top when route changes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [lang, location.pathname, i18n, navigate]);

  return children;
};

// Main App Layout Component
const AppLayout = () => {
  useEffect(() => {
    // Scroll to top when component mounts
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

function App() {
  useEffect(() => {
    // Set initial document language
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  return (
    <Router>
      <Routes>
        {/* English routes (no language prefix) */}
        <Route path="/calc" element={<LanguageWrapper><CalculatorOnlyLayout /></LanguageWrapper>} />
        <Route path="/embed" element={<LanguageWrapper><CalculatorEmbedLayout /></LanguageWrapper>} />
        <Route path="/partners" element={<LanguageWrapper><PartnersLayout /></LanguageWrapper>} />
        <Route path="/partner/:slug" element={<LanguageWrapper><PartnerProfileLayout /></LanguageWrapper>} />
        <Route path="/partner-setup" element={<LanguageWrapper><PartnerSetupLayout /></LanguageWrapper>} />
        <Route path="/how-it-works" element={<LanguageWrapper><HowItWorksLayout /></LanguageWrapper>} />
        <Route path="/contact" element={<LanguageWrapper><ContactLayout /></LanguageWrapper>} />
        <Route path="/" element={<LanguageWrapper><AppLayout /></LanguageWrapper>} />

        {/* Localized routes with language prefixes */}
        {supportedLanguages
          .filter(lang => lang.code !== 'en') // Exclude English as it uses root paths
          .map(lang => (
            <React.Fragment key={lang.code}>
              <Route path={`/${lang.code}/calc`} element={<LanguageWrapper><CalculatorOnlyLayout /></LanguageWrapper>} />
              <Route path={`/${lang.code}/embed`} element={<LanguageWrapper><CalculatorEmbedLayout /></LanguageWrapper>} />
              <Route path={`/${lang.code}/partners`} element={<LanguageWrapper><PartnersLayout /></LanguageWrapper>} />
              <Route path={`/${lang.code}/partner/:slug`} element={<LanguageWrapper><PartnerProfileLayout /></LanguageWrapper>} />
              <Route path={`/${lang.code}/partner-setup`} element={<LanguageWrapper><PartnerSetupLayout /></LanguageWrapper>} />
              <Route path={`/${lang.code}/how-it-works`} element={<LanguageWrapper><HowItWorksLayout /></LanguageWrapper>} />
              <Route path={`/${lang.code}/contact`} element={<LanguageWrapper><ContactLayout /></LanguageWrapper>} />
              <Route path={`/${lang.code}`} element={<LanguageWrapper><AppLayout /></LanguageWrapper>} />
            </React.Fragment>
          ))}

        {/* Dynamic language routes for any valid language */}
        <Route path="/:lang/calc" element={<LanguageWrapper><CalculatorOnlyLayout /></LanguageWrapper>} />
        <Route path="/:lang/embed" element={<LanguageWrapper><CalculatorEmbedLayout /></LanguageWrapper>} />
        <Route path="/:lang/partners" element={<LanguageWrapper><PartnersLayout /></LanguageWrapper>} />
        <Route path="/:lang/partner/:slug" element={<LanguageWrapper><PartnerProfileLayout /></LanguageWrapper>} />
        <Route path="/:lang/partner-setup" element={<LanguageWrapper><PartnerSetupLayout /></LanguageWrapper>} />
        <Route path="/:lang/how-it-works" element={<LanguageWrapper><HowItWorksLayout /></LanguageWrapper>} />
        <Route path="/:lang/contact" element={<LanguageWrapper><ContactLayout /></LanguageWrapper>} />
        <Route path="/:lang" element={<LanguageWrapper><AppLayout /></LanguageWrapper>} />

        {/* Fallback route */}
        <Route path="*" element={<LanguageWrapper><AppLayout /></LanguageWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;