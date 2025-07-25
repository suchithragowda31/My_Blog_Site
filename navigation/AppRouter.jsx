import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
// import Navbar from '../components/Navbar';
// import AllBlogs from '../pages/AllBlogs';
// import CreateBlog from '../pages/CreateBlog';
// import BlogDetail from '../pages/BlogDetail';




const router = createBrowserRouter([
    // Public Routes
    {
        path: '/',
        element: <Home />,
    },
    // {   
    //     path: '/gallery',
    //     element: <GallerySection />,
    // },
    // {  
    //     path: '/contact',
    //     element: <ContactSection />,
    // }
   
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;