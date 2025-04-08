import { fetchConfigVariable } from "../handleConfigVars";
import { logSessionEvent } from "../localStorage";

const handlePreviousButton = ({ history, casesCount, setOpenDialog, caseId, demoId, testId }) => {
  const REACT_APP_demonstration = fetchConfigVariable("REACT_APP_demonstration");
  const REACT_APP_test = fetchConfigVariable("REACT_APP_test");

  if (history.location.pathname === "/survey/summary-and-feedback") {
    logSessionEvent("Previous", `Summary and feedback`);
    history.push(`/survey/case${casesCount}`);
  } else if (history.location.pathname.startsWith("/survey/case")) {
    logSessionEvent("Previous", `Case${caseId}`);
    if (caseId > 1) {
      const newCaseId = caseId - 1;
      history.push(`/survey/case${newCaseId}`);
    } else {
      const newDemoId = REACT_APP_demonstration.length;
      history.push(`/survey/demonstration${newDemoId}`);
    }
  } else if (history.location.pathname.startsWith("/survey/demonstration")) {
    logSessionEvent("Previous", `Demonstration${demoId}`);
    if (demoId > 1) {
      const newDemoId = demoId - 1;
      history.push(`/survey/demonstration${newDemoId}`);
    } else {
      const newTestId = REACT_APP_test.length;
      history.push(`/survey/test${newTestId}`);
    }
  } else if (history.location.pathname.startsWith("/survey/test")) {
    logSessionEvent("Previous", `Demonstration${demoId}`);
    if (testId > 1) {
      const newTestId = testId - 1;
      history.push(`/survey/test${newTestId}`);
    } else {
      history.push(`/survey/background`);
    }
  } else if (history.location.pathname === "/survey/background") {
    setOpenDialog(true);
  } else {
    return;
  }
};

export { handlePreviousButton };
