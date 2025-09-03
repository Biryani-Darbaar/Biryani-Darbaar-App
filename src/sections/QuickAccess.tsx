import { IonImg } from '@ionic/react'
import React from 'react'

const quickAccess = [
    {
        label: "Flash Deals",
        icon: "/assets/icons/sale.png",
        onClick: undefined,
    },
    {
        label: "Mini Game",
        icon: "/assets/icons/wheel.png",
        // onClick: (handleMiniGame as (() => void) | undefined),
    },
    {
        label: "VIP Member",
        icon: "/assets/icons/vip.png",
        onClick: undefined,
    },
    {
        label: "Box Chat",
        icon: "/assets/icons/call.png",
        onClick: undefined,
    },
];

const QuickAccessSection = () => {
    return (
        <div className="flex flex-row items-center w-full justify-between">
            {quickAccess.map((item) => (
                <div
                    key={item.label}
                    className="flex flex-col w-full gap-2 items-center justify-center font-semibold text-neutral-800"
                >
                    <IonImg
                        src={item.icon}
                        alt=""
                        className="w-1/3"
                        onClick={item.onClick}
                        style={item.onClick ? { cursor: "pointer" } : undefined}
                    />
                    <div className="w-full text-center text-titleColor font-medium">{item.label}</div>
                </div>
            ))}
        </div>
    )
}

export default QuickAccessSection