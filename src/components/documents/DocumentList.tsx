import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  ChevronDown,
  Search,
  Filter
} from 'lucide-react';
import { Document, DocumentStatus } from '../../types/document';

interface DocumentListProps {
  documents: Document[];
  onStatusChange?: (id: string, status: DocumentStatus, reason?: string) => void;
  isAdmin?: boolean;
}

export function DocumentList({ documents, onStatusChange, isAdmin }: DocumentListProps) {
  const [filter, setFilter] = useState<DocumentStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const filteredDocs = documents
    .filter((doc) => {
      if (filter === 'all') return true;
      return doc.status === filter;
    })
    .filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
    verified: <CheckCircle className="h-5 w-5 text-green-500" />,
    rejected: <XCircle className="h-5 w-5 text-red-500" />
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-white">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-2 space-y-1">
              {['all', 'pending', 'verified', 'rejected'].map((status) => (
                <button
                  key={status}
                  className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
                    filter === status
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setFilter(status as DocumentStatus | 'all')}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <select
            className="px-4 py-2 border rounded-lg bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className={`p-4 hover:bg-gray-50 ${
                selectedDoc === doc.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {statusIcons[doc.status]}
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      Uploaded on{' '}
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {isAdmin && doc.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        onStatusChange?.(doc.id, 'verified')
                      }
                      className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setSelectedDoc(doc.id)}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
              {selectedDoc === doc.id && (
                <div className="mt-4 space-y-4">
                  <textarea
                    placeholder="Enter rejection reason..."
                    className="w-full p-2 border rounded-lg"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setSelectedDoc(null);
                        setRejectionReason('');
                      }}
                      className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onStatusChange?.(doc.id, 'rejected', rejectionReason);
                        setSelectedDoc(null);
                        setRejectionReason('');
                      }}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}
              {doc.status === 'rejected' && doc.rejectionReason && (
                <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
                  Rejection reason: {doc.rejectionReason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}