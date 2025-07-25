import React, { useState } from 'react';
import { Upload, X, Image, Link } from 'lucide-react';

const CreateBlogForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    thumbnail: '',
    excerpt: ''
  });

  const [thumbnailMethod, setThumbnailMethod] = useState('url'); // 'url' or 'upload'
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleSubmit = () => {
    if (formData.title && formData.content && formData.author) {
      const blogData = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        thumbnail: uploadedImage || formData.thumbnail // Use uploaded image or URL
      };
      
      onSubmit(blogData);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        author: '',
        thumbnail: '',
        excerpt: ''
      });
      setUploadedImage(null);
      setPreviewUrl('');
      setThumbnailMethod('url');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update preview for URL input
    if (field === 'thumbnail') {
      setPreviewUrl(value);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setUploadedImage(base64Image);
        setPreviewUrl(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setPreviewUrl('');
    // Clear the file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const removeThumbnailUrl = () => {
    setFormData(prev => ({ ...prev, thumbnail: '' }));
    setPreviewUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent">
              Create New Story
            </h2>
            <button
              onClick={onCancel}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Story Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
                placeholder="Enter your story title"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Thumbnail Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Thumbnail Image
              </label>
              
              {/* Method Selection */}
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailMethod('url');
                    setUploadedImage(null);
                    setPreviewUrl(formData.thumbnail);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    thumbnailMethod === 'url'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Link size={16} />
                  <span>Image URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailMethod('upload');
                    setFormData(prev => ({ ...prev, thumbnail: '' }));
                    setPreviewUrl(uploadedImage || '');
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    thumbnailMethod === 'upload'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Upload size={16} />
                  <span>Upload Image</span>
                </button>
              </div>

              {/* URL Input */}
              {thumbnailMethod === 'url' && (
                <div className="relative">
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.thumbnail && (
                    <button
                      type="button"
                      onClick={removeThumbnailUrl}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* File Upload */}
              {thumbnailMethod === 'upload' && (
                <div>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">Click to upload</span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                    </label>
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {previewUrl && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Thumbnail preview"
                      className="w-48 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                      onError={() => {
                        setPreviewUrl('');
                        if (thumbnailMethod === 'url') {
                          alert('Failed to load image. Please check the URL.');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={thumbnailMethod === 'upload' ? removeUploadedImage : removeThumbnailUrl}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm resize-none transition-all"
                placeholder="Brief description of your story"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Story Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm resize-none transition-all"
                placeholder="Write your story here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.content || !formData.author}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publish Story
              </button>
              <button
                onClick={onCancel}
                className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;