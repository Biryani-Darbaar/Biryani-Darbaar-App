import {
    IonModal,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonToast,
  } from "@ionic/react";
  import React, { useState } from "react";
  import Spinner from "./Spinner";
  
  interface GameModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
    const [winner, setWinner] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
  
    const handleWheelFinish = (winner: string) => {
      setWinner(winner);
      setShowToast(true); // Show a toast notification when the wheel finishes
      console.log(`The winner is: ${winner}`);
    };
  
    const resetGame = () => {
      setWinner(null);
      setShowToast(false);
    };
  
    return (
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
          <IonToolbar color="danger" >
            <IonTitle>Mini Game</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="#980014">
          <div style={{backgroundColor: "#980014", height: '100vh', width: '100vw'}}>
  <br />
          <Spinner
             // Callback for when the spin finishes
             />
  
          {/* Show winner once the game ends */}
          {winner && (
            <IonText color="success">
              <h3>Congratulations! You won {winner}</h3>
            </IonText>
          )}
  
          {/* Buttons to close or reset the game */}
          
          <IonButton expand="block" color="danger" onClick={onClose}>
            Close Game
          </IonButton>
  
          {/* Toast notification for the winner */}
          <IonToast
            isOpen={showToast}
            message={`Congratulations! You won ${winner}`}
            duration={3000}
            onDidDismiss={() => setShowToast(false)}
            />
            </div>
        </IonContent>
      </IonModal>
    );
  };
  
  export default GameModal;
  