import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { supportedLanguages } from '../i18n';

const { FiGlobe, FiChevronDown, FiCheck } = FiIcons;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0]
  );

  // Update current language when i18n language changes
  useEffect(() => {
    const newCurrentLanguage = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0];
    setCurrentLanguage(newCurrentLanguage);
  }, [i18n.language]);

  const getCurrentLanguageFromPath = () => {
    const path = location.pathname;
    // Check if path starts with a language code
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      const lang = supportedLanguages.find(l => l.code === firstSegment);
      if (lang) {
        return lang.code;
      }
    }
    return 'en'; // Default to English
  };

  const handleLanguageChange = (langCode) => {
    const newLang = supportedLanguages.find(lang => lang.code === langCode);
    if (!newLang) return;

    console.log('Changing language to:', langCode);

    // Update current language state immediately
    setCurrentLanguage(newLang);
    
    // Get current path without language prefix
    let currentPath = location.pathname;
    let cleanPath = currentPath;

    // Remove existing language prefix if any
    const currentLangFromPath = getCurrentLanguageFromPath();
    if (currentLangFromPath !== 'en') {
      cleanPath = currentPath.replace(`/${currentLangFromPath}`, '') || '/';
    }

    // Construct new path
    let newPath;
    if (newLang.code === 'en') {
      newPath = cleanPath;
    } else {
      newPath = `/${newLang.code}${cleanPath}`;
    }

    // Add hash if present
    if (location.hash) {
      newPath += location.hash;
    }

    console.log('Navigating to:', newPath);

    // Update i18n language
    i18n.changeLanguage(langCode);
    
    // Navigate to new path
    navigate(newPath, { replace: true });
    
    // Update document attributes
    document.documentElement.lang = langCode;
    document.documentElement.dir = ['ar', 'he'].includes(langCode) ? 'rtl' : 'ltr';
    
    // Store in localStorage for persistence
    localStorage.setItem('preferredLanguage', langCode);
    
    // Close dropdown
    setIsOpen(false);
    
    // Scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Initialize language on component mount
  useEffect(() => {
    const currentLangFromPath = getCurrentLanguageFromPath();
    if (currentLangFromPath !== i18n.language) {
      i18n.changeLanguage(currentLangFromPath);
      setCurrentLanguage(supportedLanguages.find(lang => lang.code === currentLangFromPath) || supportedLanguages[0]);
    }
  }, [location.pathname]); // Re-run when path changes

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm min-w-[120px]"
      >
        <SafeIcon icon={FiGlobe} className="text-fabric-blue text-lg" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline flex-1 text-left">
          {currentLanguage.name}
        </span>
        <SafeIcon 
          icon={FiChevronDown} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
            >
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 px-3 py-2 border-b border-gray-100 mb-2">
                  Select Language / Wähle Sprache / Choisir la langue
                </div>
                
                {supportedLanguages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    whileHover={{ backgroundColor: '#f8fafc' }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      currentLanguage.code === language.code
                        ? 'bg-fabric-blue/10 text-fabric-blue border border-fabric-blue/20'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{language.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{language.name}</div>
                      <div className="text-xs text-gray-500">
                        {language.code === 'en' ? '/' : `/${language.code}/`}
                      </div>
                    </div>
                    {currentLanguage.code === language.code && (
                      <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="border-t border-gray-100 p-3">
                <div className="text-xs text-gray-500 text-center">
                  🌍 {supportedLanguages.length} languages supported
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;