import { useEffect, useState } from "react";

export default function StarCatcher() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [starPosition, setStarPosition] = useState({ x: 50, y: 50 });

  function moveStar() {
    setStarPosition({
      x: Math.floor(Math.random() * 76) + 10,
      y: Math.floor(Math.random() * 65) + 12,
    });
  }

  function startGame() {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    moveStar();
  }

  function catchStar() {
    setScore((currentScore) => currentScore + 1);
    moveStar();
  }

  useEffect(() => {
    if (!isPlaying) return;

    const countdown = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(countdown);
          setIsPlaying(false);
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdown);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const movementTimer = window.setInterval(moveStar, 900);

    return () => window.clearInterval(movementTimer);
  }, [isPlaying]);

  return (
    <div className="play-game">
      <div className="game-status-row">
        <span>SCORE: {score}</span>
        <span>TIME: {timeLeft}s</span>
      </div>

      <div className="star-game-area">
        {isPlaying && (
          <button
            className="catch-star"
            onClick={catchStar}
            style={{
              left: `${starPosition.x}%`,
              top: `${starPosition.y}%`,
            }}
            aria-label="Catch the star"
          >
            ✦
          </button>
        )}

        {!isPlaying && timeLeft === 15 && (
          <p>Catch as many stars as possible.</p>
        )}

        {!isPlaying && timeLeft === 0 && (
          <p>Run complete: {score} stars caught.</p>
        )}
      </div>

      <button className="playground-button" onClick={startGame}>
        {timeLeft === 0 ? "Play again ↻" : "Start game ▶"}
      </button>
    </div>
  );
}