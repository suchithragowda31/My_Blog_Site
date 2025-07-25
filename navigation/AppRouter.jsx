import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";

const router = createBrowserRouter([
    // Public Routes
    {
        path: '/',
        element: <Home />,
    },
   
], {
    basename: '/My_Blog_Site'  // Add this line!
});

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;