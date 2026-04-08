import React from "react";

interface LoadingProps {
  type?: "splash" | "loading";
}

const Loading: React.FC<LoadingProps> = ({ type }) => {
  const messages = [
    "Biryani history dates back over 4000 years to the ancient civilizations of Mesopotamia, where it was known as “beriyan.”",
    "In 2015, “Hyderabadi Biryani” was inscribed on UNESCO’s Representative List of the Intangible Cultural Heritage of Humanity.",
    "Biryani has become a global favorite, with variations and adaptations enjoyed in countries like Pakistan, Bangladesh, Middle Eastern nations, and even among Indian diaspora communities worldwide.",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-50 text-titleColor">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>

      <p className="mt-6 text-xl font-semibold text-gray-700 text-center max-w-[80%] leading-relaxed">
        {randomMessage}
      </p>
    </div>
  );
};

export default Loading;
