import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AllBlogsPage from '../components/AllBlogs';
import BlogView from '../components/BlogView';
import CreateBlogForm from '../components/CreateBlog';

// Mock initial blog data
const initialBlogs = [
  {
    id: 1,
    title: "Getting Started with React and Vite",
    content: "React and Vite provide an excellent foundation for modern web development. Vite offers lightning-fast development with hot module replacement, while React provides a component-based architecture that makes building UIs intuitive and maintainable.\n\nIn this comprehensive guide, we'll explore how to set up a modern React development environment using Vite, understand the benefits it brings to your workflow, and build a solid foundation for your next project.",
    author: "John Doe",
    date: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    excerpt: "Learn how to set up a modern React development environment with Vite for optimal performance."
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    content: "Tailwind CSS revolutionizes how we write CSS by providing utility-first classes. Instead of writing custom CSS, you compose designs directly in your markup using pre-built utility classes. This approach leads to faster development and more consistent designs.\n\nWith Tailwind, you can create beautiful, responsive designs without leaving your HTML. The framework provides everything you need to build modern web interfaces.",
    author: "Jane Smith",
    date: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    excerpt: "Discover the power of utility-first CSS framework and how it can speed up your development workflow."
  }
];

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load blogs from localStorage on component mount
  useEffect(() => {
    try {
      const savedBlogs = localStorage.getItem('blogSphere_blogs');
      if (savedBlogs) {
        const parsedBlogs = JSON.parse(savedBlogs);
        setBlogs(parsedBlogs);
      } else {
        // If no saved blogs, use initial mock data
        setBlogs(initialBlogs);
        localStorage.setItem('blogSphere_blogs', JSON.stringify(initialBlogs));
      }
    } catch (error) {
      console.error('Error loading blogs from localStorage:', error);
      setBlogs(initialBlogs);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save blogs to localStorage whenever blogs state changes
  useEffect(() => {
    if (!isLoading && blogs.length >= 0) {
      try {
        localStorage.setItem('blogSphere_blogs', JSON.stringify(blogs));
      } catch (error) {
        console.error('Error saving blogs to localStorage:', error);
      }
    }
  }, [blogs, isLoading]);

  const handleCreateBlog = () => {
    setCurrentView('create');
  };

  const handleSubmitBlog = (newBlog) => {
    // Ensure unique ID
    const blogWithId = {
      ...newBlog,
      id: Date.now() + Math.random(), // More unique ID
    };

    // Set default thumbnail if none provided
    if (!blogWithId.thumbnail) {
      blogWithId.thumbnail = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop';
    }

    // Set default excerpt if none provided
    if (!blogWithId.excerpt) {
      const contentPreview = blogWithId.content.substring(0, 150);
      blogWithId.excerpt = contentPreview + (contentPreview.length >= 150 ? '...' : '');
    }

    // Add new blog to the beginning of the array
    const updatedBlogs = [blogWithId, ...blogs];
    setBlogs(updatedBlogs);
    setCurrentView('home');

    // Show success message
    setTimeout(() => {
      alert('Story published successfully! 🎉');
    }, 100);
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
      setBlogs(updatedBlogs);
      
      // Show success message
      setTimeout(() => {
        alert('Story deleted successfully.');
      }, 100);
    }
  };

  const handleReadBlog = (blog) => {
    setSelectedBlog(blog);
    setCurrentView('read');
  };

  const handleBackToBlogs = () => {
    setCurrentView('home');
    setSelectedBlog(null);
  };

  // Clear all data function (useful for testing)
  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This will reset to initial blogs.')) {
      localStorage.removeItem('blogSphere_blogs');
      setBlogs(initialBlogs);
      localStorage.setItem('blogSphere_blogs', JSON.stringify(initialBlogs));
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-spin mx-auto mb-4">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onCreateBlog={handleCreateBlog}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <AllBlogsPage
            blogs={blogs}
            onDelete={handleDeleteBlog}
            onRead={handleReadBlog}
          />
        )}
        
        {currentView === 'create' && (
          <CreateBlogForm
            onSubmit={handleSubmitBlog}
            onCancel={() => setCurrentView('home')}
          />
        )}
        
        {currentView === 'read' && selectedBlog && (
          <BlogView
            blog={selectedBlog}
            onBack={handleBackToBlogs}
          />
        )}
      </main>
      
      <Footer />
      
      {/* Development Helper - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleClearAllData}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
            title="Clear all data (Development only)"
          >
            Reset Data
          </button>
        </div>
      )}
    </div>
  );
};

export default App;