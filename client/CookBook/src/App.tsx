import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/Utilities/PrivateRoute';
import { QueryClient, QueryClientProvider } from 'react-query';

import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Search from './components/Search/Search'
import Login from './components/Login/Login'
import Scan from './components/Scan/Scan';
import Kitchen from './components/Kitchen/Kitchen';
import Explore from './components/Explore/Explore';

const query = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,  // 5 minutes in milliseconds
    },
  },
});

// add all routers here
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute component={Dashboard} />,
  },
  {
    path: "/dashboard/search",
    element: <PrivateRoute component={Search} />,
  },
  {
    path: "/dashboard/scan",
    element: <PrivateRoute component={Scan} />,
  },
  {
    path: "/dashboard/kitchen",
    element: <PrivateRoute component={Kitchen} />,
  },
  {
    path: "/dashboard/explore",
    element: <PrivateRoute component={Explore} />,
  },
]);

function App() {
  return(
    <QueryClientProvider client={query}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App
