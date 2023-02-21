import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/pages/SignUp'

// add all routers here
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
]);

function App() {
  console.log("App.jsx running");
  return <RouterProvider router={router} />;
}
export default App
