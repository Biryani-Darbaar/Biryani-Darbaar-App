import React from 'react';
import './RoundScroll.css';
import { Plus } from 'lucide-react';
import { useHistory } from 'react-router-dom';
interface RoundScrollProps {
    items: {
        image: string;
        name: string;
        price: number;
        description?: string;
        dishId: string;
        addons: object[];
    }[];
}

interface AddToCartParams {
    name: string;
    dishId: string;
    addons: object[];
    price: number;
    image: string;
    description?: string;
}

const RoundScroll: React.FC<RoundScrollProps> = ({ items }) => {
    const history = useHistory();
    const handleAddToCart = ({
        name,
        dishId,
        addons,
        price,
        image,
        description,
      }: AddToCartParams): void => {
        console.log(name, dishId, addons, price, image, description);
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
        <div className="round-scroll-container">
            {items.map((item, index) => (
                <div key={index} className="round-scroll-item">
                    <img src={item.image} alt={item.name} className="round-scroll-image" />
                    <p className="round-scroll-title" data-full-text={item.name} title={item.name}>
                        {item.name}
                    </p>
                    <p className="round-scroll-price" data-full-text={item.price} title={item.price.toString()}>
                        {`$${item.price}`}
                        <Plus className="round-scroll-icon" onClick={() => handleAddToCart({
                            name: item.name,
                            dishId: item.dishId,
                            addons: item.addons,
                            price: item.price,
                            image: item.image,
                            description: item.description || "",
                        })}/>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RoundScroll;
