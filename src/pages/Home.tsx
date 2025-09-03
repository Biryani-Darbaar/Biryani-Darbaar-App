import {
  IonImg,
  IonPage,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Navbar from "../components/navigation/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import Loading from "../components/Loading";
import { carouselImages } from "../constants/Home";
import QuickAccessSection from "../sections/QuickAccess";
import SpecialItemsSection from "../sections/SpecialItems";
import ExploreMenuSection from "../sections/ExploreMenu";
import { Dish } from "../types";
import ShowBranchesSection from "../sections/ShowBranches";

const Home: React.FC = () => {
  const [specialDishes, setSpecialDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<
    { locationId: string; name: string; address: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchSpecialDishes = async () => {
      try {
        const specialDishesResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/specialOffers`
        );
        setSpecialDishes(specialDishesResponse.data);
      } catch (error) {
        console.error("Error fetching special dishes:", error);
      }
    };

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

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/locations`
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchSpecialDishes(),
        fetchCategories(),
        fetchLocations(),
      ]);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    };

    fetchData();
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <IonPage className="bg-white overflow-y-auto">
      <Navbar />
      <div className="flex flex-col gap-8 items-center w-full justify-center py-8 px-6">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          className="w-full h-52 mb-2 rounded-lg mySwiper"
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
        <QuickAccessSection />
        <SpecialItemsSection dishes={specialDishes} />
        <ExploreMenuSection categories={categories} />
        <ShowBranchesSection locations={locations} />
      </div>
    </IonPage>
  );
};

export default Home;