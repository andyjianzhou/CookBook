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
// import Scan from './components/Scan/Camera';
import KitchenPage from './components/Kitchen/KitchenPage';
import Explore from './components/Explore/Explore';
import HomePages from './components/LandingPage/HomePages';
import CameraPage from './components/Scan/CameraPage';

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
    element: <HomePages />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
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
  // TODO: Change this to be a refridgerator page, where you can add items to your fridge, find recipe's
  // Right now, this Scan is just a drawer that you can take pictures on.
  // {
  //   path: "/dashboard/scan",
  //   element: <PrivateRoute component={Scan} />,
  // },
  {
    path: "/dashboard/kitchen",
    element: <PrivateRoute component={KitchenPage} />,
  },
  {
    path: "/dashboard/explore",
    element: <PrivateRoute component={Explore} />,
  },
  {
    path: "/dashboard/scan",
    element: <PrivateRoute component={CameraPage} />,
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
