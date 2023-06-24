import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import { AuthProvider } from './components/contexts/AuthContext';
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
    element: <Dashboard />,
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
