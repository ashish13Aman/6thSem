import React, { useState } from 'react';
import { X, Copy, Check, AlertCircle, Shield, Key, Share2, Loader2 } from 'lucide-react';
import { ethers } from 'ethers';
import { box, randomBytes } from 'tweetnacl';
import { encodeBase64, decodeBase64 } from 'tweetnacl-util';

interface ShareDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    name: string;
    status: string;
    hash?: string;
  };
}

export default function ShareDocumentModal({ isOpen, onClose, document }: ShareDocumentModalProps) {
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Mock blockchain hash for demo
  const documentHash = document.hash || ethers.keccak256(ethers.toUtf8Bytes(document.name + Date.now()));

  const handleShare = async () => {
    if (!receiverPublicKey) {
      setError('Please enter receiver\'s public key');
      return;
    }

    try {
      setIsProcessing(true);
      setError('');

      // Generate a random keypair for the sender
      const senderKeypair = box.keyPair();
      
      // Convert receiver's public key from hex to Uint8Array
      const receiverPubKey = decodeBase64(receiverPublicKey);

      // Generate a one-time nonce
      const nonce = randomBytes(box.nonceLength);

      // Encrypt the document hash
      const messageUint8 = new TextEncoder().encode(documentHash);
      const encryptedMessage = box(
        messageUint8,
        nonce,
        receiverPubKey,
        senderKeypair.secretKey
      );

      // Convert encrypted message to base64 for transmission
      const encryptedBase64 = encodeBase64(encryptedMessage);

      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setReceiverPublicKey('');
      }, 2000);
    } catch (err) {
      setError('Failed to share document. Please check the public key and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isOpen) return null;

  if (document.status !== 'verified') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Cannot Share Document</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg mb-6">
            <AlertCircle className="text-red-500" size={24} />
            <div>
              <h4 className="font-medium text-red-800">Document Not Verified</h4>
              <p className="text-sm text-red-600">This document needs to be verified before it can be shared.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Share Document via Blockchain</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Document Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="text-blue-600 mt-1" size={24} />
              <div>
                <h4 className="font-medium text-blue-900">Verified Document</h4>
                <p className="text-sm text-blue-700">{document.name}</p>
              </div>
            </div>
          </div>

          {/* Blockchain Hash */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Hash (Blockchain)
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-100 p-3 rounded-lg text-sm font-mono break-all">
                {documentHash}
              </code>
              <button
                onClick={() => copyToClipboard(documentHash)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copy hash"
              >
                {copySuccess ? (
                  <Check size={20} className="text-green-500" />
                ) : (
                  <Copy size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Receiver's Public Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receiver's Public Key
            </label>
            <div className="relative">
              <Key size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={receiverPublicKey}
                onChange={(e) => setReceiverPublicKey(e.target.value)}
                placeholder="Enter receiver's public key"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={16} />
                {error}
              </p>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 mt-1" size={20} />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Security Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  The document will be encrypted using the receiver's public key. Only the receiver
                  will be able to decrypt it using their private key.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={handleShare}
            disabled={isProcessing || isSuccess}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
              transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
          >
            {isProcessing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing Transaction...
              </>
            ) : isSuccess ? (
              <>
                <Check size={20} />
                Document Shared Successfully
              </>
            ) : (
              <>
                <Share2 size={20} />
                Confirm & Share Document
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}