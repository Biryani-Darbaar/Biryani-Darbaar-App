import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonImg } from '@ionic/react';
import { Dish } from '../types';
import { exploreMenuIcons } from '../constants/Home';

const ExploreMenuSection = ({ categories }: { categories: string[] }) => {
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [selectedCategoryDishes, setSelectedCategoryDishes] = useState<Dish[]>([]);

    useEffect(() => {
        if (categories.length > 0) {
            fetchDishesByCategory(categories[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="relative w-screen py-6 px-0 bg-red-800 overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <IonImg src="/assets/images/pattern.png" className="w-full h-full object-cover opacity-40" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center justify-between px-6 mb-2">
                    <span className="text-titleColorSecondary text-2xl font-semibold">Explore our menu</span>
                    <button className="text-titleColorSecondary text-sm font-medium hover:underline">See more</button>
                </div>
                <div className="flex flex-row gap-4 items-start py-4 overflow-x-auto px-6 pb-3">
                    {categories.map((category, idx) => {
                        const isActive = category === activeCategory;
                        const iconIdx = idx % exploreMenuIcons.length;
                        return (
                            <button
                                key={category}
                                className={`flex flex-col items-center justify-center rounded-xl px-3 py-2 min-w-[80px] transition
                                    `}
                                onClick={() => fetchDishesByCategory(category)}
                            >
                                <img
                                    src={isActive ? exploreMenuIcons[iconIdx].active : exploreMenuIcons[iconIdx].icon}
                                    alt={category}
                                    className={`${isActive
                                        ? 'bg-red-700 text-white border border-red-600 shadow'
                                        : 'bg-white text-primary border border-primary'
                                        }w-16 p-4 rounded-md mb-1`}
                                />
                                <span className="text-base capitalize font-medium text-white">
                                    {category}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <div className="flex flex-row gap-4 h-60 py-4 items-end overflow-x-auto px-6 pb-2">
                    {selectedCategoryDishes.map((item, idx) => (
                        <div
                            key={item.dishId || idx}
                            className="flex flex-col h-fit items-center bg-white rounded-xl min-w-[160px] max-w-[180px] py-3 px-2 shadow"
                        >
                            <img
                                src={item.image}
                                alt={item.dishName}
                                className="w-28 h-28 rounded-full object-cover border-4 border-primary -mt-20"
                            />
                            <div className="w-full text-center pt-4">
                                <div className="text-lg font-semibold text-neutral-900 truncate">
                                    {item.dishName || item.name}
                                </div>
                                <div className="flex items-center justify-center text-sm text-[#FFB800] mt-1">
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

export default ExploreMenuSection;