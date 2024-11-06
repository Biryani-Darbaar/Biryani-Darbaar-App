import React from 'react';
import './RoundScroll.css';

interface RoundScrollProps {
    items: {
        image: string;
        title: string;
        price: string;
    }[];
}

const RoundScroll: React.FC<RoundScrollProps> = ({ items }) => {
    return (
        <div className="round-scroll-container">
            {items.map((item, index) => (
                <div key={index} className="round-scroll-item">
                    <img src={item.image} alt={item.title} className="round-scroll-image" />
                    <p className="round-scroll-title" data-full-text={item.title} title={item.title}>
                        {item.title}
                    </p>
                    <p className="round-scroll-price" data-full-text={item.price} title={item.price}>
                        {item.price}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RoundScroll;
