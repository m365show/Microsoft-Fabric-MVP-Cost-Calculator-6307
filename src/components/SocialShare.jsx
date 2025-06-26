import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShare2, FiLinkedin, FiTwitter, FiFacebook, FiMail, FiTrendingUp, FiUsers, FiGlobe } = FiIcons;

const SocialShare = () => {
  const shareOnLinkedIn = () => {
    const text = 'Just discovered this amazing Microsoft Fabric MVP Cost Calculator! 🚀 Perfect tool for calculating data analytics implementation costs and generating professional pitch decks. #MicrosoftFabric #DataAnalytics #MVPCalculator #TechTools';
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = '🌟 Microsoft Fabric MVP Cost Calculator & Pitch Deck Generator 🚀\n\nInstantly calculate costs for:\n✅ Data Analytics\n✅ AI/ML Integration\n✅ Real-time Analytics\n✅ Professional Pitch Decks\n\nCheck it out: ' + window.location.href + '\n\n#MicrosoftFabric #DataAnalytics #StartupTools #TechCalculator';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareByEmail = () => {
    const subject = 'Microsoft Fabric MVP Cost Calculator - Amazing Tool!';
    const body = `Hi,

I found this incredible Microsoft Fabric MVP Cost Calculator that I thought you'd find useful!

🚀 Features:
• Instant cost calculations for Microsoft Fabric implementations
• Professional pitch deck generation
• Industry-specific cost estimates
• SEO-optimized for maximum visibility

Perfect for:
- Startups planning data analytics solutions
- Companies evaluating Microsoft Fabric
- Consultants preparing client proposals
- Anyone needing accurate MVP cost estimates

Check it out: ${window.location.href}

Best regards!`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const benefits = [
    {
      icon: FiTrendingUp,
      title: 'Boost Project Visibility',
      description: 'SEO-optimized sharing increases your project\'s online discoverability'
    },
    {
      icon: FiUsers,
      title: 'Attract Industry Partners',
      description: 'Connect with potential clients, vendors, and implementation specialists'
    },
    {
      icon: FiGlobe,
      title: 'Expand Professional Network',
      description: 'Reach decision-makers and stakeholders in your industry'
    }
  ];

  return (
    <section id="share" className="py-20 bg-gradient-to-br from-fabric-blue/5 via-fabric-purple/5 to-fabric-light/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📤 Share & Grow Your Project Visibility
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share this powerful calculator to attract potential partners, clients, and service providers. 
            Accelerate your MVP development with industry connections.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={benefit.icon} className="text-white text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Sharing Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <SafeIcon icon={FiShare2} className="mr-3 text-fabric-blue" />
              Share This Tool
            </h3>
            <p className="text-gray-600">
              Choose your preferred platform to share and expand your professional network
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.button
              onClick={shareOnLinkedIn}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <SafeIcon icon={FiLinkedin} className="text-xl" />
              <div className="text-left">
                <div className="font-semibold text-sm">LinkedIn</div>
                <div className="text-xs opacity-90">Professional Network</div>
              </div>
            </motion.button>

            <motion.button
              onClick={shareOnTwitter}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <SafeIcon icon={FiTwitter} className="text-xl" />
              <div className="text-left">
                <div className="font-semibold text-sm">Twitter/X</div>
                <div className="text-xs opacity-90">Quick Visibility</div>
              </div>
            </motion.button>

            <motion.button
              onClick={shareOnFacebook}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <SafeIcon icon={FiFacebook} className="text-xl" />
              <div className="text-left">
                <div className="font-semibold text-sm">Facebook</div>
                <div className="text-xs opacity-90">Broad Reach</div>
              </div>
            </motion.button>

            <motion.button
              onClick={shareByEmail}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <SafeIcon icon={FiMail} className="text-xl" />
              <div className="text-left">
                <div className="font-semibold text-sm">Email</div>
                <div className="text-xs opacity-90">Direct Contact</div>
              </div>
            </motion.button>
          </div>

          {/* SEO Keywords Display */}
          <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3 text-center">
              📈 SEO-Optimized Keywords for Maximum Visibility
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Microsoft Fabric MVP Pricing',
                'Cost Calculator Microsoft Fabric',
                'MVP Pitch Deck Generator',
                'Microsoft Fabric Implementation Costs',
                'Data Analytics Cost Estimation',
                'MVP Cost Estimator for Startups',
                'Microsoft Fabric Solutions Pricing'
              ].map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-fabric-blue text-xs font-medium rounded-full border border-fabric-blue/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* LinkedIn Company Page CTA */}
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-fabric-blue/10 to-fabric-purple/10 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">
              🔗 Expand Your Professional Network
            </h4>
            <p className="text-gray-600 mb-4 text-sm">
              Follow our LinkedIn Company Page for updates, insights, and best practices in Microsoft Fabric, 
              cloud solutions, and digital transformation
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiLinkedin} />
              <span>Follow Our LinkedIn Page</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialShare;