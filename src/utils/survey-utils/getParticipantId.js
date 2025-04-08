import { v4 as uuidv4 } from "uuid";
import { browserName, browserVersion, getOs } from "../clientMetadata";
import { fetchConfigVariable } from "../handleConfigVars";
import { conditionalPushToBucket } from "../handleResponse";
import { conditionalInitializeFirebase } from "../handleStorageConfig";
import { isValidEmail as validateEmail } from "../inputValidation";
import { fetchCases } from "../loadAssets";
import { logSessionInfo } from "../localStorage";
import { generateTimeStamp } from "../timestamp";
import { toastError } from "../toast";

/**
 * handles the "Get participant ID" button click event.
 * @param {Object} e - event object
 * @param {Object} formInfo - object containing the form data
 * @param {Object} history - history object
 * @param {string} Version - version of the app
 * @param {function} setRouteIsAllowed - function to set the routeIsAllowed state variable
 */
const handleGetParticipantId = async (e, formInfo, history, Version, setRouteIsAllowed) => {
  e && e.preventDefault();
  /* HANDLING INPUT ERRORS */
  const {
    name,
    country,
    multipleChoiceQuestion,
    degree,
    degreeOther,
    fieldOfExpertise,
    termsOfUse,
    notifications,
    email,
    comments,
    activeYears,
  } = formInfo;
  const uuid = uuidv4();
  // for degree, if "Other" is not selected, one of the other options must be selected; if "Other" is selected, the text field must also be filled out
  const degreeIsValid =
    (!degree.includes("Other") && degree.length > 0) ||
    (degree.includes("Other") && degreeOther !== "");

  // if (name && country && degreeIsValid && fieldOfExpertise.length > 0 && termsOfUse) {
  if (termsOfUse) {
    if (
      (notifications && !email) ||
      (notifications && !validateEmail(email)) ||
      (email && !validateEmail(email))
    ) {
      toastError("Please provide your email address.", "top-center", "email-error");
    } else {
      // the final degree info is the selected degree(s) (excluding "Other") + the text field if "Other" is selected
      let degreeInfo;
      if (degree.includes("Other")) {
        degreeInfo = [...degree.filter((item) => item !== "Other"), degreeOther];
      } else {
        degreeInfo = degree;
      }

      const ParticipantInfo = {
        ParticipantId: uuid,
        Name: name,
        EmailAddress: email,
        Country: country,
        multipleChoiceQuestion: multipleChoiceQuestion,
        Comments: comments,
        Degree: degreeInfo,
        FieldOfExpertise: fieldOfExpertise,
        ActiveYears: parseInt(activeYears, 10),
        Tickbox1: termsOfUse,
        Tickbox2: notifications,
      };
      handleSessionInfo(
        "Registration",
        "Get participant ID",
        ParticipantInfo,
        history,
        Version,
        setRouteIsAllowed
      );
    }
  } else {
    toastError("Please verify mandatory fields.", "top-center", "req-error");
  }
};

/* This function fetches the cases from config.json, update the software information, session event and save data into the local storage*/
const handleSessionInfo = async (
  location,
  buttonType,
  ParticipantInfo,
  history,
  Version,
  setRouteIsAllowed
) => {
  conditionalInitializeFirebase();

  /* FETCH CASE IDS FROM STORAGE */
  setRouteIsAllowed(true);
  let CaseOrder;

  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
  const rootDirectory = fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");

  if (REACT_APP_general?.caseOrder?.cases?.length !== 0) {
    CaseOrder = await fetchCases(
      true,
      null,
      REACT_APP_general["caseOrder"]["cases"],
      REACT_APP_general["caseOrder"]["shuffle"]
    );
  } else {
    CaseOrder = await fetchCases(false, `${rootDirectory}/gallery/cases/`, null, null);
  }
  const SoftwareInfo = {
    SoftwareInfoTag: REACT_APP_general["softwareInfoTag"],
    Version: Version,
    OperatingSystem: getOs(),
    Browser: `${browserName} ${browserVersion}`,
    ScreenResolution: `${window.innerWidth} x ${window.innerHeight}`,
  };
  const SessionEvents = [
    {
      Location: location,
      ButtonType: buttonType,
      Timestamp: generateTimeStamp(),
    },
  ];

  localStorage.setItem("ParticipantInfo", JSON.stringify(ParticipantInfo));
  setRouteIsAllowed(true);

  localStorage.setItem("SessionEvents", JSON.stringify(SessionEvents));
  logSessionInfo("false", location);
  localStorage.setItem("SoftwareInfo", JSON.stringify(SoftwareInfo));
  localStorage.setItem("CaseOrder", JSON.stringify(CaseOrder));

  conditionalPushToBucket();
  history.replace("/survey/background");
};
export { handleGetParticipantId, handleSessionInfo };
