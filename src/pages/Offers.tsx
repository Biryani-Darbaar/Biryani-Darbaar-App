import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { Bell, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "../assets/css/Offers.css";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
const Offers = () => {
  const history = useHistory();

  interface Offer {
    id: number;
    image: string;
    dishName: string;
    discount: number;
    price: number;
  }

  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("saved");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/specialOffers`);
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching special offers:", error);
      }
    };

    fetchOffers();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="menu-header" color="danger">
          <Navbar name="My Offers" />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {offers
              .filter(
                (offer) =>
                  selectedTab === "saved" || selectedTab === "aboutToExpire"
              )
              .map((offer) => (
                <IonCol size="12" size-md="6" key={offer.id}>
                  {/* Navigation uses PascalCase: '/Menu' */}
                  <IonCard onClick={() => history.push(`/Menu`)}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="4">
                          <IonImg src={offer.image} alt={offer.dishName} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardHeader>
                            <IonCardTitle>{offer.dishName}</IonCardTitle>
                          </IonCardHeader>
                          <IonCardContent>
                            <p className="offer-discount">
                              Discount: {offer.discount}%
                            </p>
                            <p className="offer-price">
                              <span className="ion-strikethrough">
                                ${offer.price}
                              </span>{" "}
                              $
                              {(offer.price -
                                (offer.price * offer.discount) / 100).toFixed(2)}
                            </p>
                          </IonCardContent>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCard>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Offers;
