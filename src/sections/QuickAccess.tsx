import { IonImg } from "@ionic/react";
import GameModal from "../components/GameModal";
import { useState } from "react";

const QuickAccessSection = () => {
    const [isGameOpen, setGameOpen] = useState(false);

    function closeGame(): void {
        setGameOpen(false);
    }

    const quickAccess = [
        {
            label: "Flash Deals",
            icon: "/assets/icons/sale.png",
            onClick: undefined,
        },
        {
            label: "Mini Game",
            icon: "/assets/icons/wheel.png",
            onClick: () => setGameOpen(true),
        },
        {
            label: "VIP Zone",
            icon: "/assets/icons/vip.png",
            onClick: undefined,
        },
        {
            label: "Box Chat",
            icon: "/assets/icons/call.png",
            onClick: undefined,
        },
    ];

    return (
        <>
            <div className="flex flex-row items-center gap-2 w-full justify-between">
                {quickAccess.map((item) => (
                    <div
                        key={item.label}
                        onClick={item.onClick}
                        style={item.onClick ? { cursor: "pointer" } : undefined}
                        className="border py-4 flex flex-col rounded-lg px-4 w-full gap-2 items-center justify-center font-semibold text-neutral-800"
                    >
                        <IonImg src={item.icon} alt="" className="w-1/2" />
                        <div className="w-full text-center leading-tight text-titleColor font-medium">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
            <GameModal isOpen={isGameOpen} onClose={closeGame} />
        </>
    );
};

export default QuickAccessSection;
