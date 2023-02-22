import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/SignUp/SignUp'

// add all routers here
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },

]);

function App() {
  return <RouterProvider router={router} />;
}
export default App
