import React from 'react';
import { Heart, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-2xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BlogSphere
            </h3>
          </div>
          
          <p className="text-gray-300 leading-relaxed mb-8">
            A creative sanctuary where developers, writers, and thinkers come together to share stories and insights.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <span>© 2025 BlogSphere</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>Crafted with</span>
            <Heart size={14} className="text-red-400 animate-pulse" />
            <span>using React & Tailwind</span>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;