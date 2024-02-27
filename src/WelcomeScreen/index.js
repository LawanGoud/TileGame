import React, { useState } from "react";
import "./index.css";

const WelcomeScreen = ({ onStartGame }) => {
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleStartPlaying = () => {
    if (name.trim() !== "") {
      localStorage.setItem("playerName", name);
      onStartGame(name);
    } else {
      alert("Please enter your name before starting.");
    }
  };

  return (
    <div className="container">
      <label htmlFor="name" className="name">
        Enter your name
      </label>
      <br />
      <input
        type="text"
        id="name"
        placeholder="Your Name"
        value={name}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleStartPlaying}>Start Playing</button>
    </div>
  );
};

export default WelcomeScreen;
