import React from "react";
import { IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { OnboardingCarouselData } from "../constants/Onboarding";
import { useHistory } from "react-router-dom";

const Onboarding: React.FC = () => {
  const history = useHistory();

  const handleGetStarted = () => {
    localStorage.setItem("onboardingComplete", "true");
    history.push("/SignIn");
  };

  return (
    <IonPage>
      <div className="flex flex-col items-center justify-center min-h-screen px-8 pb-28 bg-[#FAFAFA] relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="w-full"
        >
          {OnboardingCarouselData.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center">
                <img
                  src={item.src}
                  alt={`Biryani Darbar - ${item.title}`}
                  className="w-full object-cover rounded-[28px] shadow-md mt-8"
                />
                <div className="bg-white mb-8 rounded-2xl mt-8 px-7 py-6 w-full flex flex-col items-center">
                  <div className="text-3xl font-bold text-[#232323] text-center mb-2">
                    {item.title}
                  </div>
                  <div className="text-base text-[#7C7C7C] text-center">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 px-6 pb-8 bg-transparent">
        <button
          className="w-full bg-primary text-white rounded-lg py-3 font-semibold text-lg shadow-none hover:bg-primary/90 transition"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </IonPage>
  );
};

export default Onboarding;