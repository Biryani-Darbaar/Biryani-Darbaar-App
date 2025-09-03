import React from "react";
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
 

  return (
    <div className="parent">
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/SignIn" component={SignIn} />
        </IonRouterOutlet>
      </IonReactRouter>
      <IonContent fullscreen>
        <div className="slider-container">
          <div className="slider-wrapper">
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
                    <img
                      className="slider-img"
                      src={image.src}
                      alt={image.alt}
                    />
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
          <Link to="/SignIn" className="start-text">
            <div className="start-btn">Get Started</div>
          </Link>
          <br />
          <br />
        </div>
      </IonContent>
    </div>
  );
};

export default Onboarding;
