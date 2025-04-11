import React, { useState } from 'react';
import { Search, Download, Eye, Shield, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface SharedDocument {
  id: string;
  sharedBy: string;
  documentName: string;
  ipfsCID: string;
  status: 'Verified' | 'Pending' | 'Invalid';
  timestamp: string;
  fileType: string;
  fileSize: string;
}

const mockSharedDocs: SharedDocument[] = [
  {
    id: '1',
    sharedBy: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    documentName: 'University_Transcript_2024.pdf',
    ipfsCID: 'QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdw8W1a',
    status: 'Verified',
    timestamp: '2025-04-10 10:00 AM',
    fileType: 'PDF',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    sharedBy: '0x1234567890123456789012345678901234567890',
    documentName: 'Employment_Certificate.pdf',
    ipfsCID: 'QmX7b7bNvqpfc7G6K2EnUC5xZ9WYs9MKPWeF1VBJhLuYX1',
    status: 'Pending',
    timestamp: '2025-04-09 15:30 PM',
    fileType: 'PDF',
    fileSize: '1.8 MB'
  },
  {
    id: '3',
    sharedBy: '0x9876543210987654321098765432109876543210',
    documentName: 'Medical_Records_2024.pdf',
    ipfsCID: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    status: 'Invalid',
    timestamp: '2025-04-08 09:15 AM',
    fileType: 'PDF',
    fileSize: '3.1 MB'
  }
];

const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function SharedWithMe() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Verified' | 'Pending' | 'Invalid'>('all');

  const filteredDocs = mockSharedDocs.filter(doc => {
    const matchesSearch = doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.sharedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: SharedDocument['status']) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'Pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'Invalid':
        return <AlertCircle className="text-red-500" size={20} />;
    }
  };

  const getStatusBadge = (status: SharedDocument['status']) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2";
    switch (status) {
      case 'Verified':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'Invalid':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Documents Shared With Me</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search documents or addresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white 
                dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Invalid">Invalid</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900">
                      <Shield className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {doc.documentName}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Shared by:</span>
                        <a
                          href={`https://etherscan.io/address/${doc.sharedBy}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {truncateAddress(doc.sharedBy)}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <span className={getStatusBadge(doc.status)}>
                          {getStatusIcon(doc.status)}
                          {doc.status}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {doc.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Type: {doc.fileType}</span>
                    <span>Size: {doc.fileSize}</span>
                    <a
                      href={`https://ipfs.io/ipfs/${doc.ipfsCID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      IPFS Link
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                      rounded-lg transition-colors"
                    title="View Document"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                      rounded-lg transition-colors"
                    title="Download Document"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredDocs.length === 0 && (
            <div className="text-center py-12">
              <Shield className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No documents found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No shared documents match your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}