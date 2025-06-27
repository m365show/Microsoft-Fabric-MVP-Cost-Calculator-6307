import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiDatabase, FiActivity, FiBrain, FiBarChart, FiShield, FiSettings,
  FiUsers, FiGlobe, FiZap, FiTrendingUp, FiShare2, FiLinkedin,
  FiFileText, FiMail, FiDollarSign, FiCode, FiCopy
} = FiIcons;

const Features = () => {
  const fabricFeatures = [
    {
      icon: FiDatabase,
      title: 'Lakehouse & Data Warehouse',
      description: 'Calculate costs for unified data storage, Delta Lake format, and SQL/Spark compute engines.'
    },
    {
      icon: FiActivity,
      title: 'Real-Time Analytics',
      description: 'Estimate streaming analytics, event processing, KQL databases, and live dashboards.'
    },
    {
      icon: FiBrain,
      title: 'AI & Machine Learning',
      description: 'Get pricing for model development, MLOps, cognitive services, and AutoML capabilities.'
    },
    {
      icon: FiBarChart,
      title: 'Power BI & Visualization',
      description: 'Calculate dashboard licensing, embedded analytics, and self-service reporting costs.'
    },
    {
      icon: FiShield,
      title: 'Security & Compliance',
      description: 'Factor in data governance, RBAC, encryption, and industry compliance requirements.'
    },
    {
      icon: FiSettings,
      title: 'Custom Configuration',
      description: 'Tailor calculations for industry-specific needs, custom connectors, and workflows.'
    }
  ];

  const benefits = [
    {
      icon: FiZap,
      title: 'Instant Professional Results',
      description: 'Get enterprise-grade cost breakdowns and documentation in minutes, not days.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: FiFileText,
      title: 'Investor-Ready Documentation',
      description: 'Download professional pitch decks that impress stakeholders and secure funding.',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: FiMail,
      title: 'Ready-to-Send Templates',
      description: 'Copy-paste email templates for immediate outreach to implementation partners.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Accelerate MVP Development',
      description: 'Skip the planning phase and jump straight to implementation with clear specifications.',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const targetAudience = [
    {
      icon: FiUsers,
      title: 'Product Managers & Tech Leads',
      description: 'Get accurate cost estimates and technical specifications for stakeholder approval.',
      useCases: [
        'Budget planning',
        'Vendor selection',
        'Timeline estimation',
        'Stakeholder buy-in'
      ]
    },
    {
      icon: FiTrendingUp,
      title: 'Founders & Innovation Teams',
      description: 'Create professional presentations for investors and board members.',
      useCases: [
        'Investor pitches',
        'Board presentations',
        'Grant applications',
        'Strategic planning'
      ]
    },
    {
      icon: FiCode,
      title: 'Consultants & Solution Partners',
      description: 'Generate client-ready proposals and accelerate sales cycles.',
      useCases: [
        'Client proposals',
        'Sales presentations',
        'Project scoping',
        'Competitive bidding'
      ]
    }
  ];

  const getEmbedCode = () => {
    return `<iframe src="https://fabric.m365calc.com/#/embed" width="100%" height="1800" style="border: none;border-radius: 8px;" title="Microsoft Fabric MVP Calculator"></iframe>`;
  };

  const copyEmbedCode = () => {
    const embedCode = getEmbedCode();
    navigator.clipboard.writeText(embedCode);
    
    // Show success feedback
    const button = document.getElementById('copy-embed-btn');
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.backgroundColor = '#10b981';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '';
    }, 2000);
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🛠️ Built for Real Microsoft Fabric MVP Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional cost calculation and pitch deck generation for startups, enterprises, and consultants
          </p>
        </motion.div>

        {/* Microsoft Fabric Features Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📊 Microsoft Fabric Components & Cost Calculation
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the Fabric features you need and get instant, accurate pricing breakdowns
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fabricFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-xl flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🚀 Why Choose Our Professional Calculator
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to plan, present, and execute your Microsoft Fabric MVP
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <SafeIcon icon={benefit.icon} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Target Audience Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              👥 Built for Different Professional Needs
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're planning internally, pitching to investors, or proposing to clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-xl flex items-center justify-center mb-6">
                  <SafeIcon icon={audience.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{audience.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{audience.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Perfect for:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {audience.useCases.map((useCase, i) => (
                      <div key={i} className="flex items-center space-x-1 text-sm text-gray-600">
                        <div className="w-1 h-1 bg-fabric-blue rounded-full"></div>
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Embed Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💡 Embed Calculator on Your Website
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Partners and consultants: Add this calculator to your site to help clients plan their Microsoft Fabric projects
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Calculator-Only Embed Code:</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <code>
                    {getEmbedCode()}
                  </code>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ✅ Clean calculator interface only (no header/footer) • Perfect for embedding
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  id="copy-embed-btn"
                  onClick={copyEmbedCode}
                  className="px-6 py-3 bg-fabric-blue text-white font-semibold rounded-lg hover:bg-fabric-dark transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiCopy} />
                  <span>Copy Code</span>
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold text-gray-900 mb-2">Benefits of Embedding:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>Help clients calculate project costs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>Generate professional specifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>Streamline proposal processes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>Attract qualified leads</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-fabric-blue/5 via-fabric-purple/5 to-fabric-light/5 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            🎯 Ready to Calculate Your Microsoft Fabric MVP?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've used our calculator to plan, present, and execute successful Microsoft Fabric projects
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiZap} className="text-lg" />
              <span>Start My MVP Calculator</span>
            </motion.button>
            <div className="flex items-center space-x-2 text-gray-500">
              <SafeIcon icon={FiUsers} className="text-sm" />
              <span className="text-sm">Used by 1000+ professionals</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;