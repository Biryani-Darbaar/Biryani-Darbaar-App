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
    setShowToast(true);
    console.log(`The winner is: ${winner}`);
  };

  const resetGame = () => {
    setWinner(null);
    setShowToast(false);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Mini Game</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-[#980014] flex flex-col items-center justify-center min-h-screen">
        {/* Spinner (make sure it accepts onFinish prop) */}
        <Spinner onFinish={handleWheelFinish} />

        {/* Show winner message */}
        {winner && (
          <IonText color="success" className="mt-6 text-center">
            <h3 className="text-lg font-semibold">
              🎉 Congratulations! You won {winner}
            </h3>
          </IonText>
        )}

        {/* Action buttons */}
        <div className="mt-6 flex gap-4">
          <IonButton expand="block" color="medium" onClick={resetGame}>
            Play Again
          </IonButton>
          <IonButton expand="block" color="danger" onClick={onClose}>
            Close Game
          </IonButton>
        </div>

        {/* Toast notification */}
        <IonToast
          isOpen={showToast}
          message={`🎉 Congratulations! You won ${winner}`}
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonModal>
  );
};

export default GameModal;
