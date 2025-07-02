import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiCalculator, FiZap, FiTrendingUp, FiFileText, FiCheck,
  FiDollarSign, FiClock, FiUsers, FiTarget
} = FiIcons;

const CostCalculatorMicrosoftFabric = () => {
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
            Cost Calculator Microsoft Fabric
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Professional Microsoft Fabric cost calculator for accurate MVP project estimates. Calculate infrastructure, development, and support costs instantly with our comprehensive tool.
          </p>
          <div className="mt-8">
            <motion.button
              onClick={() => window.location.href = '/#calculator'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Start Cost Calculator</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Calculator Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Use Our Microsoft Fabric Cost Calculator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiZap,
                title: 'Instant Results',
                description: 'Get immediate cost estimates based on your specific requirements'
              },
              {
                icon: FiTrendingUp,
                title: 'Accurate Pricing',
                description: 'Based on 1000+ real Microsoft Fabric implementations'
              },
              {
                icon: FiFileText,
                title: 'Professional Reports',
                description: 'Download detailed PDF specifications and cost breakdowns'
              },
              {
                icon: FiUsers,
                title: 'Trusted by 1000+',
                description: 'Used by professionals worldwide for MVP planning'
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

        {/* Calculator Features */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Microsoft Fabric Cost Calculator Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">What Our Calculator Includes:</h3>
              <div className="space-y-4">
                {[
                  'Microsoft Fabric capacity unit pricing',
                  'Power BI Premium licensing costs',
                  'Azure storage and compute expenses',
                  'Development and integration estimates',
                  'Ongoing support and maintenance costs',
                  'Industry-specific adjustments',
                  'Geographic scaling factors',
                  'Compliance and security add-ons'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Cost Calculation Process:</h3>
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Define Requirements',
                    description: 'Specify your data sources, volume, and processing needs'
                  },
                  {
                    step: '2',
                    title: 'Select Components',
                    description: 'Choose Microsoft Fabric features and capabilities'
                  },
                  {
                    step: '3',
                    title: 'Configure Settings',
                    description: 'Set geographic scope, compliance, and performance requirements'
                  },
                  {
                    step: '4',
                    title: 'Get Instant Costs',
                    description: 'Receive detailed pricing breakdown and professional documentation'
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
            Microsoft Fabric Cost Calculator Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Small Business MVP',
                description: 'Basic analytics and reporting',
                infrastructure: '$6,000',
                development: '$10,800',
                support: '$2,100',
                total: '$18,900'
              },
              {
                title: 'Enterprise MVP',
                description: 'Advanced analytics with AI/ML',
                infrastructure: '$36,000',
                development: '$64,800',
                support: '$12,600',
                total: '$113,400'
              },
              {
                title: 'Global Enterprise',
                description: 'Multi-region with real-time analytics',
                infrastructure: '$144,000',
                development: '$259,200',
                support: '$50,400',
                total: '$453,600'
              }
            ].map((example, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{example.title}</h3>
                <p className="text-gray-600 mb-6">{example.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Infrastructure:</span>
                    <span className="font-semibold">{example.infrastructure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development:</span>
                    <span className="font-semibold">{example.development}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Support:</span>
                    <span className="font-semibold">{example.support}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold text-fabric-blue">
                    <span>Total Annual:</span>
                    <span>{example.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Cost Calculator FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How accurate is the Microsoft Fabric cost calculator?',
                answer: 'Our calculator provides estimates based on current Azure pricing and 1000+ real implementations, typically accurate within 15-20% for initial planning.'
              },
              {
                question: 'What costs are included in the calculation?',
                answer: 'Infrastructure (Fabric capacity, storage), development (architecture, coding, testing), and support (monitoring, maintenance, training).'
              },
              {
                question: 'Can I customize the cost calculations?',
                answer: 'Yes, the calculator allows customization for data volume, geographic scope, compliance requirements, and industry-specific needs.'
              },
              {
                question: 'Is the cost calculator free to use?',
                answer: 'Yes, the Microsoft Fabric cost calculator is completely free and includes PDF report generation and email templates.'
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-bold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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
            Ready to Calculate Your Microsoft Fabric Costs?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant, accurate cost estimates for your Microsoft Fabric MVP project with our professional calculator
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/#calculator'}
            className="px-8 py-4 bg-gradient-to-r from-fabric-blue to-fabric-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <SafeIcon icon={FiCalculator} />
            <span>Start Microsoft Fabric Cost Calculator</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CostCalculatorMicrosoftFabric;