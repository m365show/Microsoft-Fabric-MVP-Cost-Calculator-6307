import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PitchDeckGenerator from './PitchDeckGenerator';

const {
  FiDatabase, FiActivity, FiBrain, FiBarChart, FiShield, FiSettings,
  FiTarget, FiServer, FiClock, FiDollarSign, FiCheck, FiArrowRight,
  FiUsers, FiGlobe, FiTrendingUp, FiLock, FiEye, FiCode, FiZap,
  FiFileText, FiHeart, FiHardDrive, FiCloud, FiWifi, FiSave,
  FiRefreshCw, FiCalendar, FiTool, FiLink, FiGitBranch, FiPackage,
  FiMonitor, FiAward, FiSearch, FiLayers, FiKey, FiAlertTriangle,
  FiMapPin, FiSun, FiMoon, FiCpu, FiHome, FiSliders
} = FiIcons;

const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Initial form data
  const getInitialFormData = () => ({
    // Step 1 - Project Goals & Scope
    businessGoal: '',
    projectScope: '',
    expectedOutcome: '',

    // Step 2 - Data Sources & Requirements
    dataTypes: {
      structured: false,
      semiStructured: false,
      unstructured: false
    },
    dataSources: {
      sqlDatabases: false,
      dataLakes: false,
      erpCrm: false,
      apis: false,
      streaming: false
    },
    dataVolume: 'small',
    dataFrequency: 'daily',
    specificSources: '',

    // Company & Contact Info
    companyOverview: '',
    industry: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    linkedIn: '',
    testimonials: '',

    // Features for cost calculation
    features: {
      lakehouse: false,
      realTimeAnalytics: false,
      aiMl: false,
      powerBi: false,
      security: false,
      customConfig: false
    },
    computeResources: 'basic',
    geographic: 'single'
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [costs, setCosts] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const fabricFeatures = [
    { key: 'lakehouse', icon: FiDatabase, title: 'Lakehouse & Data Warehouse', basePrice: 500 },
    { key: 'realTimeAnalytics', icon: FiActivity, title: 'Real-Time Analytics', basePrice: 800 },
    { key: 'aiMl', icon: FiBrain, title: 'AI & Machine Learning', basePrice: 1200 },
    { key: 'powerBi', icon: FiBarChart, title: 'Power BI & Visualization', basePrice: 300 },
    { key: 'security', icon: FiShield, title: 'Security & Compliance', basePrice: 400 },
    { key: 'customConfig', icon: FiSettings, title: 'Custom Configuration', basePrice: 600 }
  ];

  const industryOptions = [
    'Finance & Banking',
    'Healthcare',
    'Retail & E-commerce',
    'Manufacturing',
    'Technology',
    'Education',
    'Government',
    'Energy & Utilities',
    'Insurance',
    'Telecommunications',
    'Transportation & Logistics',
    'Media & Entertainment',
    'Other'
  ];

  const calculateCosts = () => {
    let baseCost = 0;
    let developmentCost = 0;
    let supportCost = 0;

    // Calculate base feature costs
    Object.keys(formData.features).forEach(key => {
      if (formData.features[key]) {
        const feature = fabricFeatures.find(f => f.key === key);
        if (feature) baseCost += feature.basePrice;
      }
    });

    // Apply multipliers based on parameters
    const volumeMultiplier = {
      small: 1,
      medium: 1.5,
      large: 2.5,
      enterprise: 4
    };

    const computeMultiplier = {
      basic: 1,
      standard: 1.8,
      premium: 3.2
    };

    const geoMultiplier = {
      single: 1,
      'multi-region': 1.6,
      global: 2.4
    };

    baseCost *= volumeMultiplier[formData.dataVolume] || 1;
    baseCost *= computeMultiplier[formData.computeResources] || 1;
    baseCost *= geoMultiplier[formData.geographic] || 1;

    // Calculate development and support costs
    developmentCost = baseCost * 1.8; // 180% of infrastructure for development
    supportCost = baseCost * 0.35; // 35% for ongoing support

    const totalCost = baseCost + developmentCost + supportCost;

    const calculatedCosts = {
      infrastructure: Math.round(baseCost),
      development: Math.round(developmentCost),
      support: Math.round(supportCost),
      total: Math.round(totalCost),
      monthly: Math.round(totalCost / 12)
    };

    setCosts(calculatedCosts);
    return calculatedCosts;
  };

  const handleFeatureToggle = (category, featureKey) => {
    if (category === 'features') {
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureKey]: !prev.features[featureKey]
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [featureKey]: !prev[category][featureKey]
        }
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 2) {
      const calculatedCosts = calculateCosts();
      setShowResults(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResetCalculator = () => {
    setFormData(getInitialFormData());
    setCurrentStep(1);
    setCosts(null);
    setShowResults(false);
    setSaving(false);

    setTimeout(() => {
      const calculatorElement = document.getElementById('calculator');
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessGoal && formData.projectScope && formData.expectedOutcome;
      case 2:
        return Object.values(formData.dataTypes).some(Boolean) && 
               Object.values(formData.dataSources).some(Boolean) &&
               formData.companyName && formData.contactName && formData.email && formData.industry;
      default:
        return true;
    }
  };

  const totalSteps = 3;

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎯 Microsoft Fabric MVP Calculator
          </h2>
          <p className="text-xl text-gray-600">
            Professional cost calculation and pitch deck generation for Microsoft Fabric projects
          </p>

          {/* Reset Button */}
          {currentStep > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiRefreshCw} className="text-fabric-blue" />
                  <span className="text-sm text-gray-700">
                    Need to start over? Reset the calculator for a fresh start.
                  </span>
                </div>
                <motion.button
                  onClick={handleResetCalculator}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-fabric-blue text-white text-sm font-medium rounded-lg hover:bg-fabric-dark transition-colors"
                >
                  Start Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 overflow-x-auto">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 text-xs font-semibold mx-1 ${
                  step <= currentStep
                    ? 'bg-fabric-blue border-fabric-blue text-white'
                    : 'border-gray-300 text-gray-400'
                } transition-all duration-300`}
              >
                {step < currentStep ? (
                  <SafeIcon icon={FiCheck} className="text-xs" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-fabric-blue to-fabric-purple h-2 rounded-full"
              initial={{ width: `${(1 / totalSteps) * 100}%` }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Project Goals & Scope */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiTarget} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Project Goals & Business Objectives
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Goal *
                  </label>
                  <textarea
                    value={formData.businessGoal}
                    onChange={(e) => handleInputChange('businessGoal', e.target.value)}
                    placeholder="Define what the MVP aims to accomplish (real-time analytics, AI-driven forecasting, cost reduction, revenue optimization, operational efficiency...)"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Scope & Objectives *
                  </label>
                  <textarea
                    value={formData.projectScope}
                    onChange={(e) => handleInputChange('projectScope', e.target.value)}
                    placeholder="Detail specific functionalities required: dashboard creation, automated workflows, predictive analytics, real-time data ingestion, reporting systems, data pipeline automation..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-32 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Measurable Outcomes *
                  </label>
                  <textarea
                    value={formData.expectedOutcome}
                    onChange={(e) => handleInputChange('expectedOutcome', e.target.value)}
                    placeholder="Specify quantifiable results: 20% cost reduction, improved customer insights, 15% sales forecasting accuracy, faster decision-making, ROI targets..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                    required
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Data Sources & Company Info */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiDatabase} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Data Sources & Company Information
                </h3>
              </div>

              <div className="space-y-8">
                {/* Data Types */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Data Types Required * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'structured', icon: FiDatabase, title: 'Structured Data', desc: 'SQL databases, tables, CSV files' },
                      { key: 'semiStructured', icon: FiFileText, title: 'Semi-Structured', desc: 'JSON, XML, logs, APIs' },
                      { key: 'unstructured', icon: FiCloud, title: 'Unstructured Data', desc: 'Documents, images, videos, text' }
                    ].map((type) => (
                      <motion.div
                        key={type.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.dataTypes[type.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('dataTypes', type.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={type.icon}
                            className={`text-xl mt-1 ${
                              formData.dataTypes[type.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
                            <p className="text-sm text-gray-600">{type.desc}</p>
                          </div>
                          {formData.dataTypes[type.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Data Sources */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Primary Data Sources * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'sqlDatabases', icon: FiDatabase, title: 'SQL Databases', desc: 'Azure SQL, PostgreSQL, MySQL, Oracle' },
                      { key: 'dataLakes', icon: FiHardDrive, title: 'Data Lakes & Storage', desc: 'Azure Data Lake, Blob Storage, ADLS' },
                      { key: 'erpCrm', icon: FiSettings, title: 'Enterprise Systems', desc: 'Salesforce, Dynamics 365, SAP, Oracle' },
                      { key: 'apis', icon: FiWifi, title: 'APIs & Web Services', desc: 'REST APIs, GraphQL, Microservices' },
                      { key: 'streaming', icon: FiActivity, title: 'Streaming Data', desc: 'Kafka, Event Hub, IoT, Real-time feeds' }
                    ].map((source) => (
                      <motion.div
                        key={source.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.dataSources[source.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('dataSources', source.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={source.icon}
                            className={`text-xl mt-1 ${
                              formData.dataSources[source.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{source.title}</h4>
                            <p className="text-sm text-gray-600">{source.desc}</p>
                          </div>
                          {formData.dataSources[source.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Data Volume & Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Data Volume
                    </label>
                    <select
                      value={formData.dataVolume}
                      onChange={(e) => handleInputChange('dataVolume', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="small">Small (&lt;100GB)</option>
                      <option value="medium">Medium (100GB - 1TB)</option>
                      <option value="large">Large (1TB - 10TB)</option>
                      <option value="enterprise">Enterprise (&gt;10TB)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data Refresh Frequency
                    </label>
                    <select
                      value={formData.dataFrequency}
                      onChange={(e) => handleInputChange('dataFrequency', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="realTime">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                {/* Company Information */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Company & Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                        required
                      >
                        <option value="">Select Industry</option>
                        {industryOptions.map((industry) => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={formData.linkedIn}
                        onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Microsoft Fabric Components */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Microsoft Fabric Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fabricFeatures.map((feature) => (
                      <motion.div
                        key={feature.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.features[feature.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('features', feature.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={feature.icon}
                            className={`text-xl mt-1 ${
                              formData.features[feature.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1">{feature.title}</h5>
                            <p className="text-sm text-gray-600">${feature.basePrice} base</p>
                          </div>
                          {formData.features[feature.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Compute Resources & Geographic Scope */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Compute Resources
                    </label>
                    <select
                      value={formData.computeResources}
                      onChange={(e) => handleInputChange('computeResources', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="basic">Basic (1x multiplier)</option>
                      <option value="standard">Standard (1.8x multiplier)</option>
                      <option value="premium">Premium (3.2x multiplier)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Geographic Scope
                    </label>
                    <select
                      value={formData.geographic}
                      onChange={(e) => handleInputChange('geographic', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="single">Single Region</option>
                      <option value="multi-region">Multi-Region</option>
                      <option value="global">Global</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {currentStep === 3 && costs && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <SafeIcon icon={FiCheck} className="text-green-600 text-2xl" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Microsoft Fabric MVP Calculation Complete!
                </h3>
                <p className="text-gray-600">
                  Professional cost analysis and documentation ready
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <SafeIcon icon={FiDatabase} className="text-fabric-blue text-xl" />
                    <h4 className="font-semibold text-gray-900">Infrastructure</h4>
                  </div>
                  <p className="text-2xl font-bold text-fabric-blue">${costs.infrastructure.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Annual licensing & cloud infrastructure</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <SafeIcon icon={FiSettings} className="text-purple-600 text-xl" />
                    <h4 className="font-semibold text-gray-900">Implementation</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">${costs.development.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Development, integration & consulting</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <SafeIcon icon={FiUsers} className="text-green-600 text-xl" />
                    <h4 className="font-semibold text-gray-900">Support</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">${costs.support.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Annual maintenance & managed services</p>
                </div>
              </div>

              {/* Total Investment */}
              <div className="bg-gradient-to-r from-fabric-blue to-fabric-purple p-6 rounded-xl text-white text-center mb-8">
                <h4 className="text-lg font-semibold mb-2">Total Annual Investment</h4>
                <p className="text-4xl font-bold mb-2">${costs.total.toLocaleString()}</p>
                <p className="text-fabric-light">
                  ≈ ${costs.monthly.toLocaleString()}/month | Professional solution
                </p>
              </div>

              {/* Professional Documentation Generator */}
              <PitchDeckGenerator formData={formData} costs={costs} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Previous
          </button>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Step {currentStep} of {totalSteps}</span>
            <div className="text-xs text-gray-400">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
          </div>

          <motion.button
            onClick={handleNextStep}
            disabled={!isStepValid() || saving}
            whileHover={{ scale: isStepValid() && !saving ? 1.05 : 1 }}
            whileTap={{ scale: isStepValid() && !saving ? 0.95 : 1 }}
            className="px-6 py-3 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
          >
            {saving ? (
              <>
                <SafeIcon icon={FiRefreshCw} className="text-sm animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>{currentStep === totalSteps ? 'Generate Results' : 'Next'}</span>
                <SafeIcon icon={FiArrowRight} className="text-sm" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Calculator;