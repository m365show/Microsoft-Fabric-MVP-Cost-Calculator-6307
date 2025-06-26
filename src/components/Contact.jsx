import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { FiMail, FiLinkedin, FiMessageSquare, FiSend, FiCheck, FiHelpCircle, FiUsers, FiBriefcase } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: FiHelpCircle },
    { value: 'partner', label: 'Partner Questions', icon: FiUsers },
    { value: 'business', label: 'Business Partnership', icon: FiBriefcase },
    { value: 'technical', label: 'Technical Support', icon: FiMessageSquare }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('contact_inquiries_2025')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: formData.inquiryType,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Error submitting contact form:', error);
        alert('Error submitting form. Please try again or contact us directly.');
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
              Thank you for contacting us!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We've received your message and will respond within 24 hours.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Return to Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            📞 Contact & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about the Microsoft Fabric MVP Calculator, partner directory, 
            or need help with your project? We're here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {inquiryTypes.map((type) => (
                      <motion.div
                        key={type.value}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          formData.inquiryType === type.value
                            ? 'border-fabric-blue bg-fabric-blue/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('inquiryType', type.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <SafeIcon 
                            icon={type.icon} 
                            className={`text-lg ${
                              formData.inquiryType === type.value ? 'text-fabric-blue' : 'text-gray-400'
                            }`} 
                          />
                          <span className="font-medium text-gray-900">{type.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent h-32 resize-none"
                    placeholder="Tell us about your question, project, or how we can help..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="w-full bg-gradient-to-r from-fabric-blue to-fabric-purple text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Direct Contact</h3>
              
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/m365-summit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <SafeIcon icon={FiLinkedin} className="text-blue-600 text-xl" />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      Connect with Mirko
                    </div>
                    <div className="text-sm text-gray-500">Creator & Lead Developer</div>
                  </div>
                </a>
                
                <a
                  href="https://www.linkedin.com/school/m365-show/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <SafeIcon icon={FiUsers} className="text-blue-600 text-xl" />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      M365 Show Community
                    </div>
                    <div className="text-sm text-gray-500">Follow for updates</div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Response Times */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Response Times</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">General Inquiries</span>
                  <span className="text-green-600 font-semibold">24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Partner Support</span>
                  <span className="text-green-600 font-semibold">12 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Technical Issues</span>
                  <span className="text-green-600 font-semibold">4 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Business Partnerships</span>
                  <span className="text-green-600 font-semibold">48 hours</span>
                </div>
              </div>
            </motion.div>

            {/* Quick FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Answers</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Calculator Issues?</h4>
                  <p className="text-sm text-gray-600">
                    Try refreshing the page or clearing your browser cache
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Partner Not Responding?</h4>
                  <p className="text-sm text-gray-600">
                    Contact us and we'll help connect you with alternative partners
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Want to Become a Partner?</h4>
                  <p className="text-sm text-gray-600">
                    <a href="/partner-setup" className="text-fabric-blue hover:text-fabric-dark">
                      Start your application here →
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-r from-fabric-blue/10 to-fabric-purple/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
              <p className="text-gray-700 mb-3">
                We're available for urgent support:
              </p>
              <div className="text-sm text-gray-600">
                <div>Monday - Friday: 9:00 AM - 6:00 PM CET</div>
                <div>Saturday: 10:00 AM - 2:00 PM CET</div>
                <div>Sunday: Emergency support only</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;