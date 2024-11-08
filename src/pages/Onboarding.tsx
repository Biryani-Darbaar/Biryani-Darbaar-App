import React, { useState } from "react";
import "../assets/css/Onboarding.css";
import Navbar from "../components/Navbar/Navbar";
import splashImg1 from "../assets/images/splash-image-1.png";
import splashImg2 from "../assets/images/splash-image-2.png";
import splashImg3 from "../assets/images/splash-image-3.png";
import { IonContent, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      id: 1,
      src: splashImg1,
      alt: "Image 1",
      title: "Embark on Culinary Adventures",
      subtitle: "Embark on an exciting culinary journey with our app.",
    },
    {
      id: 2,
      src: splashImg2,
      alt: "Image 2",
      title: "Craft Your Perfect Order",
      subtitle: "Customize your cravings and place orders effortlessly.",
    },
    {
      id: 3,
      src: splashImg3,
      alt: "Image 3",
      title: "Taste the Delivered Magic",
      subtitle: "Enjoy the convenience of doorstep culinary delights.",
    },
  ];

  return (
    <div className="parent">
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/SignIn" component={SignIn} />
        </IonRouterOutlet>
      </IonReactRouter>
      <IonContent fullscreen>
        <div className="slider-container">
          <div
            className="slider-wrapper"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div className="slide" key={index}>
                <img className="slider-img" src={image.src} alt={image.alt} />
                <div className="content-box">
                  <div className="title-text">{image.title}</div>
                  <div className="subtitle-text">{image.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-dots">
            {images.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>

          {/* Get Started Button */}
          <div className="start-btn">
            <Link to="/SignIn" className="start-text">
              Get Started
            </Link>
          </div>
        </div>
      </IonContent>
    </div>
  );
};

export default Onboarding;
