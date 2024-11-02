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
  
    const segments = [
      { name: "Prize 1", color: "#f44336" },
      { name: "Prize 2", color: "#ff9800" },
      { name: "Prize 3", color: "#ffeb3b" },
      { name: "Prize 4", color: "#4caf50" },
      { name: "Prize 5", color: "#2196f3" },
      { name: "Prize 6", color: "#9c27b0" },
    ];
  
    const resetGame = () => {
      setWinner(null);
      setShowToast(false);
    };
  
    return (
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mini Game</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="primary">
            <h2>Play the Mini-Game!</h2>
          </IonText>
          <p>Spin the wheel and see what you win!</p>
  
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
          <IonButton expand="block" onClick={resetGame} disabled={!winner}>
            Play Again
          </IonButton>
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
        </IonContent>
      </IonModal>
    );
  };
  
  export default GameModal;
  