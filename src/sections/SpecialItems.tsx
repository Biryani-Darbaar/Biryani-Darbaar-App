import { Plus, Heart } from "lucide-react";
import { useHistory } from "react-router-dom";
import { Dish } from '../types';

const SpecialItemsSection = ({ dishes }: { dishes: Dish[] }) => {
    const history = useHistory();

    const handleAddToCart = ({
        dishName,
        dishId,
        addons,
        price,
        image,
        description,
    }: Dish) => {
        history.push({
            pathname: "/Item",
            state: {
                dishName,
                dishId,
                addons,
                price,
                image,
                description,
            },
        });
    };

    return (
        <div className="flex w-full flex-col items-start gap-4">
            <span className="text-2xl text-titleColor font-semibold">Discount on Delicious Food</span>
            <div className="flex overflow-none flex-row gap-4 overflow-x-auto py-2">
                {dishes.map((dish, index) => (
                    <div
                        key={index}
                        className="relative min-w-[220px] max-w-[240px] bg-white rounded-2xl border flex-shrink-0"
                    >
                        <div className="absolute top-2 left-2 bg-neutral-800 text-white text-xs font-medium px-3 py-1 rounded-lg z-10">
                            {"Reduce 4%"}
                        </div>
                        <button className="absolute bottom-3 right-3 z-10">
                            <Heart size={22} className="text-[#E23C3C]" strokeWidth={2} fill="white" />
                        </button>
                        <img
                            src={dish.image}
                            alt={dish.dishName}
                            className="w-full h-[150px] object-cover rounded-t-2xl"
                        />
                        <div className="px-4 py-3">
                            <h3 className="text-base font-semibold text-neutral-900 mb-1 capitalize">{dish.dishName}</h3>
                            <div className="flex items-center text-neutral-500 mb-2 gap-2 text-sm">
                                <span>1.5 km</span>
                                <span>•</span>
                                <span className="flex items-center">
                                    <span className="text-[#FFB800] mr-1">★</span>
                                    4.8 <span className="ml-1">(1.2k)</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-[#E23C3C]">
                                    {dish.price ? `$${dish.price}` : "$16"}
                                </span>
                                <span className="text-sm text-neutral-400 line-through">
                                    $20
                                </span>
                                <Plus
                                    className="ml-auto text-[#E23C3C] cursor-pointer"
                                    size={22}
                                    onClick={() =>
                                        handleAddToCart(dish)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialItemsSection;