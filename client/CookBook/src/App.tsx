import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
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
  return <RouterProvider router={router} />;
}
export default App
