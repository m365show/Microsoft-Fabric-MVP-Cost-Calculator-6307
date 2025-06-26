import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiTarget, FiCheck, FiMail, FiUsers, FiTrendingUp, FiDownload, FiShare2 } = FiIcons;

const HowItWorks = () => {
  const steps = [
    {
      icon: FiTarget,
      title: 'Define Your MVP Requirements',
      description: 'Use our comprehensive 16-step calculator to specify your Microsoft Fabric MVP needs, from data sources to analytics capabilities.',
      details: [
        'Select Microsoft Fabric components',
        'Define data sources and volume',
        'Set compliance requirements',
        'Choose analytics capabilities'
      ]
    },
    {
      icon: FiTrendingUp,
      title: 'Get Instant Cost Estimates',
      description: 'Receive detailed pricing breakdown for infrastructure, development, and ongoing support based on your specific requirements.',
      details: [
        'Infrastructure & licensing costs',
        'Development & integration estimates',
        'Support & maintenance pricing',
        'Industry-specific adjustments'
      ]
    },
    {
      icon: FiDownload,
      title: 'Generate Professional Documentation',
      description: 'Download a complete PDF pitch deck with all specifications, cost breakdowns, and project requirements.',
      details: [
        'Executive summary',
        'Technical specifications',
        'Cost breakdown tables',
        'Project timeline & milestones'
      ]
    },
    {
      icon: FiUsers,
      title: 'Find Implementation Partners',
      description: 'Browse our verified partner directory and select qualified consultants, freelancers, or solution providers.',
      details: [
        'Filter by services & expertise',
        'View partner profiles & ratings',
        'Check language support',
        'Review case studies'
      ]
    },
    {
      icon: FiMail,
      title: 'Send Automated Outreach',
      description: 'Use our pre-written email templates to contact selected partners with your complete project specifications.',
      details: [
        'Professional email templates',
        'Automatic PDF attachment',
        'BCC to multiple partners',
        'Contact tracking'
      ]
    },
    {
      icon: FiCheck,
      title: 'Start Your MVP Development',
      description: 'Begin development with clear specifications, qualified partners, and realistic timelines and budgets.',
      details: [
        'Clear project scope',
        'Qualified implementation team',
        'Realistic budget & timeline',
        'Success metrics defined'
      ]
    }
  ];

  const benefits = [
    {
      icon: FiTarget,
      title: 'Save 80% Planning Time',
      description: 'Skip weeks of requirements gathering with our structured approach'
    },
    {
      icon: FiTrendingUp,
      title: 'Accurate Cost Estimates',
      description: 'Get realistic budgets based on 1000+ real MVP projects'
    },
    {
      icon: FiUsers,
      title: 'Qualified Partners Only',
      description: 'Connect with verified Microsoft Fabric specialists'
    },
    {
      icon: FiShare2,
      title: 'Professional Documentation',
      description: 'Investor-ready pitch decks and technical specifications'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            📘 How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From MVP requirements to implementation partner selection - 
            streamline your Microsoft Fabric project planning in 6 simple steps
          </p>
        </motion.div>

        {/* Benefits Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <SafeIcon icon={benefit.icon} className="text-3xl text-fabric-blue mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <SafeIcon icon={step.icon} className="text-3xl text-fabric-blue" />
                  <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                </div>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="aspect-video bg-gradient-to-br from-fabric-blue/10 to-fabric-purple/10 rounded-xl flex items-center justify-center">
                    <SafeIcon icon={step.icon} className="text-6xl text-fabric-blue" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📹 Watch How It Works
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              See the complete process in action - from requirements to partner selection
            </p>
            
            <div className="aspect-video bg-gradient-to-br from-fabric-blue/10 to-fabric-purple/10 rounded-xl flex items-center justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-fabric-blue text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <SafeIcon icon={FiPlay} className="text-2xl ml-1" />
              </motion.button>
            </div>
            
            <p className="text-sm text-gray-500">
              3-minute overview of the complete Microsoft Fabric MVP planning process
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How accurate are the cost estimates?',
                answer: 'Our estimates are based on 1000+ real Microsoft Fabric implementations and updated monthly with current Azure pricing.'
              },
              {
                question: 'Are the implementation partners verified?',
                answer: 'Yes, all partners go through a verification process including Microsoft certifications, portfolio review, and reference checks.'
              },
              {
                question: 'Can I modify the generated specifications?',
                answer: 'Absolutely! The PDF specifications serve as a starting point. You can edit and customize them for your specific needs.'
              },
              {
                question: 'Is there a cost to use the calculator?',
                answer: 'The calculator and basic features are completely free. Partners pay for premium directory placement and enhanced features.'
              },
              {
                question: 'What if I need help with the requirements?',
                answer: 'Our partner network includes consultants who specialize in requirements analysis and can help refine your MVP scope.'
              },
              {
                question: 'How do I track partner responses?',
                answer: 'Partners respond directly to your email. We also provide optional lead tracking for premium users.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 text-center bg-gradient-to-r from-fabric-blue/10 to-fabric-purple/10 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Microsoft Fabric MVP?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've used our platform to successfully plan and implement their Microsoft Fabric projects
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/#calculator'}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start MVP Calculator
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/partners'}
              className="px-8 py-4 border-2 border-fabric-blue text-fabric-blue font-semibold rounded-xl hover:bg-fabric-blue hover:text-white transition-all duration-300"
            >
              Browse Partners
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;