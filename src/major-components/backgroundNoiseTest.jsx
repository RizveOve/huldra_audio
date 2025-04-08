import React, { useEffect, useState } from "react";
import "../assets/css/backgroundNoiseTest.css";
import "../assets/css/demonstration.css";

const BackgroundTest = () => {
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("noiseEmojiRating")
      ? parseInt(localStorage.getItem("noiseEmojiRating"))
      : null;
  });

  // Handle the emoji click and save to localStorage
  const handleEmojiClick = (rating) => {
    setSelected(rating);
    localStorage.setItem("noiseEmojiRating", rating); // Save to localStorage
  };

  useEffect(() => {
    // Load the value from localStorage if it exists on component mount
    const savedRating = localStorage.getItem("noiseEmojiRating");
    if (savedRating) {
      setSelected(parseInt(savedRating)); // Set the state to the saved rating
    }
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1>Rate your background noise</h1>
        <div className="emoji-scale-vertical">
          {/* Rendering each emoji with a click event */}
          {[
            { id: 1, emoji: "😡", note: "intrusive", color: "#ff4d4d" },
            { id: 2, emoji: "😞", note: "Noticeable", color: "#ff9900" },
            { id: 3, emoji: "😐", note: "Little noticeable", color: "#ffd633" },
            { id: 4, emoji: "🙂", note: "Not noticeable", color: "#66b3ff" },
            { id: 5, emoji: "😃", note: "No Noise", color: "#66ff66" },
          ].map((item) => (
            <div
              key={item.id}
              className={`emoji-item-vertical ${selected === item.id ? "selected" : ""}`}
              onClick={() => handleEmojiClick(item.id)}
              style={{ backgroundColor: selected === item.id ? item.color : "transparent" }}
            >
              <span className="emoji">{item.emoji}</span>
              <span className="emoji-note">{item.note}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <button className="previous">Previous</button>
        <button className="next">Next</button>
      </footer>
    </div>
  );
};

export default BackgroundTest;
