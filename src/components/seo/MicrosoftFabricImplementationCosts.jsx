import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiDollarSign, FiSettings, FiShield, FiDatabase, FiTrendingUp,
  FiCheck, FiClock, FiUsers, FiZap
} = FiIcons;

const MicrosoftFabricImplementationCosts = () => {
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
            Microsoft Fabric Implementation Costs
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Complete guide to Microsoft Fabric implementation costs including infrastructure, development, licensing, and support. Get accurate estimates for your enterprise data platform project.
          </p>
          <div className="mt-8">
            <motion.button
              onClick={() => window.location.href = '/#calculator'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiDollarSign} />
              <span>Get Implementation Cost Estimate</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Cost Breakdown */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Microsoft Fabric Implementation Cost Breakdown
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiDatabase,
                title: 'Infrastructure Costs',
                percentage: '30-40%',
                description: 'Fabric capacity units, storage, compute resources',
                details: [
                  'Fabric Capacity Units (F-SKUs)',
                  'Azure Data Lake Storage',
                  'Compute resources for processing',
                  'Network and bandwidth costs'
                ]
              },
              {
                icon: FiSettings,
                title: 'Development Costs',
                percentage: '40-50%',
                description: 'Architecture, development, testing, deployment',
                details: [
                  'Solution architecture design',
                  'Data pipeline development',
                  'Dashboard and report creation',
                  'Testing and quality assurance'
                ]
              },
              {
                icon: FiShield,
                title: 'Licensing Costs',
                percentage: '10-15%',
                description: 'Power BI, security, compliance features',
                details: [
                  'Power BI Premium licensing',
                  'Security and compliance features',
                  'Advanced analytics capabilities',
                  'Third-party connector licenses'
                ]
              },
              {
                icon: FiUsers,
                title: 'Support & Training',
                percentage: '10-20%',
                description: 'Ongoing support, maintenance, user training',
                details: [
                  '24/7 monitoring and support',
                  'Performance optimization',
                  'User training and adoption',
                  'Documentation and knowledge transfer'
                ]
              }
            ].map((cost, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <SafeIcon icon={cost.icon} className="text-3xl text-fabric-blue mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cost.title}</h3>
                <div className="text-2xl font-bold text-fabric-blue mb-3">{cost.percentage}</div>
                <p className="text-gray-600 mb-4">{cost.description}</p>
                <ul className="space-y-2">
                  {cost.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Phases */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Microsoft Fabric Implementation Phases & Costs
          </h2>
          <div className="space-y-8">
            {[
              {
                phase: 'Phase 1',
                title: 'Planning & Architecture',
                duration: '2-4 weeks',
                cost: '$15,000 - $30,000',
                activities: [
                  'Requirements gathering and analysis',
                  'Solution architecture design',
                  'Data source assessment',
                  'Security and compliance planning'
                ]
              },
              {
                phase: 'Phase 2',
                title: 'Core Implementation',
                duration: '8-12 weeks',
                cost: '$50,000 - $120,000',
                activities: [
                  'Fabric workspace setup',
                  'Data pipeline development',
                  'Lakehouse and warehouse creation',
                  'Initial dashboard development'
                ]
              },
              {
                phase: 'Phase 3',
                title: 'Advanced Features',
                duration: '4-8 weeks',
                cost: '$25,000 - $60,000',
                activities: [
                  'AI/ML model development',
                  'Real-time analytics setup',
                  'Advanced visualizations',
                  'Custom connector development'
                ]
              },
              {
                phase: 'Phase 4',
                title: 'Testing & Deployment',
                duration: '2-4 weeks',
                cost: '$10,000 - $25,000',
                activities: [
                  'User acceptance testing',
                  'Performance optimization',
                  'Production deployment',
                  'Go-live support'
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="border-l-4 border-fabric-blue pl-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{phase.phase}: {phase.title}</h3>
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
                  {phase.activities.map((activity, i) => (
                    <div key={i} className="flex items-center text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Factors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Factors Affecting Microsoft Fabric Implementation Costs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Volume & Complexity',
                factors: [
                  'Number of data sources',
                  'Data volume and velocity',
                  'Data transformation complexity',
                  'Real-time processing requirements'
                ]
              },
              {
                title: 'Geographic Scope',
                factors: [
                  'Single vs multi-region deployment',
                  'Data residency requirements',
                  'Compliance regulations',
                  'Network latency considerations'
                ]
              },
              {
                title: 'Integration Requirements',
                factors: [
                  'Legacy system integration',
                  'Third-party connectors',
                  'Custom API development',
                  'Migration complexity'
                ]
              },
              {
                title: 'Security & Compliance',
                factors: [
                  'Industry regulations (GDPR, HIPAA)',
                  'Advanced security features',
                  'Audit and monitoring requirements',
                  'Data governance policies'
                ]
              },
              {
                title: 'User Base & Adoption',
                factors: [
                  'Number of users',
                  'Training requirements',
                  'Change management needs',
                  'Support level expectations'
                ]
              },
              {
                title: 'Performance Requirements',
                factors: [
                  'Query response time SLAs',
                  'Concurrent user capacity',
                  'Data refresh frequency',
                  'Backup and disaster recovery'
                ]
              }
            ].map((factor, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{factor.title}</h3>
                <ul className="space-y-2">
                  {factor.factors.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Examples */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Microsoft Fabric Implementation Cost Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Small Business',
                description: 'Basic analytics for 50 users',
                features: ['Single data source', 'Standard dashboards', 'Basic security', 'Email support'],
                cost: '$25,000 - $50,000',
                timeline: '6-8 weeks'
              },
              {
                title: 'Mid-Market Enterprise',
                description: 'Advanced analytics for 500 users',
                features: ['Multiple data sources', 'Advanced analytics', 'Enhanced security', 'Phone support'],
                cost: '$75,000 - $150,000',
                timeline: '12-16 weeks'
              },
              {
                title: 'Large Enterprise',
                description: 'Global deployment for 5000+ users',
                features: ['Complex integrations', 'AI/ML capabilities', 'Enterprise security', '24/7 support'],
                cost: '$200,000 - $500,000',
                timeline: '20-24 weeks'
              }
            ].map((example, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <ul className="space-y-2 mb-6">
                  {example.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Total Cost:</span>
                    <span className="text-fabric-blue font-bold">{example.cost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Timeline:</span>
                    <span className="text-gray-600">{example.timeline}</span>
                  </div>
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
            Get Your Microsoft Fabric Implementation Cost Estimate
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our professional calculator to get detailed cost estimates for your Microsoft Fabric implementation project
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/#calculator'}
            className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <SafeIcon icon={FiZap} />
            <span>Calculate Implementation Costs</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MicrosoftFabricImplementationCosts;