import React from 'react';
import { Plus, BookOpen, Sparkles } from 'lucide-react';

const Header = ({ onCreateBlog, currentView, setCurrentView }) => {
  return (
    <header className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 backdrop-blur-sm border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <BookOpen size={20} className="text-white" />
              </div>
              <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 
                className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setCurrentView('home')}
              >
                BlogSphere
              </h1>
              <p className="text-xs text-gray-500 font-medium">Where ideas come alive</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('home')}
              className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                currentView === 'home' 
                  ? 'bg-white text-blue-700 shadow-lg shadow-blue-100 border border-blue-100' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-white/60 hover:shadow-md'
              }`}
            >
              <span className="relative z-10">All Posts</span>
              {currentView === 'home' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full opacity-50"></div>
              )}
            </button>
            
            <button
              onClick={onCreateBlog}
              className="group bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white px-6 py-2.5 rounded-full font-medium hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-0.5"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Write Story</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;