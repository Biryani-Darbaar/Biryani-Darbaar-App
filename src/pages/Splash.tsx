// export default SplashScreen;
import "../assets/css/Splash.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from  "../assets/images/logo-cen.png"

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/signin");
    }, 5000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [history]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splashImage">
          <img src={logo} alt="App Logo" className="splash-logo" />
        </div>
        <h1 className="splash-title">Biryani Darbaar</h1>
      </div>
    </div>
  );
};

export default SplashScreen;