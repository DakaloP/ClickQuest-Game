import React, { useState } from "react";

export default function GameArea({ onClick, isEvasive, teleport }) {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [isVisible, setIsVisible] = useState(true);

  // Generate a random position for the sprite
  const getRandomPosition = () => {
    const top = Math.floor(Math.random() * 70) + 10;
    const left = Math.floor(Math.random() * 70) + 10;
    return { top: `${top}%`, left: `${left}%` };
  };

  // Handle click
  const handleClick = () => {
    if (!isVisible) return; // If hidden, ignore clicks
    onClick?.(); // Optional chaining to avoid errors if not provided

    if (teleport) {
      setIsVisible(false);
      const delay = Math.random() * 1000 + 500; // Random delay between 500ms to 1500ms
      setTimeout(() => {
        setPosition(getRandomPosition());
        setIsVisible(true);
      }, delay);
    } else {
      setPosition(getRandomPosition());
    }
  };

  // Handle hover (evasive movement)
  const handleHover = () => {
    if (isEvasive) {
      setPosition(getRandomPosition());
    }
  };

  return (
    <div className="position-relative w-100" style={{ height: "60vh" }}>
      {isVisible && (
        <button
          onClick={handleClick}
          onMouseEnter={handleHover}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            transform: "translate(-50%, -50%)",
            transition: "top 0.3s, left 0.3s ease",
          }}
          className={`btn ${isEvasive ? "btn-danger" : "btn-warning"}`}
        >
       Click Me!😊
        </button>
      )}
    </div>
  );
}
