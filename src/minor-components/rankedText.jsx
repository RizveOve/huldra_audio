import React, { useEffect, useState } from "react";
import { getAsset } from "../utils/loadAssets";

const RankedText = ({ url, className, label, scrollClassName }) => {
  const [textContent, setTextContent] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(true);

    (async () => {
      const textUrl = await getAsset(url);
      const fetchText = async () => {
        try {
          const response = await fetch(textUrl);
          const text = await response.text();
          setTextContent(text);
        } catch (error) {
          console.error("Error fetching text:", error);
        }
      };

      fetchText();
    })();

    return () => setSubscribed(false);
  }, [url, subscribed]);

  // Function to convert newlines to <br> tags
  const convertNewlinesToBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className={className}>
      <span className="text-label">{label}</span>
      <p className={scrollClassName}>{convertNewlinesToBreaks(textContent)}</p>
    </div>
  );
};

export default RankedText;
