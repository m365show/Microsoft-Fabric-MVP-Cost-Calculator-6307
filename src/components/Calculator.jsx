import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PitchDeckGenerator from './PitchDeckGenerator';
import supabase from '../lib/supabase';

const {
  FiDatabase, FiActivity, FiBrain, FiBarChart, FiShield, FiSettings, FiTarget,
  FiServer, FiClock, FiDollarSign, FiCheck, FiArrowRight, FiUsers, FiGlobe,
  FiTrendingUp, FiLock, FiEye, FiCode, FiZap, FiFileText, FiHeart,
  FiHardDrive, FiCloud, FiWifi, FiSave, FiRefreshCw, FiCalendar, FiTool,
  FiLink, FiGitBranch, FiPackage, FiMonitor, FiAward, FiSearch, FiLayers,
  FiKey, FiAlertTriangle, FiMapPin, FiSun, FiMoon, FiCpu, FiHome, FiSliders
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

    // Step 3 - Data Governance & Quality
    dataGovernance: {
      metadataManagement: false,
      dataQuality: false,
      dataLineage: false,
      dataCatalog: false
    },
    backupRecovery: {
      rto: '',
      rpo: '',
      backupFrequency: 'daily',
      retentionPolicy: ''
    },

    // Step 4 - Advanced Analytics Requirements
    analyticalCapabilities: {
      predictiveAnalytics: false,
      machineLearning: false,
      realTimeVisualization: false,
      nlpProcessing: false,
      anomalyDetection: false,
      imageProcessing: false
    },
    analyticalOutputs: '',
    reportingRequirements: '',

    // Step 5 - Compute & Processing
    computeNeeds: '',
    scalabilityExpectations: '',
    processingTypes: {
      batch: false,
      realTime: false,
      aiMl: false
    },

    // Step 6 - Infrastructure & Environment
    environment: 'cloud',
    geographicalRegions: '',
    complianceRequirements: '',
    securityStandards: '',

    // Step 7 - User Access & Security
    authentication: {
      sso: false,
      mfa: false,
      rbac: false
    },
    auditLogging: '',
    monitoringRequirements: '',

    // Step 8 - Service Level Requirements
    slaRequirements: {
      uptime: '99.9',
      responseTime: '4hours',
      availability: '24x7'
    },
    supportModel: 'managed',
    trainingNeeds: '',

    // Step 9 - Customization & Development
    customDevelopment: {
      customScripts: false,
      apiIntegration: false,
      microservices: false
    },
    developmentPreferences: '',

    // Step 10 - Scalability & Future Expansion
    growthProjections: '',
    futureExpansion: '',
    futureFeatures: '',

    // Step 11 - Sustainability & ESG
    sustainabilityGoals: '',
    ethicalDataUse: '',

    // Step 12 - Vendor Selection Criteria
    vendorQualifications: '',
    evaluationCriteria: '',

    // Step 13 - Integration & Compatibility
    thirdPartyIntegrations: '',
    internalSystems: '',

    // Step 14 - Timeline & Milestones
    targetDeliveryDate: '',
    projectPhases: '',

    // Step 15 - Budget & Cost Expectations
    budgetRange: '',
    costOptimization: '',

    // Step 16 - Company & Contact Info
    companyOverview: '',
    industry: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    linkedIn: '',
    testimonials: '',

    // Original features for cost calculation
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

  const saveToSupabase = async () => {
    if (!formData.companyName || !formData.contactName || !formData.email) {
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('calculator_submissions_fabric_2025')
        .insert([
          {
            company_name: formData.companyName,
            contact_name: formData.contactName,
            email: formData.email,
            phone: formData.phone,
            industry: formData.industry,
            language: 'en',
            business_goal: formData.businessGoal,
            project_scope: formData.projectScope,
            expected_outcome: formData.expectedOutcome,
            data_types: formData.dataTypes,
            data_sources: formData.dataSources,
            data_volume: formData.dataVolume,
            data_frequency: formData.dataFrequency,
            analytical_capabilities: formData.analyticalCapabilities,
            compute_resources: formData.computeResources,
            geographic: formData.geographic,
            features: formData.features,
            sla_requirements: formData.slaRequirements,
            authentication: formData.authentication,
            calculated_costs: costs,
            custom_development: formData.customDevelopment,
            growth_projections: formData.growthProjections,
            sustainability_goals: formData.sustainabilityGoals,
            vendor_qualifications: formData.vendorQualifications,
            third_party_integrations: formData.thirdPartyIntegrations,
            target_delivery_date: formData.targetDeliveryDate,
            budget_range: formData.budgetRange
          }
        ]);

      if (error) {
        console.error('Error saving to Supabase:', error);
      } else {
        console.log('Successfully saved to Supabase:', data);
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    } finally {
      setSaving(false);
    }
  };

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

    // Advanced feature multipliers
    const analyticsMultiplier = Object.values(formData.analyticalCapabilities).filter(Boolean).length * 0.25 + 1;
    const governanceMultiplier = Object.values(formData.dataGovernance).filter(Boolean).length * 0.2 + 1;
    const securityMultiplier = Object.values(formData.authentication).filter(Boolean).length * 0.15 + 1;
    const customMultiplier = Object.values(formData.customDevelopment).filter(Boolean).length * 0.3 + 1;

    baseCost *= analyticsMultiplier;
    baseCost *= governanceMultiplier;
    baseCost *= securityMultiplier;
    baseCost *= customMultiplier;

    // SLA multipliers
    const slaMultiplier = formData.slaRequirements.uptime === '99.99' ? 1.5 : 
                         formData.slaRequirements.uptime === '99.9' ? 1.2 : 1;
    baseCost *= slaMultiplier;

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

  const handleNestedInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleNextStep = async () => {
    if (currentStep < 17) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 16) {
      const calculatedCosts = calculateCosts();
      await saveToSupabase();
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
        return Object.values(formData.dataTypes).some(Boolean) && Object.values(formData.dataSources).some(Boolean);
      case 3:
        return true; // Step 3 is optional
      case 4:
        return Object.values(formData.analyticalCapabilities).some(Boolean);
      case 5:
        return formData.computeNeeds && Object.values(formData.processingTypes).some(Boolean);
      case 6:
        return formData.environment && formData.complianceRequirements;
      case 7:
        return Object.values(formData.authentication).some(Boolean);
      case 8:
        return formData.slaRequirements.uptime && formData.supportModel;
      case 9:
        return true; // Optional
      case 10:
        return formData.growthProjections;
      case 11:
        return true; // Optional
      case 12:
        return formData.vendorQualifications && formData.evaluationCriteria;
      case 13:
        return true; // Optional
      case 14:
        return formData.targetDeliveryDate;
      case 15:
        return true; // Optional
      case 16:
        return formData.companyName && formData.contactName && formData.email && formData.industry;
      default:
        return true;
    }
  };

  const totalSteps = 17;

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
            🎯 Advanced MVP Specifications Generator
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive requirements capture for enterprise-grade Microsoft Fabric implementations
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

          {/* Step 2: Data Sources & Requirements */}
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
                  Data Sources & Requirements
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

                {/* Additional Details */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specific Data Sources & Integration Details
                  </label>
                  <textarea
                    value={formData.specificSources}
                    onChange={(e) => handleInputChange('specificSources', e.target.value)}
                    placeholder="Describe any specific data sources, connection requirements, or integration challenges..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Data Governance & Quality */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiShield} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Data Governance & Quality
                </h3>
              </div>

              <div className="space-y-8">
                {/* Data Governance Features */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Data Governance Features (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'metadataManagement', icon: FiDatabase, title: 'Metadata Management', desc: 'Data catalog and metadata tracking' },
                      { key: 'dataQuality', icon: FiCheck, title: 'Data Quality', desc: 'Validation, cleansing, and monitoring' },
                      { key: 'dataLineage', icon: FiGitBranch, title: 'Data Lineage', desc: 'Track data flow and transformations' },
                      { key: 'dataCatalog', icon: FiSearch, title: 'Data Catalog', desc: 'Searchable data inventory' }
                    ].map((feature) => (
                      <motion.div
                        key={feature.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.dataGovernance[feature.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('dataGovernance', feature.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={feature.icon}
                            className={`text-xl mt-1 ${
                              formData.dataGovernance[feature.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                          </div>
                          {formData.dataGovernance[feature.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Backup & Recovery Requirements */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Backup & Recovery Requirements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Recovery Time Objective (RTO)
                      </label>
                      <input
                        type="text"
                        value={formData.backupRecovery.rto}
                        onChange={(e) => handleNestedInputChange('backupRecovery', 'rto', e.target.value)}
                        placeholder="e.g., 4 hours, 24 hours"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Recovery Point Objective (RPO)
                      </label>
                      <input
                        type="text"
                        value={formData.backupRecovery.rpo}
                        onChange={(e) => handleNestedInputChange('backupRecovery', 'rpo', e.target.value)}
                        placeholder="e.g., 1 hour, 15 minutes"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Backup Frequency
                      </label>
                      <select
                        value={formData.backupRecovery.backupFrequency}
                        onChange={(e) => handleNestedInputChange('backupRecovery', 'backupFrequency', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      >
                        <option value="realtime">Real-time</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Retention Policy
                      </label>
                      <input
                        type="text"
                        value={formData.backupRecovery.retentionPolicy}
                        onChange={(e) => handleNestedInputChange('backupRecovery', 'retentionPolicy', e.target.value)}
                        placeholder="e.g., 7 years, 90 days"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Advanced Analytics Requirements */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiBrain} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Advanced Analytics Requirements
                </h3>
              </div>

              <div className="space-y-8">
                {/* Analytics Capabilities */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Required Analytics Capabilities * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'predictiveAnalytics', icon: FiTrendingUp, title: 'Predictive Analytics', desc: 'Forecasting and trend analysis' },
                      { key: 'machineLearning', icon: FiBrain, title: 'Machine Learning', desc: 'Custom models and AutoML' },
                      { key: 'realTimeVisualization', icon: FiActivity, title: 'Real-time Visualization', desc: 'Live dashboards and streaming' },
                      { key: 'nlpProcessing', icon: FiFileText, title: 'Natural Language Processing', desc: 'Text analysis and sentiment' },
                      { key: 'anomalyDetection', icon: FiAlertTriangle, title: 'Anomaly Detection', desc: 'Outlier and fraud detection' },
                      { key: 'imageProcessing', icon: FiEye, title: 'Image Processing', desc: 'Computer vision and AI' }
                    ].map((capability) => (
                      <motion.div
                        key={capability.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.analyticalCapabilities[capability.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('analyticalCapabilities', capability.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={capability.icon}
                            className={`text-xl mt-1 ${
                              formData.analyticalCapabilities[capability.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{capability.title}</h4>
                            <p className="text-sm text-gray-600">{capability.desc}</p>
                          </div>
                          {formData.analyticalCapabilities[capability.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Analytical Outputs & Deliverables
                    </label>
                    <textarea
                      value={formData.analyticalOutputs}
                      onChange={(e) => handleInputChange('analyticalOutputs', e.target.value)}
                      placeholder="Describe expected outputs: reports, dashboards, alerts, APIs..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reporting Requirements
                    </label>
                    <textarea
                      value={formData.reportingRequirements}
                      onChange={(e) => handleInputChange('reportingRequirements', e.target.value)}
                      placeholder="Specify reporting needs: frequency, format, audience..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Compute & Processing Requirements */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiCpu} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Compute & Processing Requirements
                </h3>
              </div>

              <div className="space-y-8">
                {/* Compute Needs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Compute Needs & Performance Requirements *
                  </label>
                  <textarea
                    value={formData.computeNeeds}
                    onChange={(e) => handleInputChange('computeNeeds', e.target.value)}
                    placeholder="Describe processing power, memory, storage requirements, expected workload patterns, concurrent users..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-32 resize-none"
                    required
                  />
                </div>

                {/* Scalability Expectations */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Scalability Expectations
                  </label>
                  <textarea
                    value={formData.scalabilityExpectations}
                    onChange={(e) => handleInputChange('scalabilityExpectations', e.target.value)}
                    placeholder="Expected growth in data volume, users, processing needs over 1-3 years..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>

                {/* Processing Types */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Processing Types Required * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'batch', icon: FiClock, title: 'Batch Processing', desc: 'Scheduled data processing' },
                      { key: 'realTime', icon: FiActivity, title: 'Real-time Processing', desc: 'Stream processing and events' },
                      { key: 'aiMl', icon: FiBrain, title: 'AI/ML Processing', desc: 'Model training and inference' }
                    ].map((type) => (
                      <motion.div
                        key={type.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.processingTypes[type.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('processingTypes', type.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={type.icon}
                            className={`text-xl mt-1 ${
                              formData.processingTypes[type.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
                            <p className="text-sm text-gray-600">{type.desc}</p>
                          </div>
                          {formData.processingTypes[type.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Infrastructure & Environment */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiServer} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Infrastructure & Environment
                </h3>
              </div>

              <div className="space-y-8">
                {/* Environment Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Deployment Environment *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'cloud', icon: FiCloud, title: 'Cloud', desc: 'Azure cloud deployment' },
                      { key: 'hybrid', icon: FiSliders, title: 'Hybrid', desc: 'Cloud and on-premises' },
                      { key: 'onPremise', icon: FiHome, title: 'On-Premise', desc: 'Local data center' }
                    ].map((env) => (
                      <motion.div
                        key={env.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.environment === env.key
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('environment', env.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={env.icon}
                            className={`text-xl mt-1 ${
                              formData.environment === env.key ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{env.title}</h4>
                            <p className="text-sm text-gray-600">{env.desc}</p>
                          </div>
                          {formData.environment === env.key && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Geographical Regions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Geographical Regions
                  </label>
                  <textarea
                    value={formData.geographicalRegions}
                    onChange={(e) => handleInputChange('geographicalRegions', e.target.value)}
                    placeholder="Specify regions where data and users are located (e.g., North America, Europe, Asia-Pacific)..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>

                {/* Compliance Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Compliance Requirements *
                  </label>
                  <textarea
                    value={formData.complianceRequirements}
                    onChange={(e) => handleInputChange('complianceRequirements', e.target.value)}
                    placeholder="GDPR, HIPAA, SOX, PCI-DSS, industry-specific regulations..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                    required
                  />
                </div>

                {/* Security Standards */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Security Standards
                  </label>
                  <textarea
                    value={formData.securityStandards}
                    onChange={(e) => handleInputChange('securityStandards', e.target.value)}
                    placeholder="ISO 27001, SOC 2, FedRAMP, custom security requirements..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 7: User Access & Security */}
          {currentStep === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiLock} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  User Access & Security
                </h3>
              </div>

              <div className="space-y-8">
                {/* Authentication Methods */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Authentication Methods * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'sso', icon: FiKey, title: 'Single Sign-On (SSO)', desc: 'Azure AD integration' },
                      { key: 'mfa', icon: FiLock, title: 'Multi-Factor Authentication', desc: 'Additional security layer' },
                      { key: 'rbac', icon: FiUsers, title: 'Role-Based Access Control', desc: 'Granular permissions' }
                    ].map((auth) => (
                      <motion.div
                        key={auth.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.authentication[auth.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('authentication', auth.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={auth.icon}
                            className={`text-xl mt-1 ${
                              formData.authentication[auth.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{auth.title}</h4>
                            <p className="text-sm text-gray-600">{auth.desc}</p>
                          </div>
                          {formData.authentication[auth.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Audit Logging */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Audit Logging Requirements
                  </label>
                  <textarea
                    value={formData.auditLogging}
                    onChange={(e) => handleInputChange('auditLogging', e.target.value)}
                    placeholder="Specify what user actions and system events need to be logged..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>

                {/* Monitoring Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monitoring Requirements
                  </label>
                  <textarea
                    value={formData.monitoringRequirements}
                    onChange={(e) => handleInputChange('monitoringRequirements', e.target.value)}
                    placeholder="Performance monitoring, alerting, compliance tracking..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 8: Service Level Requirements */}
          {currentStep === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiMonitor} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Service Level Requirements
                </h3>
              </div>

              <div className="space-y-8">
                {/* SLA Requirements */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    SLA Requirements *
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Uptime Requirement *
                      </label>
                      <select
                        value={formData.slaRequirements.uptime}
                        onChange={(e) => handleNestedInputChange('slaRequirements', 'uptime', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                        required
                      >
                        <option value="99.9">99.9%</option>
                        <option value="99.95">99.95%</option>
                        <option value="99.99">99.99%</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Response Time
                      </label>
                      <input
                        type="text"
                        value={formData.slaRequirements.responseTime}
                        onChange={(e) => handleNestedInputChange('slaRequirements', 'responseTime', e.target.value)}
                        placeholder="e.g., 2 seconds, 500ms"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Availability
                      </label>
                      <select
                        value={formData.slaRequirements.availability}
                        onChange={(e) => handleNestedInputChange('slaRequirements', 'availability', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      >
                        <option value="24x7">24x7</option>
                        <option value="business-hours">Business Hours</option>
                        <option value="extended">Extended Hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Support Model */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Support Model *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'managed', title: 'Fully Managed', desc: 'Complete management by provider' },
                      { key: 'self-service', title: 'Self-Service', desc: 'Self-managed with documentation' },
                      { key: 'hybrid', title: 'Hybrid Support', desc: 'Combination of managed and self-service' }
                    ].map((model) => (
                      <motion.div
                        key={model.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.supportModel === model.key
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('supportModel', model.key)}
                      >
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-900 mb-1">{model.title}</h4>
                          <p className="text-sm text-gray-600">{model.desc}</p>
                          {formData.supportModel === model.key && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg mt-2 mx-auto" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Training Needs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Training Needs
                  </label>
                  <textarea
                    value={formData.trainingNeeds}
                    onChange={(e) => handleInputChange('trainingNeeds', e.target.value)}
                    placeholder="User training, admin training, technical documentation..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 9: Customization & Development */}
          {currentStep === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiCode} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Customization & Development
                </h3>
              </div>

              <div className="space-y-8">
                {/* Custom Development Needs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Custom Development Needs (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'customScripts', icon: FiCode, title: 'Custom Scripts', desc: 'Data transformation and automation' },
                      { key: 'apiIntegration', icon: FiLink, title: 'API Integration', desc: 'Custom connectors and APIs' },
                      { key: 'microservices', icon: FiLayers, title: 'Microservices', desc: 'Custom components and services' }
                    ].map((dev) => (
                      <motion.div
                        key={dev.key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.customDevelopment[dev.key]
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFeatureToggle('customDevelopment', dev.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon
                            icon={dev.icon}
                            className={`text-xl mt-1 ${
                              formData.customDevelopment[dev.key] ? 'text-fabric-blue' : 'text-gray-400'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{dev.title}</h4>
                            <p className="text-sm text-gray-600">{dev.desc}</p>
                          </div>
                          {formData.customDevelopment[dev.key] && (
                            <SafeIcon icon={FiCheck} className="text-fabric-blue text-lg" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Development Preferences */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Development Preferences & Special Requirements
                  </label>
                  <textarea
                    value={formData.developmentPreferences}
                    onChange={(e) => handleInputChange('developmentPreferences', e.target.value)}
                    placeholder="Programming languages, frameworks, methodology preferences..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 10: Scalability & Future Expansion */}
          {currentStep === 10 && (
            <motion.div
              key="step10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiTrendingUp} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Scalability & Future Expansion
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Growth Projections & Scalability Requirements *
                  </label>
                  <textarea
                    value={formData.growthProjections}
                    onChange={(e) => handleInputChange('growthProjections', e.target.value)}
                    placeholder="Expected growth in users, data volume, processing needs over 1-3 years..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-32 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Future Expansion Plans
                  </label>
                  <textarea
                    value={formData.futureExpansion}
                    onChange={(e) => handleInputChange('futureExpansion', e.target.value)}
                    placeholder="Additional regions, business units, use cases to be added..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Future Feature Requirements
                  </label>
                  <textarea
                    value={formData.futureFeatures}
                    onChange={(e) => handleInputChange('futureFeatures', e.target.value)}
                    placeholder="Planned features, integrations, or capabilities for future phases..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 11: Sustainability & ESG */}
          {currentStep === 11 && (
            <motion.div
              key="step11"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiHeart} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Sustainability & ESG
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sustainability Goals & Environmental Impact
                  </label>
                  <textarea
                    value={formData.sustainabilityGoals}
                    onChange={(e) => handleInputChange('sustainabilityGoals', e.target.value)}
                    placeholder="Carbon footprint reduction, green computing, energy efficiency targets..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ethical Data Use & Governance
                  </label>
                  <textarea
                    value={formData.ethicalDataUse}
                    onChange={(e) => handleInputChange('ethicalDataUse', e.target.value)}
                    placeholder="Data privacy, ethical AI, responsible data handling practices..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 12: Vendor Selection Criteria */}
          {currentStep === 12 && (
            <motion.div
              key="step12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiAward} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Vendor Selection Criteria
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Required Vendor Qualifications *
                  </label>
                  <textarea
                    value={formData.vendorQualifications}
                    onChange={(e) => handleInputChange('vendorQualifications', e.target.value)}
                    placeholder="Microsoft certifications, industry experience, team size, geographic location..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-32 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Evaluation Criteria & Selection Process *
                  </label>
                  <textarea
                    value={formData.evaluationCriteria}
                    onChange={(e) => handleInputChange('evaluationCriteria', e.target.value)}
                    placeholder="Technical capability, cost, timeline, support quality, references..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                    required
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 13: Integration & Compatibility */}
          {currentStep === 13 && (
            <motion.div
              key="step13"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiLink} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Integration & Compatibility
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Third-Party Integrations
                  </label>
                  <textarea
                    value={formData.thirdPartyIntegrations}
                    onChange={(e) => handleInputChange('thirdPartyIntegrations', e.target.value)}
                    placeholder="External APIs, SaaS platforms, legacy systems to integrate..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Internal Systems & Legacy Compatibility
                  </label>
                  <textarea
                    value={formData.internalSystems}
                    onChange={(e) => handleInputChange('internalSystems', e.target.value)}
                    placeholder="Existing databases, applications, infrastructure to maintain compatibility..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 14: Timeline & Milestones */}
          {currentStep === 14 && (
            <motion.div
              key="step14"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiCalendar} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Timeline & Milestones
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Delivery Date *
                  </label>
                  <input
                    type="date"
                    value={formData.targetDeliveryDate}
                    onChange={(e) => handleInputChange('targetDeliveryDate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Phases & Key Milestones
                  </label>
                  <textarea
                    value={formData.projectPhases}
                    onChange={(e) => handleInputChange('projectPhases', e.target.value)}
                    placeholder="Break down project into phases with key milestones and deliverables..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-32 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 15: Budget & Cost Expectations */}
          {currentStep === 15 && (
            <motion.div
              key="step15"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiDollarSign} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Budget & Cost Expectations
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="under-50k">Under $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-250k">$100,000 - $250,000</option>
                    <option value="250k-500k">$250,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="over-1m">Over $1,000,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cost Optimization Preferences
                  </label>
                  <textarea
                    value={formData.costOptimization}
                    onChange={(e) => handleInputChange('costOptimization', e.target.value)}
                    placeholder="Areas where cost savings are prioritized, budget constraints, payment preferences..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 16: Company & Contact Information */}
          {currentStep === 16 && (
            <motion.div
              key="step16"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiUsers} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Company & Contact Information
                </h3>
              </div>

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

              {/* Microsoft Fabric Components */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Microsoft Fabric Components
                </h4>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
            </motion.div>
          )}

          {/* Step 17: Results */}
          {currentStep === 17 && costs && (
            <motion.div
              key="step17"
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
                  Enterprise-Ready Specifications Complete!
                </h3>
                <p className="text-gray-600">
                  Comprehensive Microsoft Fabric MVP requirements & investment analysis ready
                </p>
              </div>

              {/* Enhanced Cost Breakdown */}
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
                  ≈ ${costs.monthly.toLocaleString()}/month | Enterprise-grade solution
                </p>
                {saving && (
                  <div className="flex items-center justify-center mt-4 text-sm">
                    <SafeIcon icon={FiRefreshCw} className="animate-spin mr-2" />
                    <span>Saving...</span>
                  </div>
                )}
              </div>

              {/* Professional Documentation Generator */}
              <PitchDeckGenerator formData={formData} costs={costs} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Navigation */}
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
                <span>{currentStep === totalSteps ? 'Generate Specs' : 'Next'}</span>
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