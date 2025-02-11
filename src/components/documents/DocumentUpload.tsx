import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { DocumentType } from '../../types/document';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && allowedTypes.includes(file.type)) {
      handleFile(file);
    }
  }, []);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      setPreview(null);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="h-12 w-12 text-gray-400" />
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Drag and drop your document here
            </p>
            <p className="text-sm text-gray-500">
              or{' '}
              <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                browse files
                <input
                  type="file"
                  className="hidden"
                  accept={allowedTypes.join(',')}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </label>
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Supported formats: PDF, PNG, JPEG (up to 10MB)
          </p>
        </div>
      </div>

      {selectedFile && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500 uppercase">
                      {selectedFile.name.split('.').pop()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}