import React, { useState, useRef, useEffect } from "react";

interface Offer {
  name: string;
  color: string;
}

const RestaurantOfferWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

  const offers: Offer[] = [
    { name: "50% Off Desserts", color: "#FF6B6B" },
    { name: "Free Appetizer", color: "#4ECDC4" },
    { name: "Buy 1 Get 1 Free", color: "#45B7D1" },
    { name: "20% Off Total Bill", color: "#FFA07A" },
    { name: "Free Drink with Meal", color: "#98D8C8" },
  ];

  useEffect(() => {
    if (!isSpinning && selectedOffer) {
      const offerIndex = offers.findIndex(
        (offer) => offer.name === selectedOffer
      );
      const targetRotation = 360 - offerIndex * (360 / offers.length) + 720;
      setRotation(targetRotation);
    }
  }, [selectedOffer, isSpinning, offers]);

  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setSelectedOffer(null);
      const totalRotation =
        (Math.floor(Math.random() * 3) + 2) * 360 +
        Math.floor(Math.random() * 360);
      setRotation((prevRotation) => prevRotation + totalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        const winningIndex =
          offers.length -
          1 -
          Math.floor((totalRotation % 360) / (360 / offers.length));
        setSelectedOffer(offers[winningIndex].name);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-80 mb-8">
        <svg
          ref={wheelRef}
          className="w-full h-full"
          viewBox="0 0 100 100"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)"
              : "transform 0.5s ease-out",
          }}
        >
          {offers.map((offer, index) => {
            const angle = index * (360 / offers.length);
            const endAngle = (index + 1) * (360 / offers.length);
            const midAngle = (angle + endAngle) / 2;

            const startX = 50 + 48 * Math.cos((angle * Math.PI) / 180);
            const startY = 50 + 48 * Math.sin((angle * Math.PI) / 180);
            const endX = 50 + 48 * Math.cos((endAngle * Math.PI) / 180);
            const endY = 50 + 48 * Math.sin((endAngle * Math.PI) / 180);

            return (
              <g key={index}>
                <path
                  d={`M 50 50 L ${startX} ${startY} A 48 48 0 0 1 ${endX} ${endY} Z`}
                  fill={offer.color}
                  stroke="white"
                  strokeWidth="0.5"
                />
                <path
                  id={`textPath-${index}`}
                  d={`M 50 50 L ${startX} ${startY} A 48 48 0 0 1 ${endX} ${endY}`}
                  fill="none"
                />
                <text
                  dy="0.35em" // Center the text vertically
                  fill="white"
                  fontSize="4"
                  fontWeight="bold"
                  textAnchor="middle"
                  stroke="black" // Add stroke for better readability
                  strokeWidth="0.2" // Stroke width for better visibility
                >
                  <textPath
                    href={`#textPath-${index}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {offer.name}
                  </textPath>
                </text>
              </g>
            );
          })}
        </svg>
        <div
          className="absolute top-1/2 left-1/2 w-4 h-12 bg-yellow-400 transform -translate-x-1/2 -translate-y-full"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {isSpinning ? "Spinning..." : "Spin for an Offer!"}
      </button>
      {selectedOffer && (
        <div className="mt-4 text-xl font-bold text-green-600">
          You won: {selectedOffer}!
        </div>
      )}
    </div>
  );
};

export default RestaurantOfferWheel;
