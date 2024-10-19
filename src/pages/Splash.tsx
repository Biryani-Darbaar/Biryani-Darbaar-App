import React from "react";
import "../assets/css/Splash.css"; // Custom CSS for splash screen
import logo from  "../assets/images/logo-cen.png"
const SplashScreen: React.FC = () => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splashImage">
          <img src={logo} alt="App Logo" className="splash-logo" />
        </div>
        {/* <img src="/assets/logo.png" alt="App Logo" className="splash-logo" /> */}
        <h1 className="splash-title">Biryani Darbaar</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
