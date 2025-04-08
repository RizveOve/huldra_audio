import React, { useEffect, useState } from "react";
import "../assets/css/contrastTest.css";
import "../assets/css/demonstration.css";
import InputMultipleChoice from "../minor-components/inputMultipleChoice";

const ScreenContrastTest = () => {
  // Initialize state with saved values from local storage or default to null
  const [selectedOptions, setSelectedOptions] = useState({
    line1: null,
    line2: null,
    line3: null,
    line4: null,
  });

  // Load saved answers from local storage on component mount
  useEffect(() => {
    const savedOptions = localStorage.getItem("contrastTestResults");
    if (savedOptions) {
      setSelectedOptions(JSON.parse(savedOptions));
    }
  }, []);

  // Update selected option and save to local storage
  const handleOptionChange = (line, value) => {
    const updatedOptions = { ...selectedOptions, [line]: value };
    setSelectedOptions(updatedOptions);
    localStorage.setItem("contrastTestResults", JSON.stringify(updatedOptions));
  };

  return (
    <div className="container">
      <h1 className="visual-test-title">Screen Contrast Test</h1>
      <div className="content-grid">
        {/* Line 1 */}
        <div className="color-row">
          <div className="color-bar">
            <div className="color red1"></div>
            <div className="color red2"></div>
            <div className="color red3"></div>
            <div className="color red4"></div>
            <div className="color red5"></div>
          </div>
          <div className="question">
            <InputMultipleChoice
              config={{}}
              label="How many red shades can you identify?"
              id="contrastTest-red"
              choices={["2", "3", "4", "5"]}
              optional={true}
              showTooltip={false}
            />
          </div>
        </div>

        {/* Line 2 */}
        <div className="color-row">
          <div className="color-bar">
            <div className="color yellow1"></div>
            <div className="color yellow2"></div>
            <div className="color yellow3"></div>
          </div>
          <div className="question">
            <InputMultipleChoice
              config={{}}
              label="How many yellow shades can you identify?"
              id="contrastTest-yellow"
              choices={["2", "3", "4", "5"]}
              optional={true}
              showTooltip={false}
            />
          </div>
        </div>

        {/* Line 3 */}
        <div className="color-row">
          <div className="color-bar">
            <div className="color green1"></div>
            <div className="color green2"></div>
            <div className="color green3"></div>
          </div>
          <div className="question">
            <InputMultipleChoice
              config={{}}
              label="How many green shades can you identify?"
              id="contrastTest-green"
              choices={["2", "3", "4", "5"]}
              optional={true}
              showTooltip={false}
            />
          </div>
        </div>

        {/* Line 4 */}
        <div className="color-row">
          <div className="color-bar">
            <div className="color blue1"></div>
            <div className="color blue2"></div>
            <div className="color blue3"></div>
            <div className="color blue4"></div>
          </div>
          <div className="question">
            <InputMultipleChoice
              config={{}}
              label="How many blue shades can you identify?"
              id="contrastTest-blue"
              choices={["2", "3", "4", "5"]}
              optional={true}
              showTooltip={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenContrastTest;
