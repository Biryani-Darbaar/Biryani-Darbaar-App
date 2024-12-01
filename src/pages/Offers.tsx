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
        const response = await axios.get("https://api.darbaarkitchen.com/specialOffers");
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
          <IonTitle className="justify text-center ">My Offer </IonTitle>
          <IonButtons slot="start">
            <div className="icon-left">
              <Bell
                className="bell"
                size={24}
                onClick={() => history.push("/Profile")}
              />
              <ShoppingCart size={24} onClick={() => history.push("/Order")} />
            </div>
          </IonButtons>
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
                  <IonCard>
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
