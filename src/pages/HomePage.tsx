import {
  IonContent,
  IonHeader,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { heartOutline } from "ionicons/icons";
import "../assets/css/Home.css"; // Ensure this file imports your variables
import Navbar from "../components/Navbar/Navbar";
import CustomButton from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import sale from "../assets/icons/sale.png";
import call from "../assets/icons/call.png";
import wheel from "../assets/icons/wheel.png";
import vip from "../assets/icons/vip.png";
import food1 from "../assets/images/Image(3).png";
import food2 from "../assets/images/Image(4).png";
import HoriScroll from "../components/HoriScroll";
import Splash from "./Splash";
import Onboarding from "./Onboarding";
const HomePage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    // Simulate splash screen duration
    setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 3 seconds splash screen
  }, []);

  useEffect(() => {
    // Check if onboarding is already completed (from local storage)
    const onboarding = localStorage.getItem("onboardingComplete");
    if (onboarding) {
      setOnboardingComplete(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("onboardingComplete", "true");
    setOnboardingComplete(true);
  };

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
