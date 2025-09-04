import { IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import React from "react";
import { Tabs } from "../../constants/Global";

const TabBar = ({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}) => {
    return (
        <IonTabBar
            slot="bottom"
            className="h-20"
            style={{
                "--color-selected": "#991b1b",
                "--ripple-color": "#991b1b",
            }}
        >
            {Tabs.map(({ key, href, label, icon }) => {
                const isActive = activeTab === key;
                return (
                    <IonTabButton
                        key={key}
                        tab={key}
                        href={href}
                        onClick={() => setActiveTab(key)}
                    >
                        {React.cloneElement(icon, {
                            className: isActive ? "text-red-800" : "text-gray-500",
                        })}
                        <IonLabel className={isActive ? "text-red-800" : "text-gray-500"}>
                            {label}
                        </IonLabel>
                    </IonTabButton>
                );
            })}
        </IonTabBar>
    );
};

export default TabBar;
