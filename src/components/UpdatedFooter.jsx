import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCloud, FiMail, FiLinkedin, FiHeart, FiArrowUp, FiExternalLink, FiHome, FiBook, FiPhone } = FiIcons;

const UpdatedFooter = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', path: '/', icon: FiHome, internal: true },
    { label: 'How It Works', path: '/how-it-works', icon: FiBook, internal: true },
    { label: 'Contact / Support', path: '/contact', icon: FiPhone, internal: true },
    { label: 'LinkedIn Page', url: 'https://www.linkedin.com/school/m365-show/', icon: FiLinkedin, internal: false }
  ];

  const handleLinkClick = (link) => {
    if (link.internal) {
      handleNavigation(link.path);
    } else {
      window.open(link.url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-4 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiCloud} className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-fabric-blue to-fabric-purple bg-clip-text text-transparent">
                Microsoft Fabric MVP Calculator
              </span>
            </motion.div>

            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Professional cost calculation and pitch deck generation for Microsoft Fabric MVP projects. 
              Designed for startups, enterprises, and consultants who need accurate planning and professional documentation.
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-white mb-3">🌐 Live Calculator</h4>
              <a
                href="https://fabric.m365calc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-fabric-blue hover:text-fabric-light transition-colors"
              >
                <span>https://fabric.m365calc.com</span>
                <SafeIcon icon={FiExternalLink} className="text-sm" />
              </a>
            </div>

            <div className="flex space-x-4">
              <motion.a
                href="https://www.linkedin.com/school/m365-show/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <SafeIcon icon={FiLinkedin} className="text-lg" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/m365-summit/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <SafeIcon icon={FiLinkedin} className="text-lg" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 text-left"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.slice(3).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 text-left"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Embed Code</h4>
              <div className="bg-gray-800 p-3 rounded-lg text-xs">
                <code className="text-gray-300">
                  &lt;iframe src="https://fabric.m365calc.com/#/embed"<br />
                  width="100%" height="1800"<br />
                  title="Microsoft Fabric MVP Calculator"&gt;<br />
                  &lt;/iframe&gt;
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <h4 className="text-sm font-semibold text-gray-300 mb-4">🔍 SEO Keywords & Topics:</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              'Microsoft Fabric MVP Pricing',
              'Cost Calculator Microsoft Fabric',
              'MVP Pitch Deck Generator',
              'Microsoft Fabric Implementation Costs',
              'Data Analytics Cost Estimation',
              'MVP Cost Estimator for Startups',
              'Microsoft Fabric Solutions Pricing',
              'Enterprise Data Platform Costs',
              'Fabric MVP Planning Tool'
            ].map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* How to Get Started Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">🚀 How to Get Started</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <h5 className="font-semibold text-gray-300 mb-2">1. Define Your MVP</h5>
              <p className="text-gray-400">Identify your Microsoft Fabric use case and business objectives</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-300 mb-2">2. Use Calculator</h5>
              <p className="text-gray-400">Select features, get costs, and generate professional documentation</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-300 mb-2">3. Download Results</h5>
              <p className="text-gray-400">Get professional pitch deck and cost analysis</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-300 mb-2">4. Start Building</h5>
              <p className="text-gray-400">Begin development with clear specifications and timeline</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400 text-sm mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <span>© {currentYear} Microsoft Fabric MVP Calculator.</span>
              <span>Made with</span>
              <SafeIcon icon={FiHeart} className="text-red-500 text-sm" />
              <span>for the Microsoft community</span>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm">Back to top</span>
            <SafeIcon icon={FiArrowUp} className="text-sm" />
          </motion.button>
        </div>

        {/* Contact & Attribution */}
        <div className="text-center mt-8 space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-300 text-sm mb-2">
              <SafeIcon icon={FiMail} className="inline mr-2" />
              For partnerships, embedding, or custom implementations
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              <a
                href="https://www.linkedin.com/school/m365-show/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fabric-blue hover:text-fabric-light transition-colors flex items-center space-x-1"
              >
                <SafeIcon icon={FiLinkedin} />
                <span>Follow M365 Show</span>
              </a>
              <span className="hidden sm:inline text-gray-500">•</span>
              <a
                href="https://www.linkedin.com/in/m365-summit/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fabric-blue hover:text-fabric-light transition-colors flex items-center space-x-1"
              >
                <SafeIcon icon={FiLinkedin} />
                <span>Connect with Mirko</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UpdatedFooter;