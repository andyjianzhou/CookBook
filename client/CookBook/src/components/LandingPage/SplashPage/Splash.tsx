import React, { useEffect } from "react";
import { preLoaderAnim } from "./animations";
import "./preloader.css";

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Sizzle, </span>
        <span>Serve, </span>
        <span>Scan.</span>
      </div>
    </div>
  );
};

export default PreLoader;