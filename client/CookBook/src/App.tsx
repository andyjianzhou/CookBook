import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Search from './components/Search/Search'
import Login from './components/Login/Login'
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/Utilities/PrivateRoute';
import { QueryClient, QueryClientProvider } from 'react-query';

const query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,  // 5 minutes in milliseconds
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
  }
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
