import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiZap, FiTrendingUp, FiDownload, FiFileText, FiTarget, FiMail, FiShare2, FiDollarSign, FiClock, FiUsers, FiSettings } = FiIcons;

const Hero = () => {
  const { t } = useTranslation();

  const handleScrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50" />
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fabric-blue/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-fabric-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-fabric-light/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Live URL Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-fabric-blue/20 mb-6"
          >
            <SafeIcon icon={FiStar} className="text-fabric-blue animate-bounce-subtle" />
            <span className="text-sm font-medium text-fabric-blue">🌐 Live at: https://fabric.m365calc.com</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-fabric-blue via-fabric-purple to-fabric-light bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
            <br />
            <span className="text-gray-800">
              {t('hero.subtitle')}
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-medium">
              {t('hero.description')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('hero.tagline')} <br />
            {t('hero.subtagline')} <br />
            <span className="text-lg text-gray-500">{t('hero.accelerate')}</span>
          </motion.p>

          {/* Key Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
              <SafeIcon icon={FiZap} className="text-fabric-blue text-3xl mb-3 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">{t('hero.instantCost')}</h3>
              <p className="text-gray-600 text-sm">{t('hero.instantCostDesc')}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
              <SafeIcon icon={FiFileText} className="text-purple-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">{t('hero.autoPdf')}</h3>
              <p className="text-gray-600 text-sm">{t('hero.autoPdfDesc')}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
              <SafeIcon icon={FiMail} className="text-green-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">{t('hero.emailTemplates')}</h3>
              <p className="text-gray-600 text-sm">{t('hero.emailTemplatesDesc')}</p>
            </div>
          </motion.div>

          {/* Target Audience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-10"
          >
            {[
              { icon: FiTarget, text: 'Product Managers & Tech Leads' },
              { icon: FiTrendingUp, text: 'Founders & Innovation Teams' },
              { icon: FiUsers, text: 'Consultants & Solution Partners' }
            ].map((audience, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-700">
                <SafeIcon icon={audience.icon} className="text-fabric-blue text-lg" />
                <span className="font-medium">{audience.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <motion.button
              onClick={handleScrollToCalculator}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,120,212,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiZap} className="text-lg" />
              <span>{t('hero.calculateCosts')}</span>
            </motion.button>
            <motion.button
              onClick={handleScrollToCalculator}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-fabric-blue font-semibold rounded-xl border-2 border-fabric-blue/20 hover:border-fabric-blue/40 transition-all duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiDownload} className="text-lg" />
              <span>{t('hero.generatePitch')}</span>
            </motion.button>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-6xl mx-auto border border-gray-200/50"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              🚀 Simple 4-Step Process for Real MVP Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Select Features', desc: 'Choose Microsoft Fabric components & define requirements', icon: FiSettings },
                { step: '2', title: 'Get Instant Costs', desc: 'View detailed pricing breakdown with infrastructure, development & support', icon: FiDollarSign },
                { step: '3', title: 'Download Pitch Deck', desc: 'Professional PDF with technical scope, budget & timeline', icon: FiFileText },
                { step: '4', title: 'Contact Partners', desc: 'Use email templates to reach Microsoft Partners & consultants', icon: FiMail }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <SafeIcon icon={item.icon} className="text-fabric-blue text-2xl mx-auto mb-2" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Share Calculator CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 p-6 bg-gradient-to-r from-fabric-blue/10 to-fabric-purple/10 rounded-xl"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-center">
              <SafeIcon icon={FiShare2} className="mr-2 text-fabric-blue" />
              🔗 Share This Free Tool
            </h4>
            <p className="text-gray-600 mb-4">
              Help others discover this professional Microsoft Fabric calculator. Share the landing page to attract development partners and expand your network.
            </p>
            <div className="flex justify-center space-x-4">
              <span className="px-4 py-2 bg-white text-fabric-blue font-medium rounded-lg border border-fabric-blue/20">
                https://fabric.m365calc.com
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg">
                100% Free
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;