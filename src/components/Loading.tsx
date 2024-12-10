import React from "react";
import "./Loading.css"; // Ensure you create a CSS file for styling

const Loading: React.FC = () => {
  const messages = [
    "Biryani history dates back over 4000 years to the ancient civilizations of Mesopotamia, where it was known as “beriyan.”",
    "In 2015, “Hyderabadi Biryani” was inscribed on UNESCO’s Representative List of the Intangible Cultural Heritage of Humanity.",
    "Biryani has become a global favorite, with variations and adaptations enjoyed in countries like Pakistan, Bangladesh, Middle Eastern nations, and even among Indian diaspora communities worldwide."
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="spinner-text">{randomMessage}</div>
    </div>
  );
};

export default Loading;
