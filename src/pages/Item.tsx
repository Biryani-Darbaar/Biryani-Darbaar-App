import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonContent,
} from "@ionic/react";
import "../assets/css/Item.css";
import biryani from "../assets/images/biryani.png";
import haleem from "../assets/images/Haleem.png";
import { PlusCircle, MinusCircle, ShoppingCart } from "lucide-react";
import axios from "axios";
interface Addon {
  addonName: string;
  price: number;
}

interface LocationState {
  name: string;
  dishId: number;
  addons?: Addon[];
  price: number;
  image: string;
  description: string;
}

const Item = () => {
    const history = useHistory();
  const location = useLocation<LocationState>();
  const { name, dishId, addons, price, image, description } = location.state;
  console.log(name, dishId, addons, price, image, description);

  const [count, setCount] = useState(1);
  console.log(count);
  const cartClicked = async () => {
    
    const userId = sessionStorage.getItem("sessionUserId");
    const response  = await axios.post("https://biryani-darbar-server.vercel.app/cart", {
        "userId": userId,
        "dishId": dishId,
        "name": name,
        "addons": addons,
        "price": price * count,
        "image": image,
        "description": description,
        "quantity": count
    });

    console.log(response.status);
    if(response.status === 201) {
        history.push("/Order");
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <img className="image" src={image} alt="" />
        <div className="price-segment">
          <br />
          <h5>Delicious good food</h5>
          <div className="prices">
            <h3>{price.toString().startsWith("$") ? price : `$${price}`}</h3>
            <h3 className="discount">
              {(price + 3).toFixed(2).startsWith("$")
                ? (price + 3).toFixed(2)
                : `$${(price + 3).toFixed(2)}`}
            </h3>
          </div>
        </div>
      </IonHeader>

      <IonContent fullscreen>
        <div className="content">
          <h1 className="heading">{name}</h1>
          <h3 className="description">{description}</h3>
          <div className="addons">
            {addons
              ? addons.map((addon, index) => (
                  <div key={index} className="addon">
                    <p>{addon.addonName}</p>
                    <p className="addon-price">
                      {addon.price.toString().startsWith("$")
                        ? addon.price
                        : `$ ${addon.price}`}
                    </p>
                  </div>
                ))
              : null}
          </div>
          <div className="images-content">
            <img src={haleem} alt="" />
            <img src={biryani} alt="" />
          </div>
        </div>
        <div className="footer">
          <div>
            <h6>Quantity</h6>
            <div className="counter">
              <button onClick={() => setCount(count > 1 ? count - 1 : 1)}>
                <MinusCircle />
              </button>
              <div>{count.toString().padStart(2, "0")}</div>
              <button onClick={() => setCount(count < 10 ? count + 1 : 10)}>
                <PlusCircle />
              </button>
            </div>
          </div>
          <button className="shop-cart-container" onClick={cartClicked}>
            <ShoppingCart />
            Add to Cart
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Item;
