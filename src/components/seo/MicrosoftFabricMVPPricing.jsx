import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {
  FiDollarSign, FiBarChart, FiZap, FiFileText, FiTrendingUp, FiCheck, FiArrowRight, FiDatabase, FiSettings, FiShield
} = FiIcons;

const MicrosoftFabricMVPPricing = () => {
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
            Microsoft Fabric MVP Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Complete pricing guide for Microsoft Fabric MVP implementations. Get accurate cost estimates for infrastructure, development, and support with our professional calculator.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => window.location.href = '/#calculator'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Calculate MVP Pricing Now
            </motion.button>
          </div>
        </motion.div>

        {/* Pricing Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Microsoft Fabric MVP Pricing Components
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <SafeIcon icon={FiDatabase} className="text-4xl text-fabric-blue mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Infrastructure & Licensing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Microsoft Fabric Capacity Units</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Power BI Premium Licensing</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Azure Storage & Compute</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Data Lake Storage</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">Starting from $500/month for basic MVP implementations</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <SafeIcon icon={FiSettings} className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Development & Implementation</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Solution Architecture</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Data Pipeline Development</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Dashboard Creation</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Testing & Deployment</li>
              </ul>
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-700">Typically 180% of infrastructure costs for complete development</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <SafeIcon icon={FiShield} className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Support & Maintenance</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />24/7 Monitoring</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Performance Optimization</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />Security Updates</li>
                <li className="flex items-center"><SafeIcon icon={FiCheck} className="text-green-500 mr-2" />User Training</li>
              </ul>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700">35% of infrastructure costs for comprehensive support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Factors */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Factors Affecting Microsoft Fabric MVP Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Volume & Processing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Small (&lt;100GB)</span>
                  <span className="font-semibold text-fabric-blue">1x Base Cost</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Medium (100GB - 1TB)</span>
                  <span className="font-semibold text-fabric-blue">1.5x Base Cost</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Large (1TB - 10TB)</span>
                  <span className="font-semibold text-fabric-blue">2.5x Base Cost</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Enterprise (&gt;10TB)</span>
                  <span className="font-semibold text-fabric-blue">4x Base Cost</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Geographic Scope</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Single Region</span>
                  <span className="font-semibold text-fabric-blue">1x Base Cost</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Multi-Region</span>
                  <span className="font-semibold text-fabric-blue">1.6x Base Cost</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Global Deployment</span>
                  <span className="font-semibold text-fabric-blue">2.4x Base Cost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Microsoft Fabric MVP Pricing by Industry
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                industry: 'Finance & Banking',
                description: 'High compliance requirements and real-time analytics',
                pricing: '$75,000 - $250,000',
                features: [
                  'Real-time fraud detection',
                  'Regulatory reporting',
                  'Risk analytics',
                  'Customer insights'
                ]
              },
              {
                industry: 'Healthcare',
                description: 'HIPAA compliance and patient data analytics',
                pricing: '$50,000 - $180,000',
                features: [
                  'Patient analytics',
                  'Clinical insights',
                  'Compliance monitoring',
                  'Operational efficiency'
                ]
              },
              {
                industry: 'Retail & E-commerce',
                description: 'Customer behavior and inventory optimization',
                pricing: '$40,000 - $150,000',
                features: [
                  'Customer segmentation',
                  'Inventory optimization',
                  'Sales forecasting',
                  'Marketing analytics'
                ]
              }
            ].map((example, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{example.industry}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <div className="text-2xl font-bold text-fabric-blue mb-4">{example.pricing}</div>
                <ul className="space-y-2">
                  {example.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiCheck} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
            Get Accurate Microsoft Fabric MVP Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our professional calculator to get instant, accurate pricing for your Microsoft Fabric MVP project
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/#calculator'}
            className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <SafeIcon icon={FiZap} />
            <span>Calculate My MVP Pricing</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MicrosoftFabricMVPPricing;