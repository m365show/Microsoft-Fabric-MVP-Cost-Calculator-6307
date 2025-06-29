import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import jsPDF from 'jspdf';

const {
  FiDownload, FiFileText, FiMail, FiShare2, FiCheck, FiLoader,
  FiTarget, FiDatabase, FiServer, FiGlobe, FiSettings, FiClock,
  FiDollarSign, FiUsers, FiShield, FiBrain, FiZap, FiTrendingUp,
  FiEye, FiHeart, FiCopy, FiExternalLink, FiRefreshCw
} = FiIcons;

const PitchDeckGenerator = ({ formData, costs }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const generateProfessionalPDF = async () => {
    setIsGenerating(true);

    try {
      // Create new PDF document with A4 size
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let currentY = margin;

      // Helper function to add new page if needed
      const checkPageBreak = (neededHeight) => {
        if (currentY + neededHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
          return true;
        }
        return false;
      };

      // Helper function to clean text for PDF - FIXED REGEX
      const cleanTextForPDF = (text) => {
        if (!text) return '';
        // Remove non-printable characters except common whitespace
        return String(text)
          .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')
          .trim();
      };

      // Helper function to add text with word wrapping - FIXED ENCODING
      const addWrappedText = (text, x, y, maxWidth, fontSize = 10, color = [0, 0, 0]) => {
        if (!text) return 0;
        const cleanText = cleanTextForPDF(text);
        if (!cleanText) return 0;

        pdf.setFontSize(fontSize);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.setFont('helvetica', 'normal');

        const lines = pdf.splitTextToSize(cleanText, maxWidth);
        pdf.text(lines, x, y);
        return lines.length * (fontSize * 0.35); // Return height used
      };

      // Helper function to add section header - FIXED ENCODING
      const addSectionHeader = (title) => {
        checkPageBreak(15);
        const cleanTitle = cleanTextForPDF(title).replace(/[^\w\s&-]/g, ''); // Add background rectangle for header
        pdf.setFillColor(0, 120, 212); // Fabric blue
        pdf.rect(margin, currentY - 3, contentWidth, 10, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cleanTitle, margin + 3, currentY + 4);
        currentY += 15;
      };

      // Helper function to add subsection - FIXED ENCODING
      const addSubSection = (title, content) => {
        if (!content) return;
        checkPageBreak(20);

        const cleanTitle = cleanTextForPDF(title);
        const cleanContent = cleanTextForPDF(content);

        pdf.setTextColor(0, 120, 212);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cleanTitle + ':', margin, currentY);
        currentY += 6;

        const contentHeight = addWrappedText(cleanContent, margin + 5, currentY, contentWidth - 5, 10, [0, 0, 0]);
        currentY += contentHeight + 8;
      };

      // COVER PAGE
      pdf.setFillColor(0, 120, 212);
      pdf.rect(0, 0, pageWidth, 60, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Microsoft Fabric MVP', pageWidth / 2, 25, { align: 'center' });
      pdf.text('Professional Project Specifications', pageWidth / 2, 35, { align: 'center' });

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Cost Analysis & Implementation Plan', pageWidth / 2, 45, { align: 'center' });
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 52, { align: 'center' });

      currentY = 80;

      // Company Information Box
      pdf.setFillColor(240, 240, 240);
      pdf.rect(margin, currentY, contentWidth, 45, 'F');
      pdf.setDrawColor(0, 120, 212);
      pdf.rect(margin, currentY, contentWidth, 45, 'S');

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(cleanTextForPDF(formData.companyName) || 'Company Name', margin + 5, currentY + 10);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Industry: ${cleanTextForPDF(formData.industry) || 'Not specified'}`, margin + 5, currentY + 18);
      pdf.text(`Contact: ${cleanTextForPDF(formData.contactName) || 'Not specified'}`, margin + 5, currentY + 26);
      pdf.text(`Email: ${cleanTextForPDF(formData.email) || 'Not specified'}`, margin + 5, currentY + 34);
      if (formData.phone) pdf.text(`Phone: ${cleanTextForPDF(formData.phone)}`, margin + 5, currentY + 42);

      currentY += 60;

      // Investment Summary Box
      pdf.setFillColor(0, 120, 212);
      pdf.rect(margin, currentY, contentWidth, 35, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Total Annual Investment: $${costs.total.toLocaleString()}`, pageWidth / 2, currentY + 12, { align: 'center' });

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Monthly Equivalent: $${costs.monthly.toLocaleString()}`, pageWidth / 2, currentY + 22, { align: 'center' });
      pdf.text(`Professional Microsoft Fabric Solution`, pageWidth / 2, currentY + 30, { align: 'center' });

      // Start new page for content
      pdf.addPage();
      currentY = margin;

      // 1. EXECUTIVE SUMMARY
      addSectionHeader('EXECUTIVE SUMMARY');
      addSubSection('Business Goal', formData.businessGoal);
      addSubSection('Project Scope & Objectives', formData.projectScope);
      addSubSection('Expected Measurable Outcomes', formData.expectedOutcome);

      // 2. MICROSOFT FABRIC COMPONENTS
      addSectionHeader('MICROSOFT FABRIC COMPONENTS');
      const selectedFeatures = Object.keys(formData.features).filter(key => formData.features[key]);
      const featureNames = {
        lakehouse: 'Lakehouse & Data Warehouse - Unified data storage and management',
        realTimeAnalytics: 'Real-Time Analytics - Event streaming and live dashboards',
        aiMl: 'AI & Machine Learning - Model development and deployment',
        powerBi: 'Power BI & Visualization - Professional dashboards and reporting',
        security: 'Security & Compliance - Data governance and access control',
        customConfig: 'Custom Configuration - Industry-specific adaptations'
      };

      if (selectedFeatures.length > 0) {
        selectedFeatures.forEach(feature => {
          checkPageBreak(8);
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          const featureText = featureNames[feature] || feature;
          addWrappedText(`• ${featureText}`, margin + 5, currentY, contentWidth - 10, 10);
          currentY += 6;
        });
      }
      currentY += 10;

      // 3. DATA SOURCES & REQUIREMENTS
      addSectionHeader('DATA SOURCES & REQUIREMENTS');

      // Data Types
      const selectedDataTypes = Object.keys(formData.dataTypes).filter(key => formData.dataTypes[key]);
      const dataTypeNames = {
        structured: 'Structured Data (SQL databases, tables, CSV files)',
        semiStructured: 'Semi-Structured Data (JSON, XML, logs, APIs)',
        unstructured: 'Unstructured Data (Documents, images, videos, text)'
      };

      if (selectedDataTypes.length > 0) {
        pdf.setTextColor(0, 120, 212);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Data Types Required:', margin, currentY);
        currentY += 8;

        selectedDataTypes.forEach(type => {
          checkPageBreak(8);
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          pdf.text(`• ${dataTypeNames[type] || type}`, margin + 5, currentY);
          currentY += 6;
        });
        currentY += 5;
      }

      // Data Sources
      const selectedDataSources = Object.keys(formData.dataSources).filter(key => formData.dataSources[key]);
      const dataSourceNames = {
        sqlDatabases: 'SQL Databases (Azure SQL, PostgreSQL, MySQL, Oracle)',
        dataLakes: 'Data Lakes & Storage (Azure Data Lake, Blob Storage, ADLS)',
        erpCrm: 'Enterprise Systems (Salesforce, Dynamics 365, SAP, Oracle)',
        apis: 'APIs & Web Services (REST APIs, GraphQL, Microservices)',
        streaming: 'Streaming Data (Kafka, Event Hub, IoT, Real-time feeds)'
      };

      if (selectedDataSources.length > 0) {
        pdf.setTextColor(0, 120, 212);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Primary Data Sources:', margin, currentY);
        currentY += 8;

        selectedDataSources.forEach(source => {
          checkPageBreak(8);
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          pdf.text(`• ${dataSourceNames[source] || source}`, margin + 5, currentY);
          currentY += 6;
        });
        currentY += 5;
      }

      addSubSection('Data Volume', `${formData.dataVolume.charAt(0).toUpperCase() + formData.dataVolume.slice(1)} scale`);
      addSubSection('Data Refresh Frequency', formData.dataFrequency.replace(/([A-Z])/g, ' $1').trim());

      // Add new page for cost breakdown
      pdf.addPage();
      currentY = margin;

      // COMPREHENSIVE COST BREAKDOWN
      addSectionHeader('COMPREHENSIVE COST BREAKDOWN');

      // Cost breakdown table
      const tableY = currentY;

      // Table headers
      pdf.setFillColor(240, 240, 240);
      pdf.rect(margin, tableY, contentWidth, 8, 'F');
      pdf.setDrawColor(0, 0, 0);
      pdf.rect(margin, tableY, contentWidth, 8, 'S');

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Cost Category', margin + 2, tableY + 5);
      pdf.text('Annual Amount', margin + 80, tableY + 5);
      pdf.text('Description', margin + 130, tableY + 5);

      currentY = tableY + 8;

      // Table rows
      const costRows = [
        ['Infrastructure & Licensing', `$${costs.infrastructure.toLocaleString()}`, 'Microsoft Fabric capacity, Power BI, Azure services'],
        ['Implementation & Development', `$${costs.development.toLocaleString()}`, 'Solution architecture, development, testing, deployment'],
        ['Support & Maintenance', `$${costs.support.toLocaleString()}`, 'Ongoing support, monitoring, optimization, training'],
        ['TOTAL ANNUAL INVESTMENT', `$${costs.total.toLocaleString()}`, `Monthly Equivalent: $${costs.monthly.toLocaleString()}`]
      ];

      costRows.forEach((row, index) => {
        const isTotal = index === costRows.length - 1;
        if (isTotal) {
          pdf.setFillColor(0, 120, 212);
          pdf.rect(margin, currentY, contentWidth, 10, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setDrawColor(0, 0, 0);
          pdf.rect(margin, currentY, contentWidth, 8, 'S');
          pdf.setTextColor(0, 0, 0);
          pdf.setFont('helvetica', 'normal');
        }

        pdf.setFontSize(10);
        const rowHeight = isTotal ? 10 : 8;
        pdf.text(row[0], margin + 2, currentY + (rowHeight/2) + 1);
        pdf.text(row[1], margin + 80, currentY + (rowHeight/2) + 1);
        pdf.text(row[2], margin + 130, currentY + (rowHeight/2) + 1);
        currentY += rowHeight;
      });

      currentY += 20;

      // CONTACT INFORMATION & NEXT STEPS
      addSectionHeader('CONTACT INFORMATION & NEXT STEPS');

      pdf.setFillColor(250, 250, 250);
      pdf.rect(margin, currentY, contentWidth, 35, 'F');
      pdf.setDrawColor(0, 120, 212);
      pdf.rect(margin, currentY, contentWidth, 35, 'S');

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Primary Contact:', margin + 3, currentY + 8);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Name: ${cleanTextForPDF(formData.contactName)}`, margin + 3, currentY + 16);
      pdf.text(`Email: ${cleanTextForPDF(formData.email)}`, margin + 3, currentY + 22);
      pdf.text(`Company: ${cleanTextForPDF(formData.companyName)}`, margin + 3, currentY + 28);

      if (formData.phone) {
        pdf.text(`Phone: ${cleanTextForPDF(formData.phone)}`, margin + 100, currentY + 16);
      }
      if (formData.linkedIn) {
        pdf.text(`LinkedIn: ${cleanTextForPDF(formData.linkedIn)}`, margin + 100, currentY + 22);
      }

      currentY += 45;

      // Next Steps
      const nextSteps = `NEXT STEPS:

1. Review this comprehensive specification document
2. Assess technical requirements and scope alignment  
3. Prepare detailed proposal with timeline and costs
4. Schedule stakeholder presentation and Q&A session
5. Begin vendor selection process and contract negotiations

WHAT WE NEED FROM IMPLEMENTATION PARTNERS:
• Confirmation of interest and technical capability assessment
• Detailed project proposal with timeline and milestones  
• References from similar ${cleanTextForPDF(formData.industry)} implementations
• Proof of Microsoft Fabric certifications and expertise
• Support model and ongoing maintenance approach`;

      addWrappedText(nextSteps, margin, currentY, contentWidth, 9);

      // Footer with branding on every page
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        const footerY = pageHeight - 15;
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Generated by Microsoft Fabric MVP Calculator | https://fabric.m365calc.com', pageWidth / 2, footerY, { align: 'center' });
        pdf.text(`Document ID: ${cleanTextForPDF(formData.companyName).replace(/\s+/g, '_')}_FABRIC_MVP_${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')} | Page ${i} of ${totalPages}`, pageWidth / 2, footerY + 4, { align: 'center' });
      }

      // Save the PDF
      const fileName = `${cleanTextForPDF(formData.companyName).replace(/\s+/g, '_')}_Microsoft_Fabric_MVP_Complete_Specifications.pdf`;
      pdf.save(fileName);

      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateEmailTemplate = () => {
    const emailTemplate = `Subject: Microsoft Fabric MVP Implementation - Comprehensive RFP

Dear Microsoft Fabric Implementation Specialist,

I hope this message finds you well. I'm reaching out regarding a comprehensive Microsoft Fabric MVP implementation project for ${formData.companyName}, a ${formData.industry.toLowerCase()} organization.

PROJECT OVERVIEW:
We've completed an extensive requirements analysis using the Microsoft Fabric MVP Calculator (https://fabric.m365calc.com) and have prepared detailed specifications for our implementation.

KEY PROJECT HIGHLIGHTS:
• Business Objective: ${formData.businessGoal.substring(0, 200)}...
• Industry: ${formData.industry}
• Annual Investment: $${costs.total.toLocaleString()}
• Monthly Operational Cost: $${costs.monthly.toLocaleString()}
• Data Volume: ${formData.dataVolume} scale
• Geographic Scope: ${formData.geographic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}

MICROSOFT FABRIC SCOPE:
${Object.keys(formData.features).filter(key => formData.features[key]).map(key => {
  const features = {
    lakehouse: '✅ Lakehouse & Data Warehouse implementation',
    realTimeAnalytics: '✅ Real-Time Analytics & streaming capabilities',
    aiMl: '✅ AI & Machine Learning integration',
    powerBi: '✅ Power BI & advanced visualization',
    security: '✅ Security & compliance framework',
    customConfig: '✅ Custom configuration & development'
  };
  return features[key];
}).join('\n')}

INVESTMENT BREAKDOWN:
• Infrastructure & Licensing: $${costs.infrastructure.toLocaleString()}
• Implementation & Development: $${costs.development.toLocaleString()}
• Support & Maintenance: $${costs.support.toLocaleString()}
• TOTAL ANNUAL INVESTMENT: $${costs.total.toLocaleString()}

TECHNICAL REQUIREMENTS:
• Data Volume: ${formData.dataVolume} scale
• Environment: ${formData.environment || 'Cloud'} deployment
• Compute Resources: ${formData.computeResources} tier
• Geographic Scope: ${formData.geographic}

We're seeking a qualified Microsoft Fabric specialist who can deliver enterprise-grade implementation with comprehensive ongoing support.

WHAT WE NEED FROM YOU:
1. Confirmation of interest and availability for implementation
2. High-level technical assessment of our requirements
3. Estimated timeline for detailed proposal submission
4. References from similar ${formData.industry.toLowerCase()} implementations
5. Proof of Microsoft Fabric certifications and team expertise
6. Any clarifying questions about our comprehensive specifications

Thank you for your consideration. We look forward to potentially working together on this exciting Microsoft Fabric implementation.

Best regards,
${formData.contactName}
${formData.companyName}
${formData.email}
${formData.phone || ''}
${formData.linkedIn ? `LinkedIn: ${formData.linkedIn}` : ''}

---
PROJECT GENERATED USING: Microsoft Fabric MVP Calculator (https://fabric.m365calc.com)`;

    // Copy to clipboard
    navigator.clipboard.writeText(emailTemplate).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    });
  };

  const shareOnLinkedIn = () => {
    const text = `🚀 Just completed comprehensive Microsoft Fabric MVP specifications using the professional calculator!

📊 PROJECT SUMMARY:
• Company: ${formData.companyName}
• Industry: ${formData.industry}
• Total Annual Investment: $${costs.total.toLocaleString()}
• Monthly Cost: $${costs.monthly.toLocaleString()}

Looking for qualified Microsoft Fabric implementation specialists! Our comprehensive specifications are ready.

Try the free calculator: https://fabric.m365calc.com

#MicrosoftFabric #DataAnalytics #MVP #DigitalTransformation #TechLeadership #${formData.industry.replace(/\s+/g, '')}`;

    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = `🚀 Microsoft Fabric MVP specifications complete!

💰 Investment: $${costs.total.toLocaleString()}
📊 Industry: ${formData.industry}
⚡ Professional documentation ready

Free comprehensive calculator: https://fabric.m365calc.com

#MicrosoftFabric #DataAnalytics #MVP`;

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="border-t border-gray-200 pt-8">
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">
          📋 Generate Comprehensive PDF Specifications
        </h4>
        <p className="text-gray-600">
          Download a complete professional document with all requirements and cost analysis
        </p>
      </div>

      {/* Generate PDF Button */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={generateProfessionalPDF}
          disabled={isGenerating || isGenerated}
          whileHover={{ scale: isGenerated ? 1 : 1.05 }}
          whileTap={{ scale: isGenerated ? 1 : 0.95 }}
          className={`px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center space-x-3 ${
            isGenerated
              ? 'bg-green-500 cursor-default'
              : isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-fabric-blue to-fabric-purple hover:shadow-xl'
          }`}
        >
          {isGenerating ? (
            <>
              <SafeIcon icon={FiLoader} className="text-xl animate-spin" />
              <span>Generating Complete PDF...</span>
            </>
          ) : isGenerated ? (
            <>
              <SafeIcon icon={FiCheck} className="text-xl" />
              <span>Complete PDF Downloaded!</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiDownload} className="text-xl" />
              <span>Generate Complete PDF Specifications</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Email Template Section */}
      {isGenerated && (
        <div className="mb-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
            <SafeIcon icon={FiMail} className="mr-2 text-blue-600" />
            Professional Email Template for Implementation Specialists
          </h5>
          <p className="text-sm text-gray-600 mb-4">
            Copy this detailed email template that includes all your project requirements for Microsoft Fabric consultants
          </p>
          <div className="flex space-x-3">
            <motion.button
              onClick={generateEmailTemplate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                emailCopied
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <SafeIcon icon={emailCopied ? FiCheck : FiCopy} />
              <span>{emailCopied ? 'Copied to Clipboard!' : 'Copy Complete Email Template'}</span>
            </motion.button>
            <a
              href={`mailto:?subject=Microsoft Fabric MVP Implementation - Comprehensive RFP&body=Please find our detailed requirements in the attached comprehensive PDF specifications.`}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiExternalLink} />
              <span>Open Email Client</span>
            </a>
          </div>
        </div>
      )}

      {/* What's Included */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiFileText} className="mr-2 text-fabric-blue" />
          Your Complete PDF Includes:
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            '✅ Executive Summary & Business Objectives',
            '✅ Complete Microsoft Fabric Components',
            '✅ Data Sources & Integration Requirements', 
            '✅ Technical Specifications',
            '✅ Comprehensive Cost Breakdown Table',
            '✅ Contact Information & Next Steps',
            '✅ Professional Project Documentation',
            '✅ Implementation Requirements'
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Sharing */}
      <div className="border-t border-gray-200 pt-6">
        <h5 className="font-semibold text-gray-900 mb-4 text-center flex items-center justify-center">
          <SafeIcon icon={FiShare2} className="mr-2 text-fabric-blue" />
          Share Calculator & Attract Implementation Specialists
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            onClick={shareOnLinkedIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Share on LinkedIn</span>
          </motion.button>
          <motion.button
            onClick={shareOnTwitter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span>Share on X/Twitter</span>
          </motion.button>
          <motion.button
            onClick={shareOnFacebook}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span>Share on Facebook</span>
          </motion.button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Share the calculator to help others plan their Microsoft Fabric projects and attract qualified implementation specialists
        </p>
      </div>

      {/* Footer Attribution */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Generated by Microsoft Fabric MVP Calculator
        </p>
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
          <a
            href="https://fabric.m365calc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fabric-blue transition-colors"
          >
            https://fabric.m365calc.com
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/school/m365-show/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fabric-blue transition-colors"
          >
            Follow us on LinkedIn
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/m365-summit/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fabric-blue transition-colors"
          >
            Created by Mirko
          </a>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckGenerator;