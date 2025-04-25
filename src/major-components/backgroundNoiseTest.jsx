// src/components/BackgroundTest.jsx
import React from "react";
import "../assets/css/backgroundNoiseTest.css";
import "../assets/css/demonstration.css";

import InputMultipleChoice from "../minor-components/inputMultipleChoice";

const emojiData = [
  { id: 1, emoji: "😡", note: "Intrusive", color: "#ff4d4d" },
  { id: 2, emoji: "😞", note: "Noticeable", color: "#ff9900" },
  { id: 3, emoji: "😐", note: "Slightly noticeable", color: "#ffd633" },
  { id: 4, emoji: "🙂", note: "Not noticeable", color: "#66b3ff" },
  { id: 5, emoji: "😃", note: "No noise", color: "#66ff66" },
];

const BackgroundTest = () => {
  // Turn each into a JSX “choice” block
  const choices = emojiData.map(({ id, emoji, note, color }) => (
    <div
      key={id}
      className="emoji-item-vertical"
      style={{ "--emoji-color": color }}
    >
      <span className="emoji">{emoji}</span>
      <span className="emoji-note">{note}</span>
    </div>
  ));

  return (
    <div className="container">
      <div className="content">
        <h1>Rate your background noise</h1>

        <InputMultipleChoice
          config={{}}
          id="noiseEmojiRating"
          label="" // no extra header, we have our own <h1>
          choices={choices}
          optional={true} // no asterisk
          showTooltip={false}
          wrapperClassName="emoji-scale-vertical"
          labelClassName="" // hide the default question label
          hasCommentBox={false}
        />
      </div>
    </div>
  );
};

export default BackgroundTest;
