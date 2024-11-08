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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
const Onboarding: React.FC = () => {

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
          >
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            className=""
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="slide" key={index}>
                  <img className="slider-img" src={image.src} alt={image.alt} />
                  <div className="content-box">
                    <div className="title-text">{image.title}</div>
                    <div className="subtitle-text">{image.subtitle}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
