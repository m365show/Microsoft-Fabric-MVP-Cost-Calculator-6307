import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../../contexts/AuthContext';
import questConfig from '../../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCloud, FiTrendingUp, FiShield, FiZap } = FiIcons;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (userData) => {
    const isNewUser = login(userData);
    
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard'); // or main app route
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-fabric-blue to-fabric-purple relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <SafeIcon icon={FiCloud} className="text-4xl" />
              <h1 className="text-3xl font-bold">Microsoft Fabric</h1>
            </div>
            
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Welcome Back
            </h2>
            
            <p className="text-xl mb-12 text-blue-100 leading-relaxed">
              Continue your Microsoft Fabric MVP journey. Access your personalized dashboard, 
              track your projects, and connect with implementation partners.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-6">
              {[
                {
                  icon: FiTrendingUp,
                  title: 'Track Your MVPs',
                  description: 'Monitor project progress and cost estimates'
                },
                {
                  icon: FiShield,
                  title: 'Secure Access',
                  description: 'Enterprise-grade security for your data'
                },
                {
                  icon: FiZap,
                  title: 'Instant Calculations',
                  description: 'Get real-time cost estimates and specifications'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={feature.icon} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-blue-100 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Authentication */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SafeIcon icon={FiCloud} className="text-3xl text-fabric-blue" />
              <h1 className="text-2xl font-bold text-gray-900">Microsoft Fabric</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your MVP journey</p>
          </div>

          {/* Login Component Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your dashboard</p>
            </div>

            {/* Quest Login Component */}
            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
                style={{
                  width: '100%',
                  minHeight: '400px'
                }}
              />
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-4">
              <div className="text-sm text-gray-500">
                New to Microsoft Fabric MVP Calculator?
              </div>
              <button
                onClick={() => navigate('/')}
                className="text-fabric-blue hover:text-fabric-dark transition-colors font-medium"
              >
                Learn more about our platform →
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;