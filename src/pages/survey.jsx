import Modal from "@mui/material/Modal";
import React, { useContext, useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { Route, Switch, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import version from "../VERSION.md";
import { AppContext } from "../context/appContext";
import ConfirmationDialog from "../minor-components/confirmationDialog";
import Footer from "../minor-components/footer";
import ProtectedRoute from "../minor-components/protectedRoute";
import CaseWrapper from "../survey-components/caseWrapper";
import HeaderWrapper from "../survey-components/headerWrapper";
import { handleFinalResponse } from "../utils/handleResponse";
import { validateFeedbackForm } from "../utils/inputValidation";
import { logSessionEvent, logSessionInfo } from "../utils/localStorage";
import { getButtonProps } from "../utils/survey-utils/getButtonProps";
import { handleGetParticipantId } from "../utils/survey-utils/getParticipantId";
import { handleNextButton } from "../utils/survey-utils/handleNext";
import { handlePreviousButton } from "../utils/survey-utils/handlePrevious";
import { updateDegree } from "../utils/survey-utils/registration-utils";
import { useCustomHotkeys } from "../utils/survey-utils/useCustomHotkeys";
import { toastError } from "../utils/toast";
import AccessibilityTest from "./accessibilityTest";
import Background from "./background";
import Demonstration from "./demonstration";
import End from "./end";
import Home from "./home";
import Registration from "./registration";
import SummaryAndFeedback from "./summaryAndFeedback";

const Survey = ({
  history,
  REACT_APP_registration,
  REACT_APP_summaryAndFeedback,
  REACT_APP_end,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEndDialog, setOpenEndDialog] = useState(false);
  const [Version, setVersion] = useState("");
  const [disableRegistration] = useState(false);
  const [routeIsAllowed, setRouteIsAllowed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // states for the registration form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState([]);
  const [comments, setComments] = useState("");
  const [degree, setDegree] = useState([]);
  const [degreeOther, setDegreeOther] = useState("");
  const [fieldOfExpertise, setFieldOfExpertise] = useState([]);
  const [activeYears, setActiveYears] = useState("");
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [notifications, setNotifications] = useState(false);

  // state for the home page
  const savedParticipantId =
    JSON.parse(localStorage.getItem("ParticipantInfo"))?.ParticipantId || "";
  const [participantId, setParticipantId] = useState(savedParticipantId);

  const {
    disableNextButton,
    setDisableNextButton,
    casesCount,
    setCasesCount,
    REACT_APP_general,
    getCasesCount,
  } = useContext(AppContext);

  // get the case id / demo id from the url and convert it to an integer
  const caseId = parseInt(useParams().caseId, 10);
  const demoId = parseInt(useParams().demoId, 10);
  const testId = parseInt(useParams().testId, 10);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleEndDialogClose = () => {
    setOpenEndDialog(false);
  };

  useEffect(() => {
    setSubscribed(true);
    setRouteIsAllowed(localStorage.getItem("ParticipantInfo") ? true : false);
    setCasesCount(getCasesCount);
    subscribed === true &&
      fetch(version)
        .then((res) => res.text())
        .then((text) => setVersion(text.replace(/\s+/g, "")));
    return () => setSubscribed(false);
  }, [setCasesCount, getCasesCount, subscribed]);

  // use configuration parameter to allow/disallow proceeding to the next page without answering
  useEffect(() => {
    // only works on case pages
    if (history.location.pathname.startsWith("/survey/case")) {
      const allowProceedingWithoutAnswering = REACT_APP_general["allowProceedingWithoutAnswering"];
      if (allowProceedingWithoutAnswering) {
        setDisableNextButton(false);
      }
    }
  }, [history.location.pathname, REACT_APP_general, setDisableNextButton]);

  const onActiveYearsChange = (e) => {
    setActiveYears(e.currentTarget.value);
  };
  const onFieldOfExpertiseChange = (option, state) => {
    setFieldOfExpertise(option, state, degree);
  };
  const handleDegreeChange = (option, state) => {
    setDegree(updateDegree(option, state, degree));
  };

  const handleOtherDegreeChange = (value) => {
    setDegreeOther(value);
  };

  const onNameChange = (e) => {
    setName(e.currentTarget.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onCountryChange = (e) => {
    setCountry(e.currentTarget.value);
  };
  const onMultipleChoiceChange = (selectedChoices) => {
    setMultipleChoiceQuestion(selectedChoices);
    console.log("Selected Choices:", selectedChoices);
  };

  const onCommentsChange = (e) => {
    setComments(e.currentTarget.value);
  };

  /* let showControls = history.location.pathname !== "/survey/end";
  let pageIsFeedBack =
    history.location.pathname === "/survey/summary-and-feedback";
  let pageIsBackground = history.location.pathname === "/survey/background";
  let pageIsDemonstration =
    history.location.pathname === "/survey/demonstration"; */
  useBeforeunload(() => "You'll lose your data!");

  const submitSurvey = () => {
    setOpenEndDialog(false);

    logSessionEvent("End survey", "Summary and feedback");

    logSessionInfo(true, "summary-and-feedback");

    handleFinalResponse();

    history.replace("/survey/end");
  };

  const handleEndSurvey = () => {
    const FeedbackFormAnswers = JSON.parse(localStorage.getItem("FeedbackFormAnswers")) || {};
    if (REACT_APP_summaryAndFeedback["feedbackForm"].display === false) {
      setOpenEndDialog(true);
    } else {
      let hasError = validateFeedbackForm(
        REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions,
        FeedbackFormAnswers
      ).hasError;
      if (hasError) {
        toastError("Please verify mandatory fields.", "top-center", "req-error");
      } else {
        setOpenEndDialog(true);
      }
    }
  };

  const handleNext = () => {
    handleNextButton({
      history,
      casesCount,
      caseId,
      demoId,
      testId,
    });
  };

  const handlePrevious = () => {
    handlePreviousButton({
      history,
      casesCount,
      setOpenDialog,
      caseId,
      demoId,
      testId,
    });
  };

  const getParticipantId = async (e) => {
    const formInfo = {
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
    };

    await handleGetParticipantId(e, formInfo, history, Version, setRouteIsAllowed);
  };

  const footerButtonProps = getButtonProps({
    history,
    getParticipantId,
    handlePrevious,
    handleNext,
    handleEndSurvey,
    disableNextButton,
    REACT_APP_general,
  });

  useCustomHotkeys({
    disableNextButton,
    setDisableNextButton,
    handleNext,
    setName,
    setEmail,
    setCountry,
    setMultipleChoiceQuestion,
    setDegree,
    setFieldOfExpertise,
    setActiveYears,
    setComments,
    setTermsOfUse,
    setOpenEndDialog,
    participantId,
    history,
    setRouteIsAllowed,
    getParticipantId,
  });

  return (
    <div
      className={
        history.location.pathname === "/survey/registration"
          ? "full-scroll-survey-wrapper-no-padding"
          : "full-scroll-survey-wrapper"
      }
    >
      <Modal
        className="modal"
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ConfirmationDialog
          dialogQuestion={"Are you sure you want to go back?"}
          cancelText={"Cancel"}
          confirmText={"Yes"}
          onCancel={() => setOpenDialog(false)}
          onConfirm={() => {
            history.replace("/");
          }}
          onClick={() => {
            setOpenDialog(false);
          }}
        />
      </Modal>
      <Modal
        className="modal"
        open={openEndDialog}
        onClose={handleEndDialogClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ConfirmationDialog
          dialogQuestion={"Do you want to submit your answers?"}
          cancelText={"Cancel"}
          confirmText={"Submit"}
          onCancel={() => setOpenEndDialog(false)}
          onConfirm={() => submitSurvey()}
          onClick={() => {
            setOpenEndDialog(false);
          }}
        />
      </Modal>
      <HeaderWrapper />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <ToastContainer />
      <Switch>
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/summary-and-feedback"
          exact
          render={(props) => (
            <SummaryAndFeedback
              {...props}
              REACT_APP_summaryAndFeedback={REACT_APP_summaryAndFeedback}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/end"
          exact
          render={(props) => <End {...props} REACT_APP_end={REACT_APP_end} />}
        />

        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/background"
          exact
          render={() => <Background />}
        />
        <Route
          routeIsAllowed={routeIsAllowed}
          path={`/survey/test:testId`}
          exact
          render={() => <AccessibilityTest />}
        />

        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path={`/survey/demonstration:demoId`}
          exact
          render={() => <Demonstration />}
        />
        <Route
          path="/survey/registration"
          exact
          render={(props) => (
            <Registration
              {...props}
              onCountryChange={onCountryChange}
              onMultipleChoiceChange={onMultipleChoiceChange}
              onCommentsChange={onCommentsChange}
              handleDegreeChange={handleDegreeChange}
              handleOtherDegreeChange={handleOtherDegreeChange}
              degreeOther={degreeOther}
              onFieldOfExpertiseChange={onFieldOfExpertiseChange}
              onActiveYearsChange={onActiveYearsChange}
              setTermsOfUse={setTermsOfUse}
              setNotifications={setNotifications}
              disableRegistration={disableRegistration}
              getParticipantId={getParticipantId}
              onNameChange={onNameChange}
              onEmailChange={onEmailChange}
              REACT_APP_registration={REACT_APP_registration}
              blur={false}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path={`/survey/case:caseId`}
          exact
          render={() => <CaseWrapper />}
        />
        <Route path="/survey/home">
          <Home
            setRouteIsAllowed={setRouteIsAllowed}
            participantId={participantId}
            setParticipantId={setParticipantId}
            Version={Version}
          />
        </Route>
      </Switch>

      <Footer {...footerButtonProps} />
    </div>
  );
};

export default Survey;
