import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dish } from "../types";
import { exploreMenuIcons } from "../constants/Home";

const MainMenuSection = ({ categories }: { categories: string[] }) => {
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [selectedCategoryDishes, setSelectedCategoryDishes] = useState<Dish[]>([]);

    useEffect(() => {
        if (categories.length > 0) {
            fetchDishesByCategory(categories[0]);
        }
    }, [categories]);

    const fetchDishesByCategory = async (name: string) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/dishes/category/${name}`
            );
            setSelectedCategoryDishes(response.data);
            setActiveCategory(name);
        } catch (error) {
            console.error(`Error fetching dishes for category ${name}:`, error);
        }
    };

    return (
        <div className="w-full bg-red-800 overflow-x-hidden">
            <div className="z-10 flex flex-col sticky top-0">
                <div className="py-2">
                    <span className="text-titleColorSecondary text-2xl font-semibold">
                        Biryani Darbar | Menu
                    </span>
                </div>

                <div className="flex flex-row gap-4 items-start py-2 overflow-x-auto scrollbar-hide">
                    {categories.map((category, idx) => {
                        const isActive = category === activeCategory;
                        const iconIdx = idx % exploreMenuIcons.length;
                        return (
                            <button
                                key={category}
                                className="flex flex-col items-center justify-center rounded-xl px-2 py-2 min-w-[80px] transition"
                                onClick={() => fetchDishesByCategory(category)}
                            >
                                <img
                                    src={
                                        isActive
                                            ? exploreMenuIcons[iconIdx].active
                                            : exploreMenuIcons[iconIdx].icon
                                    }
                                    alt={category}
                                    className={`${isActive
                                        ? "bg-red-700 border border-red-600 shadow"
                                        : "bg-white border border-primary"
                                        } w-16 p-4 rounded-md mb-1`}
                                />
                                <span className="text-base capitalize font-medium text-white">
                                    {category}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-4 py-4 mb-8 overflow-y-auto min-h-64">
                    {selectedCategoryDishes.map((item, idx) => (
                        <div
                            key={item.dishId || idx}
                            className="flex flex-row items-center bg-white rounded-xl w-full p-4 shadow gap-4"
                        >
                            <img
                                src={item.image}
                                alt={item.dishName}
                                className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                            />
                            <div className="flex-1">
                                <div className="text-lg font-semibold text-neutral-900 truncate">
                                    {item.dishName || item.name}
                                </div>
                                <div className="flex items-center text-sm text-[#FFB800] mt-1">
                                    <span className="mr-1">★</span>
                                    <span className="text-neutral-700 font-medium">4.8</span>
                                    <span className="text-neutral-400 ml-1">(1.2k)</span>
                                </div>
                                <div className="text-primary font-bold text-lg mt-1">
                                    ${item.price.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MainMenuSection;
