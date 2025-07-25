import React from 'react';
import BlogCard from './BlogCard';
import { BookOpen, Plus } from 'lucide-react';

const AllBlogsPage = ({ blogs, onDelete, onRead }) => {
  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-6">
            <BookOpen size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Stories Yet</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your creative journey starts here. Share your thoughts, experiences, and insights with the world.
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium">
            <Plus size={20} />
            <span>Click "Write Story" to get started</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-4">
            Latest Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover inspiring stories, insights, and experiences shared by our creative community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm border border-white/20">
            <span className="text-gray-600 font-medium">
              {blogs.length} {blogs.length === 1 ? 'Story' : 'Stories'} Published
            </span>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={onDelete}
              onRead={onRead}
            />
          ))}
        </div>

        {/* Footer Message */}
        {blogs.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-500 italic">
              ✨ Keep writing, keep sharing, keep inspiring ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogsPage;