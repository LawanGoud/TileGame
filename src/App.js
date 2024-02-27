import React, { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import GameBoard from "./GameBoard";
import "./App.css";

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [isGameStarted, setGameStarted] = useState(false);

  const saveName = (name) => {
    setPlayerName(name);
    setGameStarted(true);
    alert(`Welcome, ${name}! Let's start playing.`);
  };

  return (
    <div>
      {isGameStarted ? <GameBoard /> : <WelcomeScreen onStartGame={saveName} />}
    </div>
  );
};

export default App;
