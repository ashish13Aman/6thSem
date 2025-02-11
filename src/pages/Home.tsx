import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ActionCard } from '../components/home/ActionCard';
import { Upload, ShieldCheck, QrCode, FileCheck } from 'lucide-react';

const actionCards = [
  {
    title: 'Upload Documents',
    description: 'Securely upload and store your important documents in digital format',
    icon: Upload,
    bgImage: 'https://images.unsplash.com/photo-1614849963640-9cc74e4446af?auto=format&fit=crop&q=80'
  },
  {
    title: 'Verify Documents',
    description: 'Validate the authenticity of your digital documents instantly',
    icon: ShieldCheck,
    bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80'
  },
  {
    title: 'Scan QR Code',
    description: 'Quickly access documents by scanning their unique QR codes',
    icon: QrCode,
    bgImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80'
  },
  {
    title: 'Issued Documents',
    description: 'Access your officially issued documents and certificates',
    icon: FileCheck,
    bgImage: 'https://images.unsplash.com/photo-1568234928966-359c35dd8327?auto=format&fit=crop&q=80'
  }
];

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Banner */}
          <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
              alt="Digital Security"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/50" />
            <div className="relative h-full flex flex-col justify-center px-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to SecureDigiVault
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                Your trusted platform for secure digital document storage and verification
              </p>
            </div>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actionCards.map((card) => (
              <ActionCard
                key={card.title}
                {...card}
                onClick={() => console.log(`Clicked: ${card.title}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}