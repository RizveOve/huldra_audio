import React, { useState } from "react";
import "../assets/css/audioTest.css";
import "../assets/css/demonstration.css";
import testAudio from "../img/AudioTest.mp3";

const AudioTest = () => {
  const [rating, setRating] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setRating(selectedValue); // Update the state with the selected value
    localStorage.setItem("audioRating", selectedValue); // Save the value in local storage
  };

  return (
    <div className="container">
      <div className="content">
        <div className="audio-player">
          {/* Audio player using the provided external audio link */}
          <audio controls src={testAudio}>
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="rating-section">
          <h2>Rate the audio quality from 1 to 10</h2>

          {/* Dropdown */}
          <select value={rating} onChange={handleChange} className="dropdown">
            <option value="" disabled>
              Select a rating
            </option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <footer className="footer">
        <button className="previous">Previous</button>
        <button className="alternative">Alternative</button>
        <button className="next">Next</button>
      </footer>
    </div>
  );
};

export default AudioTest;
