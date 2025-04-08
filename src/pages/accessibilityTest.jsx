// import "../assets/css/common.css";
import { useParams } from "react-router-dom";
import "../assets/css/demonstration.css";
import "../assets/css/visualTest.css";
import AudioTest from "../major-components/audioTest";
import BackgroundTest from "../major-components/backgroundNoiseTest";
import ScreenContrastTest from "../major-components/contrastTest";
import VisualTest from "../major-components/visualTest";
import VisualTest2 from "../major-components/visualTest2";
import VisualTest3 from "../major-components/visualTest3";
import VisualTest4 from "../major-components/visualTest4";
import VisualTest5 from "../major-components/visualTest5";
import { fetchConfigVariable } from "../utils/handleConfigVars";
import { conditionalPushToBucket } from "../utils/handleResponse";
import { logSessionInfo } from "../utils/localStorage";

const AccessibilityTest = () => {
  const testId = useParams().testId;
  const REACT_APP_test = fetchConfigVariable(`REACT_APP_test`)[testId - 1];

  console.log(REACT_APP_test);

  logSessionInfo(false, `test${testId}`);
  conditionalPushToBucket();

  return (
    <>
      {REACT_APP_test["visualTest"] && <VisualTest />}
      {REACT_APP_test["visualTest2"] && <VisualTest2 />}
      {REACT_APP_test["visualTest3"] && <VisualTest3 />}
      {REACT_APP_test["visualTest4"] && <VisualTest4 />}
      {REACT_APP_test["visualTest5"] && <VisualTest5 />}
      {REACT_APP_test["contrastTest"] && <ScreenContrastTest />}
      {REACT_APP_test["audioTest"] && <AudioTest />}
      {REACT_APP_test["backgroundNoiseTest"] && <BackgroundTest />}
    </>
  );
};
export default AccessibilityTest;
