import {
  IonHeader,
  IonPage,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import HoriScroll from "../components/HoriScroll";
import GameModal from "../components/GameModal";
import RoundScroll from "../components/RoundScroll";
import IconScroll from "../components/iconSlider";
import "swiper/css";
import Loading from "../components/Loading";
import { carouselImages } from "../constants/Home";
import QuickAccessSection from "../sections/QuickAccess";
import SpecialItemsSection from "../sections/SpecialItems";

const Home: React.FC = () => {
  const [isGameOpen, setGameOpen] = useState(false);
  const [specialDishes, setSpecialDishes] = useState<
    {
      dishName: string;
      price: number;
      image: string;
      dishId: string;
      addons: object[];
      description: string;
    }[]
  >([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategoryDishes, setSelectedCategoryDishes] = useState<
    { dishName: string; price: number; image: string; name: string, description: string, dishId: string, addons: object[] }[]
  >([]);
  const [locations, setLocations] = useState<
    { locationId: string; name: string; address: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("");


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
        if (response.data.length > 0) {
          fetchDishesByCategory(response.data[0]);
        }
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
      }, 2500); // Delay of 5 seconds
    };

    fetchData();
  }, []);

  const fetchDishesByCategory = async (name: string) => {
    try {
      console.log("Lanja muindaa kuna", name);
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/dishes/category/${name}`
      );
      console.log(response.data);

      setSelectedCategoryDishes(response.data);
      setActiveCategory(name);
    } catch (error) {
      console.error(`Error fetching dishes for category ${name}:`, error);
    }
  };

  function closeGame(): void {
    setGameOpen(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <IonPage className="bg-white">
      <IonHeader>
        <Navbar />
      </IonHeader>
      <div className="flex flex-col gap-8 items-center w-full justify-center p-6">
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
              <img
                src={image.url}
                alt={`Biryani Darbar | Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <QuickAccessSection />
        <SpecialItemsSection dishes={specialDishes} />

        <div className="round-grid-container">
          <IconScroll
            items={categories.map((category) => ({ name: category }))}
            onCategoryClick={fetchDishesByCategory}
            activeCategory={activeCategory} // Pass activeCategory
          />
          <RoundScroll
            items={selectedCategoryDishes.map((dish) => ({
              image: dish.image,
              name: dish.dishName || dish.name,
              price: dish.price,
              description: dish.description,
              dishId: dish.dishId,
              addons: dish.addons,
            }))}
          />
        </div>

        {/* Mini-Game Modal */}
        <GameModal isOpen={isGameOpen} onClose={closeGame} />
        <div className="locations">
          <h4>The dish is available at branch stores</h4>
          <br />
          <HoriScroll
            items={locations.map((location) => ({
              image: location.image,
              name: location.name,
              location: location.address,
            }))}
          />
        </div>
        <br />
        <br />

      </div>
    </IonPage>
  );
};

export default Home;
