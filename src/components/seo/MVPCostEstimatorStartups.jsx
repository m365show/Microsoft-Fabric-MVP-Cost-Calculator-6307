import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {
  FiTarget, FiZap, FiTrendingUp, FiDollarSign, FiCheck, FiUsers, FiClock, FiFileText, FiSettings
} = FiIcons;

const MVPCostEstimatorStartups = () => {
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
            MVP Cost Estimator for Startups
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Specialized MVP cost estimator designed for startups planning Microsoft Fabric data analytics projects. Get accurate estimates for infrastructure, development, and operational costs.
          </p>
          <div className="mt-8">
            <motion.button
              onClick={() => window.location.href = '/#calculator'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiTarget} />
              <span>Estimate My MVP Costs</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Startup Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Startups Choose Our MVP Cost Estimator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiZap,
                title: 'Instant Estimates',
                description: 'Get MVP cost estimates in minutes, not weeks of consulting'
              },
              {
                icon: FiDollarSign,
                title: 'Budget-Friendly',
                description: 'Optimized for startup budgets with scalable pricing models'
              },
              {
                icon: FiFileText,
                title: 'Investor-Ready',
                description: 'Generate professional pitch decks for investor presentations'
              },
              {
                icon: FiUsers,
                title: 'Startup-Focused',
                description: 'Built specifically for early-stage company requirements'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <SafeIcon icon={benefit.icon} className="text-3xl text-fabric-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Startup MVP Phases */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Startup MVP Development Phases
          </h2>
          <div className="space-y-8">
            {[
              {
                phase: 'MVP Phase 1',
                title: 'Proof of Concept',
                duration: '4-6 weeks',
                cost: '$15,000 - $25,000',
                description: 'Validate core data analytics concept with minimal features',
                features: [
                  'Basic data ingestion',
                  'Simple dashboard',
                  'Core analytics',
                  'User feedback collection'
                ]
              },
              {
                phase: 'MVP Phase 2',
                title: 'Market Validation',
                duration: '6-8 weeks',
                cost: '$25,000 - $45,000',
                description: 'Expand features based on initial feedback and market validation',
                features: [
                  'Enhanced dashboards',
                  'Additional data sources',
                  'Basic automation',
                  'Performance optimization'
                ]
              },
              {
                phase: 'MVP Phase 3',
                title: 'Market Ready',
                duration: '8-12 weeks',
                cost: '$45,000 - $75,000',
                description: 'Production-ready platform with scalability and security',
                features: [
                  'Advanced analytics',
                  'Security implementation',
                  'Scalability features',
                  'Customer onboarding'
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="border-l-4 border-fabric-blue pl-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{phase.phase}: {phase.title}</h3>
                    <p className="text-gray-600 mt-2">{phase.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center text-gray-600">
                        <SafeIcon icon={FiClock} className="mr-1" />
                        {phase.duration}
                      </span>
                      <span className="flex items-center text-fabric-blue font-semibold">
                        <SafeIcon icon={FiDollarSign} className="mr-1" />
                        {phase.cost}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Optimization */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            MVP Cost Optimization for Startups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Cost-Saving Strategies:</h3>
              <div className="space-y-4">
                {[
                  'Start with core features only',
                  'Use managed services to reduce overhead',
                  'Implement pay-as-you-scale pricing',
                  'Leverage free tiers and credits',
                  'Focus on essential integrations first',
                  'Use cloud-native solutions'
                ].map((strategy, index) => (
                  <div key={index} className="flex items-center">
                    <SafeIcon icon={FiCheck} className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{strategy}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Scaling Considerations:</h3>
              <div className="space-y-4">
                {[
                  'Plan for data volume growth',
                  'Design for user base expansion',
                  'Consider multi-tenant architecture',
                  'Implement monitoring early',
                  'Plan for geographic expansion',
                  'Prepare for compliance requirements'
                ].map((consideration, index) => (
                  <div key={index} className="flex items-center">
                    <SafeIcon icon={FiTrendingUp} className="text-fabric-blue mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{consideration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Startup Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Startup MVP Cost Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'SaaS Analytics Startup',
                description: 'Customer analytics for SaaS platforms',
                stage: 'Seed Stage',
                features: [
                  'Customer behavior tracking',
                  'Usage analytics',
                  'Basic reporting',
                  'API integration'
                ],
                cost: '$20,000 - $35,000',
                timeline: '6-8 weeks',
                users: '10-100 customers'
              },
              {
                title: 'E-commerce Insights',
                description: 'Sales and inventory analytics',
                stage: 'Series A',
                features: [
                  'Sales dashboards',
                  'Inventory optimization',
                  'Customer segmentation',
                  'Predictive analytics'
                ],
                cost: '$40,000 - $65,000',
                timeline: '8-12 weeks',
                users: '100-1000 customers'
              },
              {
                title: 'FinTech Analytics',
                description: 'Financial data analytics platform',
                stage: 'Series B',
                features: [
                  'Risk analytics',
                  'Compliance reporting',
                  'Real-time monitoring',
                  'Advanced security'
                ],
                cost: '$75,000 - $120,000',
                timeline: '12-16 weeks',
                users: '1000+ customers'
              }
            ].map((example, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{example.title}</h3>
                  <span className="bg-fabric-blue text-white text-xs px-2 py-1 rounded-full">{example.stage}</span>
                </div>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-semibold">{example.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-semibold">{example.users}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {example.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="bg-gradient-to-r from-fabric-blue to-fabric-purple text-white p-4 rounded-lg text-center">
                  <div className="text-sm opacity-90 mb-1">Total MVP Cost</div>
                  <div className="text-xl font-bold">{example.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funding and ROI */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            MVP ROI and Funding Considerations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Investor Pitch Points:</h3>
              <div className="space-y-4">
                {[
                  'Clear market validation strategy',
                  'Scalable technology architecture',
                  'Cost-effective development approach',
                  'Defined success metrics and KPIs',
                  'Competitive advantage through data',
                  'Path to profitability and growth'
                ].map((point, index) => (
                  <div key={index} className="flex items-start">
                    <SafeIcon icon={FiTarget} className="text-fabric-blue mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Expected Returns:</h3>
              <div className="space-y-4">
                {[
                  'Faster time to market',
                  'Reduced development risks',
                  'Better customer insights',
                  'Data-driven decision making',
                  'Scalable revenue model',
                  'Competitive market positioning'
                ].map((return_, index) => (
                  <div key={index} className="flex items-start">
                    <SafeIcon icon={FiTrendingUp} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{return_}</span>
                  </div>
                ))}
              </div>
            </div>
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
            Start Your Startup MVP Cost Estimation
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get accurate MVP cost estimates tailored for startups. Generate investor-ready documentation and technical specifications.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/#calculator'}
            className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <SafeIcon icon={FiZap} />
            <span>Calculate My Startup MVP Costs</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MVPCostEstimatorStartups;