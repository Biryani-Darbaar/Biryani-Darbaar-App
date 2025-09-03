import { useEffect, useState } from "react";
import Splash from "./Splash";
import Onboarding from "./Onboarding";

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const onboarding = localStorage.getItem("onboardingComplete");
    if (onboarding) {
      setOnboardingComplete(true);
    }
  }, []);

  
  if (showSplash) {
    return (
      <div className="splash-screen">
        <Splash />
      </div>
    );
  }

  if (!onboardingComplete) {
    return (
      <div className="onboarding">
        <Onboarding />
      </div>
    );
  }
};

export default HomePage;
