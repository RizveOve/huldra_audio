import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/demonstration.css";
import "../assets/css/visualTest.css";
import palate1 from "../img/Ishihara_03.jpg";
import palate2 from "../img/Ishihara_04.jpg";
import InputTextArea from "../minor-components/inputTextArea";
import { fetchConfigVariable } from "../utils/handleConfigVars";
import { conditionalPushToBucket } from "../utils/handleResponse";
import { handleTextFieldChange } from "../utils/handleTextFieldChange";
import { logSessionInfo } from "../utils/localStorage";

const VisualTest2 = () => {
  const testId = useParams().testId;
  const REACT_APP_test = fetchConfigVariable(`REACT_APP_test`)[testId - 1];

  useEffect(() => {
    logSessionInfo(false, `test${testId}`);
    conditionalPushToBucket();
  }, [testId]);

  // Function to handle input change using handleTextFieldChange
  const handleInputChange = (event, questionId) => {
    handleTextFieldChange(event, { id: questionId });
  };

  return (
    <div className="visualTest">
      <section className="visual-test-title">Visual Acuity Test</section>
      <section className="mainArea">
        <section className="visual-test-palates">
          <img src={palate1} alt="Palate 1" />
          <form>
            <InputTextArea
              id="test3"
              label="Answer for Palate 3"
              onChange={(e) => handleInputChange(e, "test3")}
              optional={true}
            />
          </form>
        </section>

        <section className="visual-test-palates">
          <img src={palate2} alt="Palate 2" />
          <form>
            <InputTextArea
              id="test4"
              label="Answer for Palate 4"
              onChange={(e) => handleInputChange(e, "test4")}
              optional={true}
            />
          </form>
        </section>
      </section>
    </div>
  );
};

export default VisualTest2;
