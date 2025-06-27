import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const {
  FiSearch, FiFilter, FiStar, FiCheck, FiGlobe, FiMapPin, FiUsers,
  FiBriefcase, FiAward, FiTrendingUp, FiMail, FiExternalLink, FiChevronRight
} = FiIcons;

const PartnerDirectory = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    services: [],
    industry: '',
    region: '',
    language: '',
    partnerType: '',
    minMatchScore: 0
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Predefined filter options
  const serviceOptions = [
    'Lakehouse & Data Warehouse',
    'Real-Time Analytics',
    'AI & Machine Learning',
    'Power BI & Visualization',
    'Security & Compliance',
    'Custom Development',
    'Data Migration',
    'Training & Support'
  ];

  const industryOptions = [
    'Finance & Banking',
    'Healthcare',
    'Retail & E-commerce',
    'Manufacturing',
    'Technology',
    'Education',
    'Government',
    'Energy & Utilities'
  ];

  const partnerTypeOptions = [
    'Freelancer',
    'Consultant',
    'Solution Provider',
    'Microsoft Gold Partner',
    'Microsoft Silver Partner'
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
    '한국어'
  ];

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [partners, filters, searchQuery]);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners_fabric_2025')
        .select('*')
        .eq('approved', true)
        .order('premium_tier', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partners:', error);
      } else {
        setPartners(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = partners.filter(partner => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchables = [
          partner.name,
          partner.company,
          partner.bio,
          partner.keywords?.join(' '),
          partner.services?.join(' ')
        ].filter(Boolean).join(' ').toLowerCase();
        
        if (!searchables.includes(query)) return false;
      }

      // Service filter
      if (filters.services.length > 0) {
        const partnerServices = partner.services || [];
        if (!filters.services.some(service => partnerServices.includes(service))) {
          return false;
        }
      }

      // Industry filter
      if (filters.industry && partner.industry !== filters.industry) {
        return false;
      }

      // Region filter
      if (filters.region && partner.region !== filters.region) {
        return false;
      }

      // Language filter
      if (filters.language) {
        const partnerLanguages = partner.languages || [];
        if (!partnerLanguages.includes(filters.language)) {
          return false;
        }
      }

      // Partner type filter
      if (filters.partnerType && partner.partner_type !== filters.partnerType) {
        return false;
      }

      // Match score filter (calculated based on user preferences)
      const matchScore = calculateMatchScore(partner);
      if (matchScore < filters.minMatchScore) {
        return false;
      }

      return true;
    });

    // Sort by premium tier and match score
    filtered.sort((a, b) => {
      if (a.premium_tier !== b.premium_tier) {
        return b.premium_tier - a.premium_tier; // Premium first
      }
      return calculateMatchScore(b) - calculateMatchScore(a);
    });

    setFilteredPartners(filtered);
  };

  const calculateMatchScore = (partner) => {
    let score = 50; // Base score

    // Service matching (stored in localStorage from calculator)
    const userPreferences = JSON.parse(localStorage.getItem('calculatorPreferences') || '{}');
    
    if (userPreferences.features && partner.services) {
      const matchingServices = Object.keys(userPreferences.features)
        .filter(feature => userPreferences.features[feature])
        .filter(feature => partner.services.includes(feature));
      score += matchingServices.length * 10;
    }

    // Industry matching
    if (userPreferences.industry && partner.industry === userPreferences.industry) {
      score += 20;
    }

    // Language matching
    if (userPreferences.language && partner.languages?.includes(userPreferences.language)) {
      score += 15;
    }

    // Premium boost
    if (partner.premium_tier > 0) {
      score += 10;
    }

    return Math.min(score, 100);
  };

  const handleServiceFilter = (service) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const PartnerCard = ({ partner }) => {
    const matchScore = calculateMatchScore(partner);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
          partner.premium_tier > 0
            ? 'border-gradient-to-r from-fabric-blue to-fabric-purple bg-gradient-to-r from-blue-50 to-purple-50'
            : 'border-gray-200'
        }`}
      >
        {/* Premium Badge */}
        {partner.premium_tier > 0 && (
          <div className="flex justify-between items-start mb-4">
            <div className="bg-gradient-to-r from-fabric-blue to-fabric-purple text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <SafeIcon icon={FiAward} className="mr-1" />
              Verified + Featured
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Match Score</div>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                {matchScore}%
              </div>
            </div>
          </div>
        )}

        {/* Partner Header */}
        <div className="flex items-start space-x-4 mb-4">
          {partner.logo_url ? (
            <img
              src={partner.logo_url}
              alt={`${partner.name} logo`}
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {partner.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
            {partner.company && (
              <p className="text-gray-600 font-medium">{partner.company}</p>
            )}
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <SafeIcon icon={FiBriefcase} className="mr-1" />
                {partner.partner_type}
              </div>
              {partner.region && (
                <div className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="mr-1" />
                  {partner.region}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 mb-4 line-clamp-3">{partner.bio}</p>

        {/* Services */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {partner.services?.slice(0, 4).map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium"
              >
                {service}
              </span>
            ))}
            {partner.services?.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                +{partner.services.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Languages */}
        {partner.languages && partner.languages.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <SafeIcon icon={FiGlobe} className="mr-1" />
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {partner.languages.slice(0, 3).map((language, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                >
                  {language}
                </span>
              ))}
              {partner.languages.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                  +{partner.languages.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        {partner.availability && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">
              <SafeIcon icon={FiCheck} className="mr-1" />
              Available: {partner.availability}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            onClick={() => window.open(`/partner/${partner.slug}`, '_blank')}
          >
            View Profile
            <SafeIcon icon={FiChevronRight} className="ml-1" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border-2 border-fabric-blue text-fabric-blue rounded-lg font-semibold hover:bg-fabric-blue hover:text-white transition-all duration-300 flex items-center"
            onClick={() => handleAddToPitch(partner)}
          >
            <SafeIcon icon={FiMail} className="mr-1" />
            Add to Pitch
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const handleAddToPitch = (partner) => {
    // Add partner to pitch routing list
    const selectedPartners = JSON.parse(localStorage.getItem('selectedPartners') || '[]');
    if (!selectedPartners.find(p => p.id === partner.id)) {
      selectedPartners.push({
        id: partner.id,
        name: partner.name,
        email: partner.contact_email,
        company: partner.company
      });
      localStorage.setItem('selectedPartners', JSON.stringify(selectedPartners));
      // Show success feedback
      alert(`${partner.name} added to your pitch deck routing!`);
    } else {
      alert(`${partner.name} is already in your pitch deck routing.`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fabric-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🧩 Microsoft Fabric Partner Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified implementation partners, freelancers, and consultants specialized in Microsoft Fabric MVP development
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <SafeIcon icon={FiUsers} className="text-fabric-blue" />
              <span>{partners.length} Partners Available</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <SafeIcon icon={FiGlobe} className="text-fabric-blue" />
              <span>15 Languages Supported</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <SafeIcon icon={FiAward} className="text-fabric-blue" />
              <span>Verified Partners Available</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search partners by name, company, services, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Services Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Services
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service)}
                      onChange={() => handleServiceFilter(service)}
                      className="rounded border-gray-300 text-fabric-blue focus:ring-fabric-blue"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={filters.industry}
                onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
              >
                <option value="">All Industries</option>
                {industryOptions.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Partner Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Partner Type
              </label>
              <select
                value={filters.partnerType}
                onChange={(e) => setFilters(prev => ({ ...prev, partnerType: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
              >
                <option value="">All Types</option>
                {partnerTypeOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
              >
                <option value="">All Languages</option>
                {languageOptions.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Region
              </label>
              <select
                value={filters.region}
                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
              >
                <option value="">All Regions</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia Pacific">Asia Pacific</option>
                <option value="Latin America">Latin America</option>
                <option value="Middle East & Africa">Middle East & Africa</option>
              </select>
            </div>

            {/* Match Score Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Match Score: {filters.minMatchScore}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minMatchScore}
                onChange={(e) => setFilters(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0078d4 0%, #0078d4 ${filters.minMatchScore}%, #e5e7eb ${filters.minMatchScore}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredPartners.length} of {partners.length} partners
            </p>
            <button
              onClick={() => {
                setFilters({
                  services: [],
                  industry: '',
                  region: '',
                  language: '',
                  partnerType: '',
                  minMatchScore: 0
                });
                setSearchQuery('');
              }}
              className="text-fabric-blue hover:text-fabric-dark transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </motion.div>

        {/* Partner Grid */}
        {filteredPartners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiSearch} className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No partners found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or search terms to find more partners
            </p>
            <button
              onClick={() => {
                setFilters({
                  services: [],
                  industry: '',
                  region: '',
                  language: '',
                  partnerType: '',
                  minMatchScore: 0
                });
                setSearchQuery('');
              }}
              className="bg-fabric-blue text-white px-6 py-3 rounded-lg hover:bg-fabric-dark transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center bg-gradient-to-r from-fabric-blue/10 to-fabric-purple/10 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to become a partner?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our directory and connect with businesses looking for Microsoft Fabric expertise
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/partner-setup', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Become a Partner
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/contact', '_blank')}
              className="px-8 py-4 border-2 border-fabric-blue text-fabric-blue font-semibold rounded-xl hover:bg-fabric-blue hover:text-white transition-all duration-300"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerDirectory;