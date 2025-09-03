import { IonLabel, IonTabBar, IonTabButton } from '@ionic/react'
import React from 'react'
import { Tabs } from '../../constants/Global';


const TabBar = ({ activeTab, setActiveTab }: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}) => {
    return (
        <IonTabBar slot="bottom" className="h-20">
            {Tabs.map(({ key, href, label, icon }) => {
                const isActive = activeTab === key
                return (
                    <IonTabButton
                        key={key}
                        tab={key}
                        href={href}
                        className={isActive ? "text-red-800" : ""}
                        onClick={() => setActiveTab(key)}
                    >
                        {icon}
                        <IonLabel className={isActive ? "text-red-800" : ""}>
                            {label}
                        </IonLabel>
                    </IonTabButton>
                )
            })}
        </IonTabBar>
    )
}

export default TabBar
