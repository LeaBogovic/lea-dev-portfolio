import { useState } from "react";
import "./Playground.css";
import StarCatcher from "./StarCatcher";
import BuildWorld from "./BuildWorld";
import SignalMatch from "./SignalMatch";

const games = {
  buildWorld: {
    label: "Build a World",
    file: "build_world.exe",
    description: "Toggle objects and colour moods to build a tiny interactive scene.",
  },
  signalMatch: {
    label: "Signal Match",
    file: "signal_match.exe",
    description: "Memorise and repeat a growing colour sequence.",
  },
  starCatcher: {
    label: "Star Catcher",
    file: "star_catcher.exe",
    description: "Catch moving stars before the timer ends.",
  },
};

export default function Playground() {
  const [activeGame, setActiveGame] = useState("buildWorld");

  return (
    <section className="playground-section reveal" id="playground">
      <div className="section-heading">
        <p className="eyebrow">PLAYGROUND://INTERACTIVE_EXPERIMENTS</p>
        <h2>Small games, different code skills.</h2>
        <p>
          A few playful mini-experiences built to show different bits of logic,
          state, interaction and UI behaviour.
        </p>
      </div>

      <div className="playground-shell">
        <aside className="playground-sidebar">
          {Object.entries(games).map(([key, game]) => (
            <button
              key={key}
              className={`playground-tab ${activeGame === key ? "active" : ""}`}
              onClick={() => setActiveGame(key)}
            >
              <span className="playground-file">{game.file}</span>
              <strong>{game.label}</strong>
              <small>{game.description}</small>
            </button>
          ))}
        </aside>

        <div className="playground-window">
          <div className="playground-window-bar">
            <span>{games[activeGame].file}</span>

            <div className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="playground-window-content">
            {activeGame === "buildWorld" && <BuildWorld />}
            {activeGame === "signalMatch" && <SignalMatch />}
            {activeGame === "starCatcher" && <StarCatcher />}
          </div>
        </div>
      </div>
    </section>
  );
}