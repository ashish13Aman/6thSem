import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Settings,
  Sun,
  Moon,
  AlertCircle,
  ChevronRight,
  Eye,
  CheckSquare,
  XSquare,
  Loader2,
  Filter,
  Download,
  MoreVertical,
  Info
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  submittedDate: string;
  status: 'pending' | 'verified' | 'rejected';
  blockId?: string;
  userId: string;
  userEmail: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Birth_Certificate_2024.pdf',
    type: 'Identity Document',
    submittedDate: '2024-03-10',
    status: 'pending',
    userId: 'USER123',
    userEmail: 'john.doe@example.com'
  },
  {
    id: '2',
    name: 'Degree_Certificate.pdf',
    type: 'Educational Document',
    submittedDate: '2024-03-09',
    status: 'verified',
    blockId: '0x7f9c9f6c8d4b2a1e3d5f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7',
    userId: 'USER124',
    userEmail: 'jane.smith@example.com'
  },
  {
    id: '3',
    name: 'Property_Deed.pdf',
    type: 'Legal Document',
    submittedDate: '2024-03-08',
    status: 'rejected',
    userId: 'USER125',
    userEmail: 'mike.wilson@example.com'
  }
];

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'search' | 'settings'>('pending');
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [blockIdSearch, setBlockIdSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleVerifyDocument = async (docId: string) => {
    // Simulate blockchain verification
    const updatedDocs = documents.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: 'verified' as const,
          blockId: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
        };
      }
      return doc;
    });
    setDocuments(updatedDocs);
    setShowDocumentModal(false);
  };

  const handleRejectDocument = async (docId: string) => {
    const updatedDocs = documents.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: 'rejected' as const
        };
      }
      return doc;
    });
    setDocuments(updatedDocs);
    setShowDocumentModal(false);
  };

  const handleBlockIdSearch = async () => {
    if (!blockIdSearch.trim()) {
      setSearchError('Please enter a Block ID');
      return;
    }

    setIsSearching(true);
    setSearchError('');

    // Simulate blockchain search
    setTimeout(() => {
      const found = documents.find(doc => doc.blockId === blockIdSearch);
      if (!found) {
        setSearchError('No matching Block ID found');
      } else {
        setSelectedDocument(found);
        setShowDocumentModal(true);
      }
      setIsSearching(false);
    }, 1500);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
    }
  };

  const getStatusBadge = (status: Document['status']) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2";
    switch (status) {
      case 'verified':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
    }
  };

  const navItems = [
    { id: 'pending' as const, icon: Clock, label: 'Pending Documents' },
    { id: 'verified' as const, icon: CheckCircle, label: 'Verified Documents' },
    { id: 'search' as const, icon: Search, label: 'Search by Block ID' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`w-64 h-screen fixed left-0 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="text-blue-600" size={24} />
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                SecureDoc Admin 
              </h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {navItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Manage and verify user documents
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          {activeTab !== 'search' && activeTab !== 'settings' && (
            <div className="mb-6 flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search documents or users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeTab === 'search' ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Enter Block ID
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={blockIdSearch}
                        onChange={(e) => setBlockIdSearch(e.target.value)}
                        placeholder="Enter blockchain ID to verify document..."
                        className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300'
                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    {searchError && (
                      <p className="mt-2 text-red-500 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {searchError}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleBlockIdSearch}
                    disabled={isSearching}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 
                      transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={20} />
                        Search Blockchain
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : activeTab === 'settings' ? (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Appearance
                    </h3>
                    <div className="mt-4">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={(e) => setDarkMode(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          Dark Mode
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Notifications
                    </h3>
                    <div className="mt-4 space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          Email notifications for new document submissions
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          Desktop notifications for urgent verifications
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="documents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-6"
              >
                {filteredDocuments.map((doc) => (
                  <motion.div
                    key={doc.id}
                    layoutId={doc.id}
                    className={`p-6 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FileText className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {doc.name}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {doc.type}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className={getStatusBadge(doc.status)}>
                              {getStatusIcon(doc.status)}
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowDocumentModal(true);
                          }}
                          className={`p-2 rounded-lg ${
                            darkMode
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          } transition-colors`}
                        >
                          <Eye size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                        </button>
                      </div>
                    </div>
                    <div className={`mt-4 pt-4 border-t ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Submitted by: {doc.userEmail}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(doc.submittedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Document Modal */}
      <AnimatePresence>
        {showDocumentModal && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-2xl w-full rounded-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-xl overflow-hidden`}
            >
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Document Details
                  </h3>
                  <button
                    onClick={() => setShowDocumentModal(false)}
                    className={`p-2 rounded-lg ${
                      darkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    } transition-colors`}
                  >
                    <XCircle size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Document Name
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedDocument.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Document Type
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedDocument.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Submitted By
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedDocument.userEmail}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Submission Date
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {new Date(selectedDocument.submittedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </span>
                    <span className={getStatusBadge(selectedDocument.status)}>
                      {getStatusIcon(selectedDocument.status)}
                      {selectedDocument.status.charAt(0).toUpperCase() + selectedDocument.status.slice(1)}
                    </span>
                  </div>
                  {selectedDocument.blockId && (
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Block ID
                      </span>
                      <span className={`font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedDocument.blockId}
                      </span>
                    </div>
                  )}
                </div>

                {selectedDocument.status === 'pending' && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleVerifyDocument(selectedDocument.id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 
                        transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckSquare size={20} />
                      Verify Document
                    </button>
                    <button
                      onClick={() => handleRejectDocument(selectedDocument.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 
                        transition-colors flex items-center justify-center gap-2"
                    >
                      <XSquare size={20} />
                      Reject Document
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}