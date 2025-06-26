import React from 'react';
import { motion } from 'framer-motion';
import Calculator from './Calculator';
import './CalculatorEmbed.css';

const CalculatorEmbed = () => {
  return (
    <div className="calculator-embed-container">
      {/* Minimal Header for Embed */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="embed-header bg-white border-b border-gray-200 py-3 px-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-fabric-blue to-fabric-purple rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-bold">F</span>
            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-fabric-blue to-fabric-purple bg-clip-text text-transparent">
                Microsoft Fabric MVP Calculator
              </h1>
            </div>
          </div>
          <a 
            href="https://fabric.m365calc.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-fabric-blue hover:text-fabric-dark transition-colors"
          >
            View Full Site →
          </a>
        </div>
      </motion.div>

      {/* Calculator Component Only */}
      <div className="embed-content">
        <Calculator />
      </div>
    </div>
  );
};

export default CalculatorEmbed;