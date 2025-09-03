import {
  IonContent,
  IonHeader,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../assets/css/Home.css";
import Navbar from "../components/Navbar/Navbar";
import CustomButton from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import sale from "../assets/images/sale.png";
import call from "../assets/images/call.png";
import wheel from "../assets/images/wheel.png";
import vip from "../assets/images/vip.png";
import food1 from "../assets/images/Image(3).png";
import food2 from "../assets/images/Image(4).png";
import HoriScroll from "../components/HoriScroll";
import GameModal from "../components/GameModal";
import RoundScroll from "../components/RoundScroll";
import IconScroll from "../components/iconSlider";
import "swiper/css";
import Loading from "../components/Loading";
import { arrowBackOutline } from "ionicons/icons";
import { carouselImages } from "../constants/Home";

const Home: React.FC = () => {
  const [isGameOpen, setGameOpen] = useState(false);
  const [special, setSpecial] = useState<
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

  const quickAccess = [
    {
      label: "Flash Deals",
      icon: "/assets/icons/sale.png",
      onClick: undefined,
    },
    {
      label: "Mini Game",
      icon: "/assets/icons/wheel.png",
      onClick: (handleMiniGame as (() => void) | undefined),
    },
    {
      label: "Member",
      icon: "/assets/icons/vip.png",
      onClick: undefined,
    },
    {
      label: "Boxchat",
      icon: "/assets/icons/call.png",
      onClick: undefined,
    },
  ];

  useEffect(() => {

    const fetchSpecialDishes = async () => {
      try {
        const specialResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/specialOffers`
        );
        console.log("Kojja lan", specialResponse.data);

        setSpecial(specialResponse.data);
        console.log("Kojja lan", special);
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

  function handleMiniGame(): void {
    setGameOpen(true);
  }

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

        <div className="flex flex-row items-center w-full justify-between">
          {quickAccess.map((item) => (
            <div
              key={item.label}
              className="flex flex-col w-full gap-2 items-center justify-center font-semibold text-neutral-800"
            >
              <IonImg
                src={item.icon}
                alt=""
                className="w-1/3"
                onClick={item.onClick}
                style={item.onClick ? { cursor: "pointer" } : undefined}
              />
              <div className="w-full text-center text-titleColor font-medium">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-2xl text-titleColor font-semibold">Discount on Delicious Food</span>
          <HoriScroll
            items={special.map((dish) => ({
              image: dish.image,
              name: dish.dishName || "Chicken Biryani",
              price: dish.price.toString(),
              description: dish.description,
              dishId: dish.dishId,
              addons: dish.addons,
            }))}
          />
        </div>


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
