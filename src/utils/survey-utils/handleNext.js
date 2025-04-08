import { fetchConfigVariable } from "../handleConfigVars";
import { logSessionEvent } from "../localStorage";

const handleNextButton = ({ history, casesCount, caseId, demoId, testId }) => {
  const REACT_APP_demonstration = fetchConfigVariable("REACT_APP_demonstration");
  const REACT_APP_test = fetchConfigVariable("REACT_APP_test");

  console.log(testId);

  if (history.location.pathname === "/survey/background") {
    logSessionEvent("Next", "Background");

    if (REACT_APP_test.length === 0 && REACT_APP_demonstration.length === 0) {
      history.push(`/survey/case1`);
    } else if (REACT_APP_test.length === 0) {
      history.push(`/survey/demonstration1`);
    } else {
      history.push(`/survey/test1`);
    }
  } else if (history.location.pathname.startsWith("/survey/test")) {
    logSessionEvent("Next", `Test${testId}`);

    if (testId < REACT_APP_test.length) {
      const newTestId = testId + 1;
      history.push(`/survey/test${newTestId}`);
    } else {
      history.push(`/survey/demonstration1`);
    }
  } else if (history.location.pathname.startsWith("/survey/demonstration")) {
    logSessionEvent("Next", `Demonstration${demoId}`);

    if (demoId < REACT_APP_demonstration.length) {
      const newDemoId = demoId + 1;
      history.push(`/survey/demonstration${newDemoId}`);
    } else {
      history.push(`/survey/case1`);
    }
  } else if (history.location.pathname.startsWith("/survey/case")) {
    logSessionEvent("Next", `Case${caseId}`);

    if (caseId < casesCount) {
      const newCaseId = caseId + 1;
      history.push(`/survey/case${newCaseId}`);
    } else {
      history.push(`/survey/summary-and-feedback`);
    }
  } else {
    return;
  }
};

export { handleNextButton };
