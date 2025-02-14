import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, Check, Loader2, Share2, Filter, ChevronDown, Eye, Clock, XCircle, CheckCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  uploadedDate: string;
  status: 'verified' | 'not-verified' | 'e-signed' | 'rejected' | 'pending';
  type: string;
  uri?: string;
  feedback?: string;
  progress?: number;
}

export default function UploadedDocuments() {
  const [showModal, setShowModal] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const documentTypes = [
    'Identity Proof',
    'Address Proof',
    'Educational Certificate',
    'Professional Certificate',
    'Other Documents'
  ];

  const departmentDocuments: Document[] = [
    {
      id: '1',
      name: 'Senior Certificate',
      uploadedDate: '04/07/2015',
      status: 'verified',
      type: 'Educational Certificate',
      uri: 'in.gov.mahashline-SECER-145164156125510004275'
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'My Test Document',
      uploadedDate: '15/05/2015',
      status: 'pending',
      type: 'Identity Proof',
      progress: 70
    },
    {
      id: '2',
      name: 'Experience Award',
      uploadedDate: '15/05/2015',
      status: 'rejected',
      type: 'Professional Certificate',
      feedback: 'Document is not clearly visible. Please upload a better quality scan.'
    },
    {
      id: '3',
      name: 'Award',
      uploadedDate: '15/05/2015',
      status: 'verified',
      type: 'Other Documents'
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!documentType) {
      newErrors.documentType = 'Please select a document type';
    }
    
    if (!selectedFile) {
      newErrors.file = 'Please select a file to upload';
    } else if (selectedFile.size > 1024 * 1024) {
      newErrors.file = 'File size must be less than 1MB';
    }
    
    if (!description) {
      newErrors.description = 'Please enter a description';
    } else if (description.length > 50) {
      newErrors.description = 'Description must be less than 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setShowModal(false);
      setDocumentType('');
      setSelectedFile(null);
      setDescription('');
      setPreviewUrl(null);
      setUploadProgress(0);
    }, 2000);
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'not-verified':
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'e-signed':
        return <Check className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'not-verified':
        return 'Not Verified';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending Verification';
      case 'e-signed':
        return 'e-Signed';
      default:
        return status;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (filter === 'all') return true;
    return doc.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Department Issued Documents */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Department Issued Documents</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentDocuments.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={20} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <a href="#">{doc.uri}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(doc.status)}
                      <span className="ml-2 text-sm text-gray-500">{getStatusText(doc.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Share2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Self Uploaded Documents */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Self Uploaded Documents</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Filter size={20} />
                Filter by Status
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                <button
                  onClick={() => setFilter('all')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                >
                  All Documents
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                >
                  Pending Verification
                </button>
                <button
                  onClick={() => setFilter('verified')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                >
                  Verified
                </button>
                <button
                  onClick={() => setFilter('rejected')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                >
                  Rejected
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Upload size={20} />
              Upload Documents
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={20} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {getStatusIcon(doc.status)}
                        <span className="ml-2 text-sm text-gray-500">{getStatusText(doc.status)}</span>
                      </div>
                      {doc.status === 'pending' && doc.progress !== undefined && (
                        <div className="mt-2 w-32">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${doc.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {doc.status === 'rejected' && doc.feedback && (
                        <p className="mt-1 text-xs text-red-500">{doc.feedback}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      <Eye size={20} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Share2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Upload Document</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className={`w-full rounded-lg border ${errors.documentType ? 'border-red-500' : 'border-gray-300'} 
                      px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select document type</option>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.documentType && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.documentType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Document
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-4 
                    ${errors.file ? 'border-red-500' : 'border-gray-300'}`}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,application/pdf"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        {selectedFile ? selectedFile.name : 'Click to upload (Max: 1MB)'}
                      </span>
                    </label>
                  </div>
                  {errors.file && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.file}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={50}
                    placeholder="Enter document description"
                    className={`w-full rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} 
                      px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <div className="mt-1 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{description.length}/50 characters</span>
                    {errors.description && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                {uploadProgress > 0 && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Upload Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-l border-gray-200 pl-6">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Document Preview</h4>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Document preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Eye size={48} className="mx-auto mb-2" />
                      <p>Preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <button
                onClick={handleUpload}
                disabled={isLoading || isSuccess}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                  transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Uploading...
                  </>
                ) : isSuccess ? (
                  <>
                    <Check size={20} />
                    Uploaded Successfully
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Upload Document
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}