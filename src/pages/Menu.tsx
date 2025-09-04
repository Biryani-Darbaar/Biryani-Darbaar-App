import React, { useState, useEffect } from "react";
import { IonPage, IonImg } from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router";
import Navbar from "../components/navigation/NavBar";
import MainMenuSection from "../sections/MainMenu";
import { carouselImages } from "../constants/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <IonPage className="bg-red-800 overflow-y-auto">
      <Navbar />
      <div className="flex flex-col items-center w-full justify-start py-4 px-6">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          className="w-full h-52 mb-4 rounded-lg mySwiper"
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index}>
              <IonImg
                src={image.url}
                alt={`Biryani Darbar | Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          className="w-full h-52 mb-4 rounded-lg mySwiper"
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index}>
              <IonImg
                src={image.url}
                alt={`Biryani Darbar | Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <MainMenuSection categories={categories} />
      </div>
    </IonPage>
  );
};

export default Menu;
