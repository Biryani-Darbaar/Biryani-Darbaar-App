import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

interface MiniGame {
  gameId: string;
  name: string;
}

const Spinner: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);
  const [offers, setOffers] = useState<MiniGame[]>([]);

  useEffect(() => {
    const fetchMiniGames = async () => {
      try {
        const response = await axios.get("http://localhost:4200/miniGames");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching miniGames data:", error);
      }
    };

    fetchMiniGames();
  }, []);

  const spinWheel = () => {
    if (!isSpinning && offers.length > 0) {
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
      <div className="relative w-80 h-80">
        {/* Spinner SVG */}
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
          {/* Golden Outer Rim */}
          <circle cx="50" cy="50" r="49" fill="#E7C45A" />

          {/* Wheel Sections */}
          {offers.map((offer, index) => {
            const angle = index * (360 / offers.length);
            const endAngle = (index + 1) * (360 / offers.length);
            const startX = 50 + 48 * Math.cos((angle * Math.PI) / 180);
            const startY = 50 + 48 * Math.sin((angle * Math.PI) / 180);
            const endX = 50 + 48 * Math.cos((endAngle * Math.PI) / 180);
            const endY = 50 + 48 * Math.sin((endAngle * Math.PI) / 180);

            return (
              <g key={offer.gameId}>
                <path
                  d={`M 50 50 L ${startX} ${startY} A 48 48 0 0 1 ${endX} ${endY} Z`}
                  fill={index % 2 === 0 ? "#fff" : "#980014"} // Alternating colors
                  stroke="#E7C45A"
                  strokeWidth="0.5"
                />
                <text
                  x={50 + 35 * Math.cos(((angle + endAngle) / 2) * (Math.PI / 180))}
                  y={50 + 35 * Math.sin(((angle + endAngle) / 2) * (Math.PI / 180))}
                  fill="black"
                  fontSize="3"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {offer.name}
                </text>
              </g>
            );
          })}

          {/* Center Circle */}
          <circle cx="50" cy="50" r="12" fill="red" />
            <text
            x="50"
            y="53"
            textAnchor="middle"
            fontSize="6"
            fill="white"
            fontWeight="bold"
            onClick={spinWheel}
            >
            {isSpinning ? "Spinning..." : "Spin"}
            </text>
        </svg>

        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 w-6 h-10 bg-yellow-400 transform -translate-x-1/2"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
      </div>

      {/* Spin Button */}
      {/* <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {isSpinning ? "Spinning..." : "Spin for an Offer!"}
      </button> */}

      {/* Selected Offer */}
      {selectedOffer && (
        <div className="mt-4 text-xl font-bold text-green-600">
          You won: {selectedOffer}!
        </div>
      )}
    </div>
  );
};

export default Spinner;
