import React from "react";

const SuccessScreen = ({ score, elapsedTime, onRestart }) => {
  return (
    <div className="success-screen">
      <h2>Congratulations!</h2>
      <p>You've matched all pairs!</p>
      <p>Your Score: {score}</p>
      <p>Time Taken: {formatTime(elapsedTime)}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export default SuccessScreen;
