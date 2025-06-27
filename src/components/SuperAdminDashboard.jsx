import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { FiUsers, FiCheck, FiX, FiEdit, FiEye, FiSearch, FiFilter, FiCalendar, FiMail, FiPhone, FiGlobe, FiMapPin, FiBriefcase, FiSave, FiRefreshCw, FiTrash2, FiAlertTriangle, FiSettings, FiDatabase, FiBarChart, FiShield, FiLogOut, FiKey, FiLock, FiCpu, FiActivity } = FiIcons;

const SuperAdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('partners');
  const [loading, setLoading] = useState(false);

  // Partners data
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingPartner, setEditingPartner] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Calculator submissions data
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [submissionFilter, setSubmissionFilter] = useState('all');
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  // Contact inquiries data
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contactSearch, setContactSearch] = useState('');
  const [contactFilter, setContactFilter] = useState('all');

  // Admin credentials
  const ADMIN_EMAIL = 'mirko.peters@m365.show';
  const ADMIN_PASSWORD = 'Bierjunge123!';

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterPartners();
  }, [partners, searchQuery, statusFilter]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, submissionSearch, submissionFilter]);

  useEffect(() => {
    filterContacts();
  }, [contacts, contactSearch, contactFilter]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchPartners(),
        fetchSubmissions(),
        fetchContacts()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners_fabric_2025')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partners:', error);
      } else {
        setPartners(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('calculator_submissions_fabric_2025')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries_2025')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filterPartners = () => {
    let filtered = partners;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(query) ||
        partner.email.toLowerCase().includes(query) ||
        (partner.company && partner.company.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(partner => {
        if (statusFilter === 'approved') return partner.approved;
        if (statusFilter === 'pending') return !partner.approved;
        return true;
      });
    }

    setFilteredPartners(filtered);
  };

  const filterSubmissions = () => {
    let filtered = submissions;

    if (submissionSearch) {
      const query = submissionSearch.toLowerCase();
      filtered = filtered.filter(submission =>
        submission.company_name.toLowerCase().includes(query) ||
        submission.contact_name.toLowerCase().includes(query) ||
        submission.email.toLowerCase().includes(query)
      );
    }

    setFilteredSubmissions(filtered);
  };

  const filterContacts = () => {
    let filtered = contacts;

    if (contactSearch) {
      const query = contactSearch.toLowerCase();
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        (contact.company && contact.company.toLowerCase().includes(query))
      );
    }

    setFilteredContacts(filtered);
  };

  const handleApprove = async (partnerId) => {
    try {
      const { error } = await supabase
        .from('partners_fabric_2025')
        .update({ approved: true })
        .eq('id', partnerId);

      if (error) {
        console.error('Error approving partner:', error);
        alert('Error approving partner');
      } else {
        fetchPartners();
        alert('Partner approved successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error approving partner');
    }
  };

  const handleReject = async (partnerId) => {
    if (window.confirm('Are you sure you want to reject this partner?')) {
      try {
        const { error } = await supabase
          .from('partners_fabric_2025')
          .update({ approved: false })
          .eq('id', partnerId);

        if (error) {
          console.error('Error rejecting partner:', error);
          alert('Error rejecting partner');
        } else {
          fetchPartners();
          alert('Partner rejected successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error rejecting partner');
      }
    }
  };

  const handleDelete = async (partnerId) => {
    if (window.confirm('Are you sure you want to delete this partner? This action cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('partners_fabric_2025')
          .delete()
          .eq('id', partnerId);

        if (error) {
          console.error('Error deleting partner:', error);
          alert('Error deleting partner');
        } else {
          fetchPartners();
          alert('Partner deleted successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting partner');
      }
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 w-full max-w-md">
          <div className="text-center mb-6">
            <SafeIcon icon={FiShield} className="text-4xl text-fabric-blue mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <p className="text-gray-600">Enter admin credentials to access full system management</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={ADMIN_EMAIL}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-fabric-blue text-white py-3 font-semibold rounded-lg hover:bg-fabric-dark transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <p className="text-gray-600">Comprehensive system management and analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-fabric-blue text-white rounded-lg hover:bg-fabric-dark transition-colors disabled:opacity-50"
            >
              <SafeIcon icon={loading ? FiRefreshCw : FiRefreshCw} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiLogOut} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Partners</p>
                <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
              </div>
              <SafeIcon icon={FiUsers} className="text-2xl text-fabric-blue" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">MVP Submissions</p>
                <p className="text-2xl font-bold text-purple-600">{submissions.length}</p>
              </div>
              <SafeIcon icon={FiBarChart} className="text-2xl text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contact Inquiries</p>
                <p className="text-2xl font-bold text-green-600">{contacts.length}</p>
              </div>
              <SafeIcon icon={FiMail} className="text-2xl text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-orange-600">
                  {partners.filter(p => !p.approved).length}
                </p>
              </div>
              <SafeIcon icon={FiAlertTriangle} className="text-2xl text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'partners', label: 'Partner Management', icon: FiUsers },
                { key: 'submissions', label: 'MVP Submissions', icon: FiBarChart },
                { key: 'contacts', label: 'Contact Inquiries', icon: FiMail },
                { key: 'analytics', label: 'Analytics', icon: FiActivity }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-fabric-blue text-fabric-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <SafeIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Partners Tab */}
            {activeTab === 'partners' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search partners..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                {/* Partners Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type & Region</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPartners.map((partner) => (
                        <tr key={partner.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {partner.logo_url ? (
                                <img
                                  src={partner.logo_url}
                                  alt={partner.name}
                                  className="h-10 w-10 rounded-full object-cover mr-3"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-fabric-blue flex items-center justify-center mr-3">
                                  <span className="text-white font-semibold">{partner.name.charAt(0)}</span>
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                                {partner.company && (
                                  <div className="text-sm text-gray-500">{partner.company}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{partner.email}</div>
                            <div className="text-sm text-gray-500">{partner.industry}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{partner.partner_type}</div>
                            <div className="text-sm text-gray-500">{partner.region}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              partner.approved 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {partner.approved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(partner.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              {!partner.approved ? (
                                <button
                                  onClick={() => handleApprove(partner.id)}
                                  className="text-green-600 hover:text-green-800 transition-colors"
                                  title="Approve"
                                >
                                  <SafeIcon icon={FiCheck} />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleReject(partner.id)}
                                  className="text-orange-600 hover:text-orange-800 transition-colors"
                                  title="Reject"
                                >
                                  <SafeIcon icon={FiX} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(partner.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                                title="Delete"
                              >
                                <SafeIcon icon={FiTrash2} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === 'submissions' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search submissions..."
                        value={submissionSearch}
                        onChange={(e) => setSubmissionSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{submission.company_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{submission.contact_name}</div>
                            <div className="text-sm text-gray-500">{submission.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{submission.industry}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">
                              {submission.calculated_costs 
                                ? `$${submission.calculated_costs.total?.toLocaleString() || 'N/A'}`
                                : 'N/A'
                              }
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                setViewingSubmission(submission);
                                setShowSubmissionModal(true);
                              }}
                              className="text-fabric-blue hover:text-fabric-dark transition-colors"
                              title="View Details"
                            >
                              <SafeIcon icon={FiEye} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={contactSearch}
                        onChange={(e) => setContactSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inquiry Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.company || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.inquiry_type || 'General'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Growth</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{partners.length}</div>
                    <div className="text-sm text-gray-600">Total Partners</div>
                    <div className="text-sm text-green-600 mt-2">
                      +{partners.filter(p => {
                        const createdAt = new Date(p.created_at);
                        const thirtyDaysAgo = new Date();
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        return createdAt > thirtyDaysAgo;
                      }).length} this month
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">MVP Calculations</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{submissions.length}</div>
                    <div className="text-sm text-gray-600">Total Submissions</div>
                    <div className="text-sm text-green-600 mt-2">
                      +{submissions.filter(s => {
                        const createdAt = new Date(s.created_at);
                        const thirtyDaysAgo = new Date();
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        return createdAt > thirtyDaysAgo;
                      }).length} this month
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Revenue Potential</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ${submissions.reduce((total, submission) => {
                        return total + (submission.calculated_costs?.total || 0);
                      }, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">From MVP Submissions</div>
                  </div>
                </div>

                {/* Industry Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(
                      submissions.reduce((acc, submission) => {
                        const industry = submission.industry || 'Other';
                        acc[industry] = (acc[industry] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([industry, count]) => (
                      <div key={industry} className="flex items-center justify-between">
                        <span className="text-gray-700">{industry}</span>
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-200 rounded-full h-2 w-32">
                            <div 
                              className="bg-fabric-blue h-2 rounded-full" 
                              style={{ width: `${(count / submissions.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submission Details Modal */}
        {showSubmissionModal && viewingSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">MVP Submission Details</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Company Information</h4>
                    <p><strong>Company:</strong> {viewingSubmission.company_name}</p>
                    <p><strong>Contact:</strong> {viewingSubmission.contact_name}</p>
                    <p><strong>Email:</strong> {viewingSubmission.email}</p>
                    <p><strong>Industry:</strong> {viewingSubmission.industry}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
                    <p><strong>Business Goal:</strong> {viewingSubmission.business_goal}</p>
                    <p><strong>Data Volume:</strong> {viewingSubmission.data_volume}</p>
                    <p><strong>Compute:</strong> {viewingSubmission.compute_resources}</p>
                    <p><strong>Geographic:</strong> {viewingSubmission.geographic}</p>
                  </div>
                </div>

                {viewingSubmission.calculated_costs && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cost Breakdown</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Infrastructure</p>
                        <p className="text-lg font-bold text-blue-600">
                          ${viewingSubmission.calculated_costs.infrastructure?.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Development</p>
                        <p className="text-lg font-bold text-purple-600">
                          ${viewingSubmission.calculated_costs.development?.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Support</p>
                        <p className="text-lg font-bold text-green-600">
                          ${viewingSubmission.calculated_costs.support?.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${viewingSubmission.calculated_costs.total?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;