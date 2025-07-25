import React from 'react';
import { ArrowLeft, User, Calendar, Image as ImageIcon } from 'lucide-react';

const BlogView = ({ blog, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={20} />
          <span>Back to all stories</span>
        </button>

        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Thumbnail Section */}
          {blog.thumbnail ? (
            <div className="relative">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full max-h-96 object-contain bg-gray-50"
                style={{ minHeight: '200px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback for broken images */}
              <div 
                className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                style={{ display: 'none' }}
              >
                <div className="text-center text-gray-400">
                  <ImageIcon size={48} className="mx-auto mb-2" />
                  <p>Image not available</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <ImageIcon size={48} className="mx-auto mb-2" />
                <p>No thumbnail available</p>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex items-center text-sm text-gray-500 mb-6 bg-gray-50/50 rounded-lg px-4 py-2">
              <User size={16} className="mr-2 text-blue-500" />
              <span className="mr-6 font-medium">{blog.author}</span>
              <Calendar size={16} className="mr-2 text-purple-500" />
              <span>{new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-6 p-4 bg-blue-50/50 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {blog.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogView;