import React from 'react';
import { User, Calendar, Trash2, Image as ImageIcon } from 'lucide-react';

const BlogCard = ({ blog, onDelete, onRead }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-white/20">
      <div
        className="cursor-pointer"
        onClick={() => onRead(blog)}
      >
        {/* Thumbnail Section */}
        <div className="relative overflow-hidden bg-gray-50">
          {blog.thumbnail ? (
            <>
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-50 to-gray-100"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback for broken images */}
              <div 
                className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center absolute inset-0"
                style={{ display: 'none' }}
              >
                <div className="text-center text-gray-400">
                  <ImageIcon size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Image not available</p>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <ImageIcon size={32} className="mx-auto mb-2" />
                <p className="text-sm">No thumbnail</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center text-xs text-gray-500 mb-3 bg-gray-50/50 rounded-lg px-3 py-1.5">
            <User size={14} className="mr-1.5 text-blue-500" />
            <span className="mr-4 font-medium">{blog.author}</span>
            <Calendar size={14} className="mr-1.5 text-purple-500" />
            <span>{new Date(blog.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {blog.excerpt || blog.content.substring(0, 120) + '...'}
          </p>

          {/* Read More */}
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              Read story →
            </span>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="px-6 pb-4 border-t border-gray-100/50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this story?')) {
              onDelete(blog.id);
            }
          }}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;