import { useEffect, useState } from "react";

const colours = ["cyan", "purple", "pink", "green"];

export default function SignalMatch() {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColour, setActiveColour] = useState("");
  const [message, setMessage] = useState("Press start to begin.");
  const [level, setLevel] = useState(0);

  function flashColour(colour, delay) {
    window.setTimeout(() => {
      setActiveColour(colour);

      window.setTimeout(() => {
        setActiveColour("");
      }, 380);
    }, delay);
  }

  function showSequence(newSequence) {
    setIsShowingSequence(true);
    setMessage("Watch the signal...");

    newSequence.forEach((colour, index) => {
      flashColour(colour, index * 620);
    });

    window.setTimeout(() => {
      setIsShowingSequence(false);
      setMessage("Your turn.");
    }, newSequence.length * 620 + 150);
  }

  function startGame() {
    const firstColour = colours[Math.floor(Math.random() * colours.length)];

    setSequence([firstColour]);
    setPlayerSequence([]);
    setLevel(1);
    showSequence([firstColour]);
  }

  function handleColourClick(colour) {
    if (isShowingSequence || sequence.length === 0) return;

    const nextPlayerSequence = [...playerSequence, colour];
    const currentStep = nextPlayerSequence.length - 1;

    setPlayerSequence(nextPlayerSequence);

    if (colour !== sequence[currentStep]) {
      setMessage(`Signal lost. You reached level ${level}.`);
      setSequence([]);
      setPlayerSequence([]);
      return;
    }

    if (nextPlayerSequence.length === sequence.length) {
      const nextColour = colours[Math.floor(Math.random() * colours.length)];
      const nextSequence = [...sequence, nextColour];

      setMessage("Correct. Loading next signal...");
      setSequence(nextSequence);
      setPlayerSequence([]);
      setLevel((currentLevel) => currentLevel + 1);

      window.setTimeout(() => {
        showSequence(nextSequence);
      }, 700);
    }
  }

  useEffect(() => {
    return () => {
      setActiveColour("");
    };
  }, []);

  return (
    <div className="play-game">
      <div className="game-status-row">
        <span>LEVEL: {level}</span>
        <span>{message}</span>
      </div>

      <div className="signal-board">
        {colours.map((colour) => (
          <button
            key={colour}
            className={`signal-pad ${colour} ${
              activeColour === colour ? "lit" : ""
            }`}
            onClick={() => handleColourClick(colour)}
            disabled={isShowingSequence}
            aria-label={`${colour} signal`}
          />
        ))}
      </div>

      <button className="playground-button" onClick={startGame}>
        {level === 0 ? "Start sequence ▶" : "Restart sequence ↻"}
      </button>
    </div>
  );
}