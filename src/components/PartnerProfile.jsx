import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { FiMail, FiGlobe, FiMapPin, FiBriefcase, FiAward, FiExternalLink, FiCalendar, FiDollarSign, FiUsers, FiStar, FiCheck, FiArrowLeft } = FiIcons;

const PartnerProfile = () => {
  const { slug } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectBudget: '',
    timeline: ''
  });
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    fetchPartner();
  }, [slug]);

  const fetchPartner = async () => {
    try {
      const { data, error } = await supabase
        .from('partners_fabric_2025')
        .select('*')
        .eq('slug', slug)
        .eq('approved', true)
        .single();

      if (error) {
        console.error('Error fetching partner:', error);
      } else {
        setPartner(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('partner_inquiries_2025')
        .insert([{
          partner_id: partner.id,
          inquirer_name: contactForm.name,
          inquirer_email: contactForm.email,
          inquirer_company: contactForm.company,
          message: contactForm.message,
          project_budget: contactForm.projectBudget,
          timeline: contactForm.timeline,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Error submitting inquiry:', error);
        alert('Error submitting inquiry. Please try again.');
      } else {
        alert('Your inquiry has been sent successfully!');
        setContactForm({
          name: '',
          email: '',
          company: '',
          message: '',
          projectBudget: '',
          timeline: ''
        });
        setShowContactForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting inquiry. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fabric-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading partner profile...</p>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The partner profile you're looking for doesn't exist.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-fabric-blue text-white px-6 py-3 rounded-lg hover:bg-fabric-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-fabric-blue hover:text-fabric-dark transition-colors mb-8"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Directory</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            >
              {/* Premium Badge */}
              {partner.premium_tier > 0 && (
                <div className="flex justify-end mb-4">
                  <div className="bg-gradient-to-r from-fabric-blue to-fabric-purple text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <SafeIcon icon={FiAward} className="mr-2" />
                    Verified + Featured Partner
                  </div>
                </div>
              )}

              {/* Partner Info */}
              <div className="flex items-start space-x-6">
                {partner.logo_url ? (
                  <img 
                    src={partner.logo_url} 
                    alt={`${partner.name} logo`}
                    className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-xl flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{partner.name}</h1>
                  {partner.company && (
                    <p className="text-xl text-gray-600 font-medium mb-3">{partner.company}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <SafeIcon icon={FiBriefcase} className="mr-2 text-fabric-blue" />
                      {partner.partner_type}
                    </div>
                    {partner.region && (
                      <div className="flex items-center">
                        <SafeIcon icon={FiMapPin} className="mr-2 text-fabric-blue" />
                        {partner.region}
                      </div>
                    )}
                    {partner.availability && (
                      <div className="flex items-center">
                        <SafeIcon icon={FiCalendar} className="mr-2 text-fabric-blue" />
                        Available: {partner.availability}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4 mt-4">
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-fabric-blue hover:text-fabric-dark transition-colors"
                      >
                        <SafeIcon icon={FiGlobe} />
                        <span>Website</span>
                      </a>
                    )}
                    {partner.linkedin && (
                      <a
                        href={partner.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-fabric-blue hover:text-fabric-dark transition-colors"
                      >
                        <SafeIcon icon={FiExternalLink} />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{partner.bio}</p>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services & Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partner.services?.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <SafeIcon icon={FiCheck} className="text-fabric-blue" />
                    <span className="text-gray-800 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Keywords */}
            {partner.keywords && partner.keywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Specializations</h2>
                <div className="flex flex-wrap gap-3">
                  {partner.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Case Studies */}
            {partner.case_studies && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Studies & Portfolio</h2>
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: partner.case_studies }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8 sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              {!showContactForm ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-gradient-to-r from-fabric-blue to-fabric-purple text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <SafeIcon icon={FiMail} className="mr-2" />
                    Send Inquiry
                  </button>
                  
                  <div className="text-center text-sm text-gray-500">
                    Your contact details will be shared with the partner
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <select
                      value={contactForm.projectBudget}
                      onChange={(e) => setContactForm(prev => ({ ...prev, projectBudget: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="Under $50K">Under $50K</option>
                      <option value="$50K - $100K">$50K - $100K</option>
                      <option value="$100K - $250K">$100K - $250K</option>
                      <option value="$250K - $500K">$250K - $500K</option>
                      <option value="$500K+">$500K+</option>
                    </select>
                  </div>
                  
                  <div>
                    <select
                      value={contactForm.timeline}
                      onChange={(e) => setContactForm(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    >
                      <option value="">Select Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Project Description & Requirements *"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-24 resize-none"
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Send Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Languages */}
            {partner.languages && partner.languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg mb-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <SafeIcon icon={FiGlobe} className="mr-2 text-fabric-blue" />
                  Languages
                </h3>
                <div className="space-y-2">
                  {partner.languages.map((language, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500 text-sm" />
                      <span className="text-gray-700">{language}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pricing */}
            {partner.pricing_model && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg mb-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <SafeIcon icon={FiDollarSign} className="mr-2 text-fabric-blue" />
                  Pricing Model
                </h3>
                <p className="text-gray-700">{partner.pricing_model}</p>
              </motion.div>
            )}

            {/* Industry Focus */}
            {partner.industry && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Focus</h3>
                <div className="bg-blue-50 text-fabric-blue px-3 py-2 rounded-lg text-center font-medium">
                  {partner.industry}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;