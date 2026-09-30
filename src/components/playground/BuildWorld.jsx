import { useState } from "react";

const palettes = [
  { name: "Ocean", wall: "#16385b", glow: "#7ce8ff" },
  { name: "Lavender", wall: "#38265f", glow: "#c69cff" },
  { name: "Sunset", wall: "#5a2444", glow: "#ff9fc8" },
];

const objects = [
  { id: "plant", icon: "✿", name: "Plant" },
  { id: "lamp", icon: "◉", name: "Lamp" },
  { id: "star", icon: "✦", name: "Star" },
  { id: "cube", icon: "◇", name: "Cube" },
];

export default function BuildWorld() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [placedObjects, setPlacedObjects] = useState(["plant"]);

  const activePalette = palettes[paletteIndex];

  function changePalette() {
    setPaletteIndex((currentIndex) => (currentIndex + 1) % palettes.length);
  }

  function toggleObject(objectId) {
    setPlacedObjects((currentObjects) => {
      if (currentObjects.includes(objectId)) {
        return currentObjects.filter((item) => item !== objectId);
      }

      return [...currentObjects, objectId];
    });
  }

  return (
    <div className="play-game">
      <div
        className="world-preview"
        style={{
          background: `radial-gradient(circle at 50% 15%, ${activePalette.glow}33, transparent 42%), ${activePalette.wall}`,
        }}
      >
        <span className="world-moon">☾</span>

        {objects
          .filter((object) => placedObjects.includes(object.id))
          .map((object) => (
            <span className={`world-object world-${object.id}`} key={object.id}>
              {object.icon}
            </span>
          ))}

        <p>MOOD: {activePalette.name.toUpperCase()}</p>
      </div>

      <button className="playground-button" onClick={changePalette}>
        Change palette ↻
      </button>

      <div className="world-object-buttons">
        {objects.map((object) => (
          <button
            className={placedObjects.includes(object.id) ? "selected" : ""}
            key={object.id}
            onClick={() => toggleObject(object.id)}
          >
            {object.icon} {object.name}
          </button>
        ))}
      </div>
    </div>
  );
}