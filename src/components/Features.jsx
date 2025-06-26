import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDatabase, FiActivity, FiBrain, FiBarChart, FiShield, FiSettings, FiUsers, FiGlobe, FiZap, FiTrendingUp, FiShare2, FiLinkedin, FiFileText, FiMail, FiDollarSign, FiCode, FiCopy } = FiIcons;

const Features = () => {
  const { t, i18n } = useTranslation();

  const fabricFeatures = [
    {
      icon: FiDatabase,
      title: t('features.lakehouse') || 'Lakehouse & Data Warehouse',
      description: 'Calculate costs for unified data storage, Delta Lake format, and SQL/Spark compute engines.'
    },
    {
      icon: FiActivity,
      title: t('features.realTimeAnalytics') || 'Real-Time Analytics',
      description: 'Estimate streaming analytics, event processing, KQL databases, and live dashboards.'
    },
    {
      icon: FiBrain,
      title: t('features.aiMl') || 'AI & Machine Learning',
      description: 'Get pricing for model development, MLOps, cognitive services, and AutoML capabilities.'
    },
    {
      icon: FiBarChart,
      title: t('features.powerBi') || 'Power BI & Visualization',
      description: 'Calculate dashboard licensing, embedded analytics, and self-service reporting costs.'
    },
    {
      icon: FiShield,
      title: t('features.security') || 'Security & Compliance',
      description: 'Factor in data governance, RBAC, encryption, and industry compliance requirements.'
    },
    {
      icon: FiSettings,
      title: t('features.customConfig') || 'Custom Configuration',
      description: 'Tailor calculations for industry-specific needs, custom connectors, and workflows.'
    }
  ];

  const benefits = [
    {
      icon: FiZap,
      title: t('features.instantResults'),
      description: t('features.instantResultsDesc'),
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: FiFileText,
      title: t('features.investorReady'),
      description: t('features.investorReadyDesc'),
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: FiMail,
      title: t('features.readyTemplates'),
      description: t('features.readyTemplatesDesc'),
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: FiTrendingUp,
      title: t('features.accelerateMVP'),
      description: t('features.accelerateMVPDesc'),
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const targetAudience = [
    {
      icon: FiUsers,
      title: t('features.productManagers'),
      description: t('features.productManagersDesc'),
      useCases: [
        t('features.budgetPlanning'),
        t('features.vendorSelection'),
        t('features.timelineEstimation'),
        t('features.stakeholderBuyIn')
      ]
    },
    {
      icon: FiTrendingUp,
      title: t('features.foundersTeams'),
      description: t('features.foundersTeamsDesc'),
      useCases: [
        t('features.investorPitches'),
        t('features.boardPresentations'),
        t('features.grantApplications'),
        t('features.strategicPlanning')
      ]
    },
    {
      icon: FiCode,
      title: t('features.consultantsPartners'),
      description: t('features.consultantsPartnersDesc'),
      useCases: [
        t('features.clientProposals'),
        t('features.salesPresentations'),
        t('features.projectScoping'),
        t('features.competitiveBidding')
      ]
    }
  ];

  const getEmbedCode = () => {
    const currentLang = i18n.language;
    const langPath = currentLang === 'en' ? '' : `/${currentLang}`;
    return `<iframe src="https://fabric.m365calc.com/#${langPath}/calc" width="100%" height="1800" style="border: none;border-radius: 8px;" title="Microsoft Fabric MVP Calculator"></iframe>`;
  };

  const copyEmbedCode = () => {
    const embedCode = getEmbedCode();
    navigator.clipboard.writeText(embedCode);
    
    // Show success feedback
    const button = document.getElementById('copy-embed-btn');
    const originalText = button.textContent;
    button.textContent = t('features.copied');
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
            🛠️ {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
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
              📊 {t('features.componentsTitle')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('features.componentsSubtitle')}
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
              🚀 {t('features.whyChooseTitle')}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.whyChooseSubtitle')}
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
              👥 {t('features.professionalNeedsTitle')}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.professionalNeedsSubtitle')}
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
                  <h4 className="font-semibold text-gray-900 text-sm">{t('features.perfectFor')}</h4>
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
              💡 {t('features.embedTitle')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('features.embedSubtitle')}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{t('features.embedCodeTitle')}</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <code>
                    {getEmbedCode()}
                  </code>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ✅ {t('features.embedNote')}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  id="copy-embed-btn"
                  onClick={copyEmbedCode}
                  className="px-6 py-3 bg-fabric-blue text-white font-semibold rounded-lg hover:bg-fabric-dark transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiCopy} />
                  <span>{t('features.copyCode')}</span>
                </button>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold text-gray-900 mb-2">{t('features.embedBenefitsTitle')}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>{t('features.helpClientsCalculate')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>{t('features.generateSpecs')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>{t('features.streamlineProposals')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-fabric-blue rounded-full"></div>
                  <span>{t('features.attractLeads')}</span>
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
            🎯 {t('features.readyToCalculateTitle')}
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('features.readyToCalculateSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiZap} className="text-lg" />
              <span>{t('features.startCalculator')}</span>
            </motion.button>
            <div className="flex items-center space-x-2 text-gray-500">
              <SafeIcon icon={FiUsers} className="text-sm" />
              <span className="text-sm">{t('features.usedByProfessionals')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;