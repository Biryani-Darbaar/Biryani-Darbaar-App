import React from "react";
import { Plus } from "lucide-react";
import "./HoriScroll.css";
import { useHistory } from "react-router-dom";

interface HoriScrollProps {
  items: {
    image: string;
    name: string;
    price?: string;
    location?: string;
    addOns?: Addon[];
    description?: string;
    dishId?: string;
  }[];
}
interface AddToCartParams {
  name: string;
  addons: Addon[];
  price: number;
  dishId: number;
  image: string;
  description: string;
}

interface Addon {
  addonName: string;
  price: number;
}

const HoriScrollItemWithLocation: React.FC<{
  item: HoriScrollProps["items"][0];
  handleAddToCart: (params: AddToCartParams) => void;
}> = ({ item, handleAddToCart }) => (
  <div className="hori-scroll-item">
    <img src={item.image} alt={item.name} className="hori-scroll-image" />
    <h3 className="hori-scroll-title">{item.name}</h3>
    {item.price && <p className="hori-scroll-price">{item.price}</p>}
    {item.location && <p className="hori-scroll-location">{item.location}</p>}
    {item.dishId && <Plus className="hori-scroll-icon" />}
  </div>
);

const HoriScrollItemWithoutLocation: React.FC<{
  item: HoriScrollProps["items"][0];
  handleAddToCart: (params: AddToCartParams) => void;
}> = ({ item, handleAddToCart }) => (
  <div className="hori-scroll-item">
    <img src={item.image} alt={item.name} className="hori-scroll-image" />
    <h3 className="hori-scroll-title">{item.name}</h3>
    <div className="hori-price-plus">
      {item.price && <p className="hori-scroll-price">{`$ ${item.price}`}</p>}
      <Plus
        className="hori-scroll-icon"
        color="red"
        onClick={() =>
          handleAddToCart({
            name: item.name,
            dishId: item.dishId ? parseInt(item.dishId) : 0,
            addons: item.addOns
              ? item.addOns
              : [],
            price: item.price ? parseFloat(item.price) : 0,
            image: item.image,
            description: item.description || "",
          })
        }
      />
    </div>
  </div>
);

const HoriScroll: React.FC<HoriScrollProps> = ({ items }) => {
  const history = useHistory();

  const handleAddToCart = ({
    name,
    dishId,
    addons,
    price,
    image,
    description,
  }: AddToCartParams): void => {
    console.log("Kojja lanja munda dengutha erriii puuka lanja",name, dishId, addons, price, image, description);
    history.push({
      pathname: "/Item",
      state: {
        name,
        dishId,
        addons,
        price,
        image,
        description,
      },
    });
  };

  console.log("Kojja munda denguthaa pani chey", items);
  return (
    <div className="hori-scroll-container">
      {items.map((item, index) =>
        item.location ? (
          <HoriScrollItemWithLocation key={index} item={item} handleAddToCart={handleAddToCart} />
        ) : (
          <HoriScrollItemWithoutLocation key={index} item={item} handleAddToCart={handleAddToCart} />
        )
      )}
    </div>
  );
};

export default HoriScroll;
