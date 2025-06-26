import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import LanguageSelector from './LanguageSelector';

const { FiMenu, FiX, FiCloud, FiBarChart3, FiShare2, FiUsers, FiBriefcase, FiBook, FiPhone } = FiIcons;

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentLanguageFromPath = () => {
    const path = location.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      // Check if first segment is a valid language code
      const supportedLangCodes = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'sv'];
      if (supportedLangCodes.includes(firstSegment)) {
        return firstSegment;
      }
    }
    return 'en';
  };

  const getLocalizedPath = (path) => {
    const currentLang = getCurrentLanguageFromPath();
    if (currentLang === 'en') {
      return path;
    }
    return `/${currentLang}${path}`;
  };

  const handleNavigation = (path) => {
    const localizedPath = getLocalizedPath(path);
    navigate(localizedPath);
    setIsMenuOpen(false);
    // Don't scroll here, let the component handle it
  };

  const navItems = [
    { name: t('nav.calculator') || 'Calculator', path: '#calculator', icon: FiBarChart3 },
    { name: t('nav.features') || 'Features', path: '#features', icon: FiCloud },
    { name: 'Partners', path: '/partners', icon: FiUsers },
    { name: 'How It Works', path: '/how-it-works', icon: FiBook },
    { name: 'Contact', path: '/contact', icon: FiPhone },
    { name: t('nav.share') || 'Share', path: '#share', icon: FiShare2 }
  ];

  const handleLogoClick = () => {
    const homePath = getLocalizedPath('/');
    navigate(homePath);
  };

  const handleNavClick = (item) => {
    if (item.path.startsWith('#')) {
      // Handle anchor links
      const currentLang = getCurrentLanguageFromPath();
      const isOnHomePage = location.pathname === '/' || location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`;
      
      if (!isOnHomePage) {
        // If not on home page, navigate to home first
        const homePath = getLocalizedPath('/');
        navigate(homePath);
        setTimeout(() => {
          const element = document.querySelector(item.path);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        // If on home page, scroll to section
        const element = document.querySelector(item.path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Handle regular navigation
      handleNavigation(item.path);
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCloud} className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-fabric-blue to-fabric-purple bg-clip-text text-transparent">
              Fabric MVP Calculator
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item)}
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 text-gray-600 hover:text-fabric-blue transition-colors duration-200 px-2 py-1"
              >
                <SafeIcon icon={item.icon} className="text-sm" />
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
            <LanguageSelector />
          </nav>

          {/* Mobile Menu Button & Language Selector */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-fabric-blue hover:bg-gray-50 transition-colors w-full text-left"
              >
                <SafeIcon icon={item.icon} className="text-lg" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;