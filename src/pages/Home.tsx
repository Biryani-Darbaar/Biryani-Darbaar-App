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
import GameModal from "../components/GameModal"; // Import the modal

const Home: React.FC = () => {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [isGameOpen, setGameOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/img");
        setImages(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    console.log("Session Storage:");
    
    const userId = sessionStorage.getItem("userId");
    console.log("User ID:", userId);
    fetchImages();
  }, []);

  function handleMiniGame(): void {
    setGameOpen(true); // Open the modal when clicking mini-game
  }

  function closeGame(): void {
    setGameOpen(false); // Close the modal
  }

  return (
    <IonPage>
      <IonHeader className="header-custom">
        <Navbar />
      </IonHeader>

      <IonContent fullscreen className="content-custom">
        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          className="carousel-custom"
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
        <br />
        <br />

        {/* Category Section */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonImg src={sale} alt="" className="icon-grid"></IonImg>
              Flash deals{" "}
            </IonCol>
            <IonCol>
              <IonImg
                src={wheel}
                alt=""
                className="icon-grid"
                onClick={handleMiniGame} // Trigger modal onClick
              ></IonImg>
              Mini game{" "}
            </IonCol>
            <IonCol>
              <IonImg src={vip} alt="" className="icon-grid"></IonImg>
              Member{" "}
            </IonCol>
            <IonCol>
              <IonImg src={call} alt="" className="icon-grid"></IonImg>
              Boxchat{" "}
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Horizontal Scroll Section */}
        <div>
          <br />
          <br />
          <HoriScroll
            items={[
              { image: food1, title: "Delicious Biryani", price: "$12.99" },
              { image: food2, title: "Spicy Kebab", price: "$9.99" },
              { image: food1, title: "Tasty Curry", price: "$11.99" },
              { image: food2, title: "Fresh Salad", price: "$7.99" },
              { image: food1, title: "Juicy Burger", price: "$8.99" },
              { image: food2, title: "Crispy Fries", price: "$4.99" },
            ]}
          />
        </div>

        {/* Offer Section */}
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard className="card-custom">
                <IonCardHeader>
                  <IonCardSubtitle>Offer</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="offer-content">
                  <h2>20% Discount for bills from $50</h2>
                  <p>Expires in 2 days</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="card-custom">
                <IonCardHeader>
                  <IonCardSubtitle>Promo</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="offer-content">
                  <h2>Special Offer for Today!</h2>
                  <p>Valid for 24 hours</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Store Section */}
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard className="card-custom">
                <IonCardHeader>
                  <IonCardTitle className="card-title">Athol Park</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="card-title">
                  Glenelg, Australia
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="card-custom">
                <IonCardHeader>
                  <IonCardTitle className="card-title">Glenelg</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="card-title">
                  St. Morris, Adelaide
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Mini-Game Modal */}
        <GameModal isOpen={isGameOpen} onClose={closeGame} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
