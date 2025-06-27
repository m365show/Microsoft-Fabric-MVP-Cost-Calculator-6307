import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import { useAuth } from '../../contexts/AuthContext';
import questConfig from '../../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiRocket, FiTarget, FiUsers, FiTrendingUp, FiCheckCircle } = FiIcons;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  const getAnswers = () => {
    // Called when onboarding is complete
    console.log('Onboarding completed with answers:', answers);
    
    // Navigate to main app (not back to login)
    navigate('/dashboard'); // or wherever your main app is
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fabric-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-fabric-purple to-fabric-blue relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <SafeIcon icon={FiRocket} className="text-4xl" />
              <h1 className="text-3xl font-bold">Let's Get Started!</h1>
            </div>
            
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Welcome to Microsoft Fabric MVP
            </h2>
            
            <p className="text-xl mb-12 text-purple-100 leading-relaxed">
              We're setting up your personalized experience. This quick onboarding will help us 
              tailor the platform to your specific needs and goals.
            </p>

            {/* Onboarding Benefits */}
            <div className="space-y-6">
              {[
                {
                  icon: FiTarget,
                  title: 'Personalized Recommendations',
                  description: 'Get MVP suggestions based on your industry and goals'
                },
                {
                  icon: FiUsers,
                  title: 'Partner Matching',
                  description: 'Connect with the right implementation partners'
                },
                {
                  icon: FiTrendingUp,
                  title: 'Custom Dashboards',
                  description: 'See metrics and insights relevant to your projects'
                },
                {
                  icon: FiCheckCircle,
                  title: 'Streamlined Experience',
                  description: 'Skip repetitive setup in future calculations'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={benefit.icon} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-purple-100 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mt-12">
              <div className="text-sm text-purple-100 mb-2">Setup Progress</div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div 
                  className="bg-white h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Onboarding Component */}
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
              <SafeIcon icon={FiRocket} className="text-3xl text-fabric-purple" />
              <h1 className="text-2xl font-bold text-gray-900">Getting Started</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Let's Set You Up</h2>
            <p className="text-gray-600">Quick setup to personalize your experience</p>
          </div>

          {/* Onboarding Component Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="hidden lg:block p-6 border-b border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Setup</h2>
              <p className="text-gray-600">Tell us about yourself to get started</p>
            </div>

            {/* Quest Onboarding Component */}
            <div className="quest-onboarding-container p-6" style={{ minHeight: '400px' }}>
              <OnBoarding
                userId={user.userId}
                token={user.token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
                style={{
                  width: '100%',
                  minHeight: '400px'
                }}
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </div>

          {/* Skip Option */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              Skip setup for now →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;