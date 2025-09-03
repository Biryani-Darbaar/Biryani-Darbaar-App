import React from "react";
import { Plus, Heart } from "lucide-react";
import { useHistory } from "react-router-dom";

interface HoriScrollProps {
  items: {
    image: string;
    name: string;
    price?: string;
    oldPrice?: string;
    discount?: string;
    rating?: number;
    ratingCount?: string;
    distance?: string;
    description?: string;
    dishId?: string;
    addOns?: Addon[];
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

  return (
    <div className="flex flex-row gap-4 overflow-x-auto py-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative min-w-[220px] max-w-[240px] bg-white rounded-2xl shadow-md flex-shrink-0"
        >
          {/* Discount badge */}
          <div className="absolute top-2 left-2 bg-[#4B3EFF] text-white text-xs font-semibold px-3 py-1 rounded-lg z-10">
            {item.discount || "Reduce 4%"}
          </div>
          {/* Top right badge (optional, for symmetry) */}
          <div className="absolute top-2 right-2 bg-[#4B3EFF] text-white text-xs font-semibold px-3 py-1 rounded-lg z-10">
            {item.discount || "Reduce 4%"}
          </div>
          {/* Favorite icon */}
          <button className="absolute bottom-3 right-3 z-10">
            <Heart size={22} className="text-[#E23C3C]" strokeWidth={2} fill="white" />
          </button>
          {/* Card image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[120px] object-cover rounded-t-2xl"
          />
          {/* Card content */}
          <div className="px-4 py-3">
            <h3 className="text-base font-semibold text-gray-900 mb-1 capitalize">{item.name}</h3>
            <div className="flex items-center text-xs text-gray-500 mb-2 gap-2">
              <span>{item.distance || "1.5 km"}</span>
              <span>•</span>
              <span className="flex items-center">
                <span className="text-[#FFB800] mr-1">★</span>
                {item.rating || "4.8"} <span className="ml-1">({item.ratingCount || "1.2k"})</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#E23C3C]">
                {item.price ? `$${item.price}` : "$16"}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {item.oldPrice ? `$${item.oldPrice}` : "$20"}
              </span>
              <Plus
                className="ml-auto text-[#E23C3C] cursor-pointer"
                size={22}
                onClick={() =>
                  handleAddToCart({
                    name: item.name,
                    dishId: item.dishId ? parseInt(item.dishId) : 0,
                    addons: item.addOns ? item.addOns : [],
                    price: item.price ? parseFloat(item.price) : 0,
                    image: item.image,
                    description: item.description || "",
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoriScroll;
