import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiFileText, FiDownload, FiZap, FiCheck, FiUsers,
  FiTrendingUp, FiTarget, FiMail, FiShare2
} = FiIcons;

const MVPPitchDeckGenerator = () => {
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
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            MVP Pitch Deck Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Generate professional MVP pitch decks for Microsoft Fabric projects. Create investor-ready presentations with cost breakdowns, technical specifications, and implementation plans.
          </p>
          <div className="mt-8">
            <motion.button
              onClick={() => window.location.href = '/#calculator'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiFileText} />
              <span>Generate Pitch Deck</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            MVP Pitch Deck Generator Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiFileText,
                title: 'Professional Templates',
                description: 'Investor-ready pitch deck templates designed for Microsoft Fabric MVP presentations'
              },
              {
                icon: FiZap,
                title: 'Instant Generation',
                description: 'Generate complete pitch decks in minutes with all your project specifications'
              },
              {
                icon: FiDownload,
                title: 'PDF Download',
                description: 'Download professional PDF pitch decks ready for presentations and sharing'
              },
              {
                icon: FiTrendingUp,
                title: 'Cost Analysis',
                description: 'Detailed cost breakdowns and ROI projections included in every pitch deck'
              },
              {
                icon: FiTarget,
                title: 'Technical Specs',
                description: 'Complete technical specifications and implementation roadmaps'
              },
              {
                icon: FiMail,
                title: 'Email Templates',
                description: 'Ready-to-send email templates for investor and stakeholder outreach'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <SafeIcon icon={feature.icon} className="text-3xl text-fabric-blue mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pitch Deck Contents */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What's Included in Your MVP Pitch Deck
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Presentation Slides:</h3>
              <div className="space-y-4">
                {[
                  'Executive Summary & Business Case',
                  'Problem Statement & Market Opportunity',
                  'Microsoft Fabric Solution Overview',
                  'Technical Architecture & Components',
                  'Implementation Timeline & Milestones',
                  'Cost Breakdown & Investment Analysis',
                  'ROI Projections & Success Metrics',
                  'Risk Assessment & Mitigation',
                  'Team & Resource Requirements',
                  'Next Steps & Call to Action'
                ].map((slide, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{slide}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Supporting Documents:</h3>
              <div className="space-y-4">
                {[
                  'Detailed Technical Specifications',
                  'Complete Cost Breakdown Tables',
                  'Implementation Project Plan',
                  'Data Sources & Integration Map',
                  'Security & Compliance Framework',
                  'Performance & Scalability Metrics',
                  'Vendor Evaluation Criteria',
                  'Training & Support Requirements',
                  'Success Metrics & KPIs',
                  'Email Templates for Outreach'
                ].map((document, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{document}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            MVP Pitch Deck Use Cases
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Investor Presentations',
                description: 'Secure funding with professional pitch decks',
                benefits: [
                  'Clear ROI projections',
                  'Market opportunity analysis',
                  'Technical feasibility proof',
                  'Investment requirements'
                ]
              },
              {
                title: 'Stakeholder Buy-in',
                description: 'Get internal approval for MVP projects',
                benefits: [
                  'Business case justification',
                  'Cost-benefit analysis',
                  'Implementation roadmap',
                  'Risk mitigation plans'
                ]
              },
              {
                title: 'Vendor Proposals',
                description: 'Create RFPs for implementation partners',
                benefits: [
                  'Detailed requirements',
                  'Evaluation criteria',
                  'Project specifications',
                  'Contract templates'
                ]
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            How the MVP Pitch Deck Generator Works
          </h2>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Define Your MVP Requirements',
                description: 'Use our calculator to specify your Microsoft Fabric MVP needs, data sources, and business objectives.'
              },
              {
                step: '2',
                title: 'Get Cost Estimates',
                description: 'Receive detailed pricing breakdowns for infrastructure, development, and ongoing support costs.'
              },
              {
                step: '3',
                title: 'Generate Pitch Deck',
                description: 'Automatically generate a professional pitch deck with all your specifications and cost analysis.'
              },
              {
                step: '4',
                title: 'Download & Share',
                description: 'Download your complete pitch deck as PDF and use email templates to share with stakeholders.'
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-fabric-blue/10 to-fabric-purple/10 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Create Your MVP Pitch Deck Now
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional Microsoft Fabric MVP pitch decks in minutes. Impress investors and stakeholders with detailed specifications and cost analysis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/#calculator'}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto sm:mx-0"
            >
              <SafeIcon icon={FiFileText} />
              <span>Generate My Pitch Deck</span>
            </motion.button>
            <div className="flex items-center space-x-2 text-gray-500">
              <SafeIcon icon={FiUsers} className="text-sm" />
              <span className="text-sm">Used by 1000+ professionals</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MVPPitchDeckGenerator;