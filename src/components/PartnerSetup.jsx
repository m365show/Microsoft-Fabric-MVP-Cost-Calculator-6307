import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { FiUser, FiBriefcase, FiGlobe, FiDollarSign, FiCheck, FiUpload, FiStar, FiAward, FiAlertTriangle } = FiIcons;

const PartnerSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    company: '',
    email: '',
    linkedin: '',
    website: '',
    partnerType: '',

    // Step 2: Profile Details
    bio: '',
    region: '',
    industry: '',
    logoUrl: '',
    bannerUrl: '',

    // Step 3: Services & Expertise
    services: [],
    keywords: [],
    languages: ['English'], // Default to English
    availability: '',
    pricingModel: '',

    // Step 4: Portfolio
    caseStudies: '',
    portfolioLinks: '',

    // No more plan selection - all partners are now free/basic tier
    planType: 'basic'
  });

  const totalSteps = 4; // Reduced from 5 steps

  const partnerTypes = [
    'Freelancer',
    'Consultant',
    'Solution Provider',
    'Microsoft Gold Partner',
    'Microsoft Silver Partner',
    'System Integrator',
    'Digital Agency'
  ];

  const serviceOptions = [
    'Lakehouse & Data Warehouse',
    'Real-Time Analytics',
    'AI & Machine Learning',
    'Power BI & Visualization',
    'Security & Compliance',
    'Custom Development',
    'Data Migration',
    'Training & Support',
    'Architecture Design',
    'Performance Optimization'
  ];

  const languageOptions = [
    'English',
    'Deutsch',
    'Français',
    'Español',
    'Italiano',
    'Português',
    'Nederlands',
    'Polski',
    'Русский',
    '中文',
    '日本語',
    '한국어',
    'العربية',
    'हिंदी',
    'Svenska'
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
    'Media & Entertainment'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear any previous errors when user starts typing
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateUniqueSlug = (name, company) => {
    const baseName = name.toLowerCase().replace(/\s+/g, '-');
    const companyPart = company ? company.toLowerCase().replace(/\s+/g, '-') : '';
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);

    if (companyPart) {
      return `${baseName}-${companyPart}-${randomSuffix}`;
    }
    return `${baseName}-${timestamp}-${randomSuffix}`;
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.name.trim()) {
      return 'Name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!formData.email.includes('@')) {
      return 'Please enter a valid email address';
    }
    if (!formData.partnerType) {
      return 'Partner type is required';
    }
    if (!formData.bio.trim()) {
      return 'Professional bio is required';
    }
    if (!formData.region) {
      return 'Region is required';
    }
    if (!formData.industry) {
      return 'Industry is required';
    }
    if (formData.services.length === 0) {
      return 'At least one service must be selected';
    }
    if (formData.keywords.length < 3) {
      return 'At least 3 keywords/specializations are required';
    }

    return null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Validate form
      const validationError = validateForm();
      if (validationError) {
        setSubmitError(validationError);
        setIsSubmitting(false);
        return;
      }

      // Generate unique slug
      const slug = generateUniqueSlug(formData.name, formData.company);

      // Prepare data for Supabase - ALL PARTNERS ARE NOW FREE/BASIC
      const partnerData = {
        name: formData.name.trim(),
        company: formData.company.trim() || null,
        email: formData.email.trim().toLowerCase(),
        linkedin: formData.linkedin.trim() || null,
        website: formData.website.trim() || null,
        partner_type: formData.partnerType,
        bio: formData.bio.trim(),
        region: formData.region,
        industry: formData.industry,
        logo_url: formData.logoUrl.trim() || null,
        banner_url: formData.bannerUrl.trim() || null,
        services: formData.services,
        keywords: formData.keywords,
        languages: formData.languages,
        availability: formData.availability || null,
        pricing_model: formData.pricingModel || null,
        case_studies: formData.caseStudies.trim() || null,
        portfolio_links: formData.portfolioLinks.trim() || null,
        premium_tier: 0, // All partners are now basic/free
        premium_price: 0, // No premium pricing
        slug: slug,
        approved: false, // Requires admin approval
        contact_email: formData.email.trim().toLowerCase(),
        created_at: new Date().toISOString()
      };

      console.log('Submitting partner data:', partnerData);

      // Insert the partner data
      const { data, error } = await supabase
        .from('partners_fabric_2025')
        .insert([partnerData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        // Handle specific error types
        if (error.code === '23505') {
          setSubmitError('A partner with this email already exists. Please use a different email address.');
        } else if (error.code === '42P01') {
          setSubmitError('Partner directory is not yet set up. Please contact support.');
        } else if (error.code === '42501') {
          setSubmitError('Database permissions error. Please contact support.');
        } else {
          setSubmitError(`Error creating profile: ${error.message}. Please try again or contact support.`);
        }
        setIsSubmitting(false);
        return;
      }

      console.log('Successfully created partner profile:', data);
      setSubmitSuccess(true);

      // Show success message
      setTimeout(() => {
        // Redirect to partners page
        window.location.href = '/partners';
      }, 3000);

    } catch (error) {
      console.error('Unexpected error:', error);
      setSubmitError('An unexpected error occurred. Please check your internet connection and try again.');
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.partnerType;
      case 2:
        return formData.bio && formData.region && formData.industry;
      case 3:
        return formData.services.length > 0 && formData.keywords.length >= 3;
      case 4:
        return true; // Portfolio is optional
      default:
        return true;
    }
  };

  // Success screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white rounded-2xl p-12 shadow-lg"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiCheck} className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for applying to become a Microsoft Fabric partner. We'll review your application and approve your profile within 24 hours.
            </p>
            <div className="space-y-4 text-left bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-gray-900">What happens next:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Profile review within 24 hours</li>
                <li>✓ Email confirmation once approved</li>
                <li>✓ Profile goes live in the directory</li>
                <li>✓ Start receiving qualified leads!</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/partners'}
              className="px-8 py-3 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Partner Directory
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            💼 Become a Microsoft Fabric Partner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our directory and connect with businesses looking for Microsoft Fabric expertise. Get matched with qualified leads and grow your consulting business - completely free!
          </p>
        </motion.div>

        {/* Error Display */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiAlertTriangle} className="text-red-600" />
              <span className="text-sm text-red-700">{submitError}</span>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold ${
                  step <= currentStep
                    ? 'bg-fabric-blue border-fabric-blue text-white'
                    : 'border-gray-300 text-gray-400'
                } transition-all duration-300`}
              >
                {step < currentStep ? (
                  <SafeIcon icon={FiCheck} className="text-sm" />
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

        {/* Form Steps */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiUser} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    placeholder="Your company name"
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
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Partner Type *
                  </label>
                  <select
                    value={formData.partnerType}
                    onChange={(e) => handleInputChange('partnerType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    required
                  >
                    <option value="">Select Partner Type</option>
                    {partnerTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Profile Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiBriefcase} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">Profile Details</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Professional Bio *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-32 resize-none"
                    placeholder="Describe your expertise, experience, and what makes you unique..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Region *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      required
                    >
                      <option value="">Select Region</option>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                      <option value="Latin America">Latin America</option>
                      <option value="Middle East & Africa">Middle East & Africa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Primary Industry *
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={formData.logoUrl}
                      onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended: 200x200px square image
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Banner URL
                    </label>
                    <input
                      type="url"
                      value={formData.bannerUrl}
                      onChange={(e) => handleInputChange('bannerUrl', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      placeholder="https://example.com/banner.png"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended: 1200x400px banner image
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Services & Expertise */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiGlobe} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">Services & Expertise</h3>
              </div>

              <div className="space-y-8">
                {/* Services */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Services Offered * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleArrayToggle('services', service)}
                          className="rounded border-gray-300 text-fabric-blue focus:ring-fabric-blue"
                        />
                        <span className="text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Keywords/Specializations * (Add at least 3)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter keywords separated by commas (e.g., Power BI, Data Warehouse, Real-time Analytics)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          const keyword = e.target.value.trim().replace(',', '');
                          if (keyword && !formData.keywords.includes(keyword)) {
                            handleArrayToggle('keywords', keyword);
                            e.target.value = '';
                          }
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-fabric-blue text-white px-3 py-1 rounded-full text-sm flex items-center cursor-pointer"
                          onClick={() => handleArrayToggle('keywords', keyword)}
                        >
                          {keyword}
                          <span className="ml-2 text-xs">×</span>
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Current keywords: {formData.keywords.length} (minimum 3 required)
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Languages (Select all you support)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {languageOptions.map((language) => (
                      <label key={language} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(language)}
                          onChange={() => handleArrayToggle('languages', language)}
                          className="rounded border-gray-300 text-fabric-blue focus:ring-fabric-blue"
                        />
                        <span className="text-gray-700">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="">Select Availability</option>
                      <option value="ASAP">Available Now</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="Q2 2025">Q2 2025</option>
                      <option value="Q3 2025">Q3 2025</option>
                      <option value="Q4 2025">Q4 2025</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pricing Model
                    </label>
                    <select
                      value={formData.pricingModel}
                      onChange={(e) => handleInputChange('pricingModel', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="">Select Pricing Model</option>
                      <option value="Hourly Rate">Hourly Rate</option>
                      <option value="Fixed Project">Fixed Project</option>
                      <option value="Monthly Retainer">Monthly Retainer</option>
                      <option value="Custom Quote">Custom Quote</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Portfolio */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <SafeIcon icon={FiUpload} className="text-fabric-blue text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">Portfolio & Case Studies</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Case Studies & Project Descriptions
                  </label>
                  <textarea
                    value={formData.caseStudies}
                    onChange={(e) => handleInputChange('caseStudies', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-48 resize-none"
                    placeholder="Describe your notable projects, case studies, and success stories. Include specific outcomes and technologies used..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Portfolio Links
                  </label>
                  <textarea
                    value={formData.portfolioLinks}
                    onChange={(e) => handleInputChange('portfolioLinks', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                    placeholder="Add links to your portfolio, case studies, or project examples (one per line)..."
                  />
                </div>

                {/* Free Partner Information */}
                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <SafeIcon icon={FiCheck} className="text-green-600 text-2xl" />
                    <h4 className="text-xl font-bold text-gray-900">Free Partner Benefits</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500" />
                      <span>Public profile page</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500" />
                      <span>Logo and company information</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500" />
                      <span>Unlimited services listing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500" />
                      <span>Multi-language support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500" />
                      <span>Portfolio and case studies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500" />
                      <span>Lead generation opportunities</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">What happens next?</h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                    <li>Your profile will be submitted for review</li>
                    <li>We'll approve your profile within 24 hours</li>
                    <li>Your profile goes live in the directory</li>
                    <li>Start receiving qualified leads!</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Previous
            </button>

            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>

            {currentStep === totalSteps ? (
              <motion.button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                whileHover={{ scale: isStepValid() && !isSubmitting ? 1.05 : 1 }}
                whileTap={{ scale: isStepValid() && !isSubmitting ? 0.95 : 1 }}
                className="px-8 py-3 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNextStep}
                disabled={!isStepValid()}
                whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
                whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                className="px-6 py-3 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next Step
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSetup;