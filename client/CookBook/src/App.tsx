import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/Utilities/PrivateRoute';

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
    path: "/Dashboard",
    element: <PrivateRoute component={Dashboard} />,
  }
]);

function App() {
  return(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
export default App
