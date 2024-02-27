import React, { useState, useEffect } from "react";
import SuccessScreen from "../SuccessScreen";

const GameBoard = () => {
  const gridSize = 4;
  const totalPairs = (gridSize * gridSize) / 2;

  const generateInitialTiles = () => {
    const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const shuffledSymbols = [...symbols, ...symbols].sort(
      () => Math.random() - 0.5
    );

    return Array.from({ length: gridSize * gridSize }, (_, index) => ({
      id: index,
      symbol: shuffledSymbols[index],
      isHidden: true,
    }));
  };

  const [tiles, setTiles] = useState(generateInitialTiles());
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const playerNameFromStorage = localStorage.getItem("playerName");
  const [playerName, setPlayerName] = useState(playerNameFromStorage || "");

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (selectedTiles.length === 2) {
      const checkMatchTimeout = setTimeout(() => {
        checkMatch();
      }, 500);

      return () => clearTimeout(checkMatchTimeout);
    }
  }, [selectedTiles]);

  const handleTileClick = (id) => {
    if (selectedTiles.length < 2) {
      const updatedTiles = tiles.map((tile) =>
        tile.id === id ? { ...tile, isHidden: false } : tile
      );

      setTiles(updatedTiles);
      setSelectedTiles([...selectedTiles, id]);
    }
  };

  const checkMatch = () => {
    const [firstTileId, secondTileId] = selectedTiles;
    const tilesCopy = [...tiles];

    if (tiles[firstTileId].symbol === tiles[secondTileId].symbol) {
      tilesCopy[firstTileId].isHidden = true;
      tilesCopy[secondTileId].isHidden = true;
      setMatchedPairs(matchedPairs + 1);
      setScore(score + 1);
    } else {
      tilesCopy[firstTileId].isHidden = true;
      tilesCopy[secondTileId].isHidden = true;
      setScore(Math.max(score - 1, 0));
    }

    setTiles(tilesCopy);
    setSelectedTiles([]);
  };

  const isGameOver = matchedPairs === totalPairs;

  return (
    <div className="game-board">
      {isGameOver ? (
        <SuccessScreen
          score={score}
          elapsedTime={elapsedTime}
          onRestart={() => {
            setTiles(generateInitialTiles());
            setSelectedTiles([]);
            setMatchedPairs(0);
            setScore(0);
            setElapsedTime(0);
          }}
        />
      ) : (
        <>
          <h2>Tile Matching Game</h2>
          <div className="score-and-time">
            <p>Score: {score}</p>
            <p>Time: {formatTime(elapsedTime)}</p>
          </div>
          <h1 className="label-name">{playerName}</h1>
          <div className="grid">
            {tiles.map((tile) => (
              <div
                key={tile.id}
                className={`tile ${tile.isHidden ? "hidden" : ""}`}
                onClick={() => handleTileClick(tile.id)}
              >
                {tile.isHidden ? "?" : tile.symbol}
              </div>
            ))}
          </div>
        </>
      )}
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

export default GameBoard;
