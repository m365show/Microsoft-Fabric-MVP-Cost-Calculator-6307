import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { 
  FiUsers, FiCheck, FiX, FiEdit, FiEye, FiSearch, FiFilter, 
  FiCalendar, FiMail, FiPhone, FiGlobe, FiMapPin, FiBriefcase,
  FiSave, FiRefreshCw, FiTrash2, FiAlertTriangle, FiSettings
} = FiIcons;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingPartner, setEditingPartner] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Admin password (in production, use proper authentication)
  const ADMIN_PASSWORD = 'fabric2025admin';

  useEffect(() => {
    if (isAuthenticated) {
      fetchPartners();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterPartners();
  }, [partners, searchQuery, statusFilter]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const fetchPartners = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const filterPartners = () => {
    let filtered = partners;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(query) ||
        partner.email.toLowerCase().includes(query) ||
        (partner.company && partner.company.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(partner => {
        if (statusFilter === 'approved') return partner.approved;
        if (statusFilter === 'pending') return !partner.approved;
        return true;
      });
    }

    setFilteredPartners(filtered);
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

  const handleEdit = (partner) => {
    setEditingPartner({ ...partner });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const { error } = await supabase
        .from('partners_fabric_2025')
        .update({
          name: editingPartner.name,
          company: editingPartner.company,
          email: editingPartner.email,
          linkedin: editingPartner.linkedin,
          website: editingPartner.website,
          partner_type: editingPartner.partner_type,
          bio: editingPartner.bio,
          region: editingPartner.region,
          industry: editingPartner.industry,
          logo_url: editingPartner.logo_url,
          services: editingPartner.services,
          languages: editingPartner.languages,
          availability: editingPartner.availability,
          pricing_model: editingPartner.pricing_model
        })
        .eq('id', editingPartner.id);

      if (error) {
        console.error('Error updating partner:', error);
        alert('Error updating partner');
      } else {
        fetchPartners();
        setShowEditModal(false);
        setEditingPartner(null);
        alert('Partner updated successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating partner');
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 w-full max-w-md">
          <div className="text-center mb-6">
            <SafeIcon icon={FiSettings} className="text-4xl text-fabric-blue mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Enter admin password to access partner management</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
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
            <h1 className="text-3xl font-bold text-gray-900">Partner Management</h1>
            <p className="text-gray-600">Manage Microsoft Fabric partner applications and profiles</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchPartners}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-fabric-blue text-white rounded-lg hover:bg-fabric-dark transition-colors disabled:opacity-50"
            >
              <SafeIcon icon={loading ? FiRefreshCw : FiRefreshCw} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
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
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{partners.filter(p => p.approved).length}</p>
              </div>
              <SafeIcon icon={FiCheck} className="text-2xl text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{partners.filter(p => !p.approved).length}</p>
              </div>
              <SafeIcon icon={FiAlertTriangle} className="text-2xl text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-fabric-blue">
                  {partners.filter(p => {
                    const createdAt = new Date(p.created_at);
                    const now = new Date();
                    return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <SafeIcon icon={FiCalendar} className="text-2xl text-fabric-blue" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search partners by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-500" />
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
          </div>
        </div>

        {/* Partners List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <SafeIcon icon={FiRefreshCw} className="text-4xl text-gray-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading partners...</p>
            </div>
          ) : filteredPartners.length === 0 ? (
            <div className="p-12 text-center">
              <SafeIcon icon={FiUsers} className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No partners found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type & Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                          <button
                            onClick={() => handleEdit(partner)}
                            className="text-fabric-blue hover:text-fabric-dark transition-colors"
                            title="Edit"
                          >
                            <SafeIcon icon={FiEdit} />
                          </button>
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
          )}
        </div>

        {/* Edit Modal */}
        {showEditModal && editingPartner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Edit Partner</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editingPartner.name}
                      onChange={(e) => setEditingPartner(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={editingPartner.company || ''}
                      onChange={(e) => setEditingPartner(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editingPartner.email}
                      onChange={(e) => setEditingPartner(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Partner Type</label>
                    <select
                      value={editingPartner.partner_type}
                      onChange={(e) => setEditingPartner(prev => ({ ...prev, partner_type: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue"
                    >
                      <option value="Freelancer">Freelancer</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Solution Provider">Solution Provider</option>
                      <option value="Microsoft Gold Partner">Microsoft Gold Partner</option>
                      <option value="Microsoft Silver Partner">Microsoft Silver Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
                    <select
                      value={editingPartner.region}
                      onChange={(e) => setEditingPartner(prev => ({ ...prev, region: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue"
                    >
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                      <option value="Latin America">Latin America</option>
                      <option value="Middle East & Africa">Middle East & Africa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                    <input
                      type="text"
                      value={editingPartner.industry}
                      onChange={(e) => setEditingPartner(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={editingPartner.bio}
                    onChange={(e) => setEditingPartner(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fabric-blue h-24"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-fabric-blue text-white rounded-lg hover:bg-fabric-dark transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiSave} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;