import React from "react";
import { X, Users, FileCheck, Download, Shield, Share2 } from "lucide-react";

interface AboutModalProps {
  onClose: () => void;
}

const stats = [
  { icon: Users, label: "Registered Users", value: "10M+" },
  { icon: FileCheck, label: "Documents Issued", value: "50M+" },
  { icon: Download, label: "Downloads", value: "100M+" },
];

const processSteps = [
  {
    icon: Users,
    title: "Register Yourself",
    description: "Create your SecuredDoc Wallet account in minutes",
  },
  {
    icon: Shield,
    title: "Verify Your Identity",
    description: "Secure verification process for your protection",
  },
  {
    icon: FileCheck,
    title: "Access Documents",
    description: "Instantly access your verified documents",
  },
];

export default function About({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-modal bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">About SecuredDoc Wallet</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Your Digital Document Platform</h3>
            <p className="text-gray-600 leading-relaxed">
              SecuredDoc Wallet is a premier digital platform for document storage, sharing, and verification...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <stat.icon size={32} className="mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-200">
                  <step.icon size={32} className="text-blue-600 mb-4" />
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Why Choose SecuredDoc Wallet?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Shield className="text-blue-600 mr-3" size={20} />
                <span className="text-gray-700">Secure, encrypted storage</span>
              </li>
              <li className="flex items-center">
                <FileCheck className="text-blue-600 mr-3" size={20} />
                <span className="text-gray-700">Verified authentic documents</span>
              </li>
              <li className="flex items-center">
                <Share2 className="text-blue-600 mr-3" size={20} />
                <span className="text-gray-700">Easy sharing with others</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
