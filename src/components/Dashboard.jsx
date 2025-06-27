import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiLogOut, FiHome, FiBarChart, FiSettings } = FiIcons;

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigation will be handled by the auth context
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiHome} className="text-2xl text-fabric-blue" />
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-gray-500" />
                <span className="text-sm text-gray-700">Welcome back!</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <SafeIcon icon={FiLogOut} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Microsoft Fabric MVP Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              You've successfully completed the authentication flow! This is where your 
              personalized dashboard would be located.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-fabric-blue to-fabric-purple p-6 rounded-xl text-white">
                <SafeIcon icon={FiBarChart} className="text-3xl mb-3" />
                <h3 className="text-xl font-semibold mb-2">Your Projects</h3>
                <p className="text-blue-100">Manage your MVP calculations and specifications</p>
              </div>
              
              <div className="bg-gradient-to-r from-fabric-purple to-fabric-light p-6 rounded-xl text-white">
                <SafeIcon icon={FiUser} className="text-3xl mb-3" />
                <h3 className="text-xl font-semibold mb-2">Profile</h3>
                <p className="text-purple-100">Update your preferences and settings</p>
              </div>
              
              <div className="bg-gradient-to-r from-fabric-light to-fabric-blue p-6 rounded-xl text-white">
                <SafeIcon icon={FiSettings} className="text-3xl mb-3" />
                <h3 className="text-xl font-semibold mb-2">Settings</h3>
                <p className="text-blue-100">Customize your dashboard experience</p>
              </div>
            </div>
          </div>

          {/* User Info Debug (remove in production) */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Authentication Debug Info:</h3>
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify({ userId: user?.userId, hasToken: !!user?.token }, null, 2)}
            </pre>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;