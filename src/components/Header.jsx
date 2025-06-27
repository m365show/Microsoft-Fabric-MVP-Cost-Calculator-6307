import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiCloud, FiBarChart3, FiShare2, FiUsers, FiBriefcase, FiBook, FiPhone, FiSettings } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Calculator', path: '#calculator', icon: FiBarChart3 },
    { name: 'Features', path: '#features', icon: FiCloud },
    { name: 'Partners', path: '/partners', icon: FiUsers },
    { name: 'How It Works', path: '/how-it-works', icon: FiBook },
    { name: 'Contact', path: '/contact', icon: FiPhone },
    { name: 'Share', path: '#share', icon: FiShare2 }
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavClick = (item) => {
    if (item.path.startsWith('#')) {
      // Handle anchor links
      const isOnHomePage = location.pathname === '/';
      if (!isOnHomePage) {
        // If not on home page, navigate to home first
        navigate('/');
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

  // Add admin access - double click on logo
  const handleLogoDoubleClick = () => {
    const adminPath = prompt('Enter admin path (admin or super-admin):');
    if (adminPath === 'admin' || adminPath === 'super-admin') {
      navigate(`/${adminPath}`);
    }
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
            onDoubleClick={handleLogoDoubleClick}
            title="Double-click for admin access"
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
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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