import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiBarChart, FiDatabase, FiTrendingUp, FiZap, FiCheck,
  FiDollarSign, FiSettings, FiShield, FiUsers
} = FiIcons;

const DataAnalyticsCostEstimation = () => {
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
            Data Analytics Cost Estimation
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Professional data analytics cost estimation for Microsoft Fabric projects. Calculate infrastructure, platform, development, and operational costs for your analytics initiatives.
          </p>
          <div className="mt-8">
            <motion.button
              onClick={() => window.location.href = '/#calculator'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiBarChart} />
              <span>Estimate Analytics Costs</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Cost Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Data Analytics Cost Categories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiDatabase,
                title: 'Data Platform Costs',
                description: 'Storage, compute, and data processing infrastructure',
                items: [
                  'Data lake storage',
                  'Data warehouse licensing',
                  'Compute resources',
                  'Data transfer costs'
                ]
              },
              {
                icon: FiSettings,
                title: 'Development Costs',
                description: 'Analytics solution development and implementation',
                items: [
                  'Data pipeline development',
                  'Dashboard creation',
                  'Model development',
                  'Integration work'
                ]
              },
              {
                icon: FiShield,
                title: 'Platform Licensing',
                description: 'Analytics platform and tool licensing costs',
                items: [
                  'Power BI licensing',
                  'Advanced analytics tools',
                  'Security features',
                  'Third-party connectors'
                ]
              },
              {
                icon: FiUsers,
                title: 'Operational Costs',
                description: 'Ongoing support, maintenance, and operations',
                items: [
                  'Support and monitoring',
                  'Training and adoption',
                  'Maintenance and updates',
                  'Performance optimization'
                ]
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <SafeIcon icon={category.icon} className="text-3xl text-fabric-blue mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Estimation Methodology */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Data Analytics Cost Estimation Methodology
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Cost Estimation Factors:</h3>
              <div className="space-y-4">
                {[
                  {
                    factor: 'Data Volume',
                    description: 'Amount of data to be processed and stored'
                  },
                  {
                    factor: 'User Base',
                    description: 'Number of users accessing analytics platforms'
                  },
                  {
                    factor: 'Complexity',
                    description: 'Advanced analytics, AI/ML, real-time processing'
                  },
                  {
                    factor: 'Integration',
                    description: 'Number and complexity of data sources'
                  },
                  {
                    factor: 'Compliance',
                    description: 'Security, governance, and regulatory requirements'
                  },
                  {
                    factor: 'Performance',
                    description: 'Response time and availability requirements'
                  }
                ].map((item, index) => (
                  <div key={index} className="border-l-4 border-fabric-blue pl-4">
                    <h4 className="font-bold text-gray-900">{item.factor}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Estimation Process:</h3>
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Requirements Analysis',
                    description: 'Define business requirements and technical specifications'
                  },
                  {
                    step: '2',
                    title: 'Architecture Design',
                    description: 'Design solution architecture and identify components'
                  },
                  {
                    step: '3',
                    title: 'Resource Calculation',
                    description: 'Calculate required compute, storage, and licensing'
                  },
                  {
                    step: '4',
                    title: 'Cost Modeling',
                    description: 'Apply pricing models and scaling factors'
                  },
                  {
                    step: '5',
                    title: 'Validation',
                    description: 'Validate estimates against industry benchmarks'
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-fabric-blue text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cost Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Data Analytics Cost Estimation Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Basic Analytics',
                description: 'Small business reporting and dashboards',
                users: '10-50 users',
                dataVolume: '<1TB',
                features: ['Standard dashboards', 'Basic reporting', 'Single data source', 'Email support'],
                annualCost: '$15,000 - $30,000'
              },
              {
                title: 'Advanced Analytics',
                description: 'Enterprise analytics with ML capabilities',
                users: '100-500 users',
                dataVolume: '1-10TB',
                features: ['Advanced dashboards', 'Predictive analytics', 'Multiple data sources', 'Phone support'],
                annualCost: '$75,000 - $150,000'
              },
              {
                title: 'Enterprise Analytics',
                description: 'Large-scale analytics platform',
                users: '1000+ users',
                dataVolume: '>10TB',
                features: ['Real-time analytics', 'AI/ML platform', 'Complex integrations', '24/7 support'],
                annualCost: '$200,000 - $500,000'
              }
            ].map((example, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{example.title}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-semibold">{example.users}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Data Volume:</span>
                    <span className="font-semibold">{example.dataVolume}</span>
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
                  <div className="text-sm opacity-90 mb-1">Annual Cost</div>
                  <div className="text-xl font-bold">{example.annualCost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Data Analytics ROI Considerations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Cost Savings:</h3>
              <div className="space-y-4">
                {[
                  'Reduced manual reporting effort',
                  'Faster decision-making processes',
                  'Improved operational efficiency',
                  'Better resource allocation',
                  'Reduced data silos and duplication',
                  'Automated insights and alerts'
                ].map((saving, index) => (
                  <div key={index} className="flex items-center">
                    <SafeIcon icon={FiCheck} className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{saving}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Impact:</h3>
              <div className="space-y-4">
                {[
                  'Better customer insights and targeting',
                  'Improved product recommendations',
                  'Optimized pricing strategies',
                  'Enhanced customer retention',
                  'New revenue opportunities',
                  'Competitive advantage through data'
                ].map((impact, index) => (
                  <div key={index} className="flex items-center">
                    <SafeIcon icon={FiTrendingUp} className="text-fabric-blue mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{impact}</span>
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
            Get Your Data Analytics Cost Estimation
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our professional calculator to get accurate cost estimates for your data analytics project with Microsoft Fabric
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/#calculator'}
            className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <SafeIcon icon={FiZap} />
            <span>Calculate Analytics Costs</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DataAnalyticsCostEstimation;