import React from "react";
import "../assets/css/audioTest.css";
import "../assets/css/demonstration.css";

import testAudio from "../img/AudioTest.mp3";
import InputLikert from "../minor-components/inputLikert";

const AudioTest = () => {
  const likertQuestions = [
    {
      label: "Rate the audio quality from 1 (very poor) to 10 (excellent)",
      size: 10,
    },
  ];

  return (
    <div className="container">
      <div className="content">
        <div className="audio-player">
          <audio controls src={testAudio}>
            Your browser does not support the audio element.
          </audio>
        </div>

        <div
          className="rating-section"
          style={{
            display: "flex",
            justifyContent: "center",
            // if you need vertical centering, you can also add alignItems: "center"
          }}
        >
          <InputLikert
            id="audio-quality"
            label="How would you rate the audio quality?"
            likertWrapperClassName="likert-centered"
            titleClassName="radio-question"
            optional={true} // ← this suppresses the Asterisk
            likertQuestions={likertQuestions}
          />
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
