import React from 'react';
import './HoriScroll.css';

interface HoriScrollProps {
    items: {
        image: string;
        title: string;
        price?: string;
        location?: string;
    }[];
}

const HoriScroll: React.FC<HoriScrollProps> = ({ items }) => {
    return (
        <div className="hori-scroll-container">
            {items.map((item, index) => (
            <div key={index} className="hori-scroll-item">
                <img src={item.image} alt={item.title} className="hori-scroll-image" />
                <h3 className="hori-scroll-title">{item.title}</h3>
                {item.price && <p className="hori-scroll-price">{item.price}</p>}
                {item.location && <p className="hori-scroll-location">{item.location}</p>}
            </div>
            ))}
        </div>
    );
};

export default HoriScroll;