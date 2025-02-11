import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  bgImage: string;
  onClick: () => void;
}

export function ActionCard({ title, description, icon: Icon, bgImage, onClick }: ActionCardProps) {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90 z-10" />
      <img
        src={bgImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 p-6 h-full flex flex-col">
        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-6">{description}</p>
        <div className="mt-auto">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-blue-50 group-hover:shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}