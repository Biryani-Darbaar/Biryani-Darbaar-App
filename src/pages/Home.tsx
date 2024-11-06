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
  IonCardContent,
  IonImg,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
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

const Home: React.FC = () => {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [isGameOpen, setGameOpen] = useState(false);
  const [special, setSpecial] = useState<
    { dishName: string; price: string; image: string }[]
  >([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategoryDishes, setSelectedCategoryDishes] = useState<
    { dishName: string; price: string; image: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://biryani-darbar-server.vercel.app/img"
        );
        setImages(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const fetchSpecialDishes = async () => {
      try {
        const specialResponse = await axios.get(
          "https://biryani-darbar-server.vercel.app/dishes/special"
        );
        setSpecial(specialResponse.data);
      } catch (error) {
        console.error("Error fetching special dishes:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://biryani-darbar-server.vercel.app/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchImages();
    fetchSpecialDishes();
    fetchCategories();
    console.log("Mundaa", categories);
  }, []);
  const [locations, setLocations] = useState<
    { locationId: string; name: string; address: string; image: string }[]
  >([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("https://biryani-darbar-server.vercel.app/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const fetchDishesByCategory = async (name: string) => {
    try {
      console.log(name);

      const response = await axios.get(
        `https://biryani-darbar-server.vercel.app/dishes/category/${name}`
      );
      console.log(response.data);

      setSelectedCategoryDishes(response.data);
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

  return (
    <IonPage>
      <IonHeader className="header-custom">
        <Navbar />
      </IonHeader>

      <IonContent fullscreen className="content">
        <div className="content-custom">
          {/* Carousel */}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            className="carousel-container"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Category Section */}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonImg src={sale} alt="" className="icon-grid"></IonImg>
                <div className="text">Flash deals</div>
              </IonCol>
              <IonCol>
                <IonImg
                  src={wheel}
                  alt=""
                  className="icon-grid"
                  onClick={handleMiniGame}
                ></IonImg>
                <div className="text mini">Mini game</div>
              </IonCol>
              <IonCol>
                <IonImg src={vip} alt="" className="icon-grid"></IonImg>
                <div className="text">Member</div>
              </IonCol>
              <IonCol>
                <IonImg src={call} alt="" className="icon-grid"></IonImg>
                <div className="text">Boxchat</div>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Horizontal Scroll Section */}
          <h4>Discount delicious food</h4>
          <br />
          <HoriScroll
            items={special.map((dish) => ({
              image: dish.image,
              title: dish.dishName || "Chicken Biryani",
              price: `$${dish.price}`,
            }))}
          />

          <div className="round-grid-container">
            <IconScroll
              items={categories.map((category) => ({ name: category }))}
              onCategoryClick={fetchDishesByCategory}
            />
            <RoundScroll
              items={selectedCategoryDishes.map((dish) => ({
                image: dish.image,
                title: dish.dishName || dish.name,
                price: `$${dish.price}`,
              }))}
            />
          </div>

          {/* Mini-Game Modal */}
          <GameModal isOpen={isGameOpen} onClose={closeGame} />
        </div>
        <div className="locations">
          <h4>The dish is available at branch stores</h4>
          <br />
          <HoriScroll
            items={locations.map((location) => ({
              image: location.image,
              title: location.name,
              location: location.address,
            }))}
          />
        </div>
        <br />
        <br />
      </IonContent>
    </IonPage>
  );
};

export default Home;
