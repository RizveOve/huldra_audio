import GenericButton from "../minor-components/genericButton";
import "../assets/css/home.css";
import { useHistory } from "react-router-dom";
import { handleLogin } from "../utils/handleLogin";
import { useEffect } from "react";

const LoginNonAnonymous = ({ setRouteIsAllowed, participantId, setParticipantId, Version }) => {
  const history = useHistory();

  /* RESET THE PARTICIPANT ID FOR ALTERNATIVE: NON-ANONYMOUS LOGIN, 
    PARTICIPANT MUST ENTER THE PARTICIPANT ID TO START THE SURVEY */
  useEffect(() => {
    setParticipantId("");
  }, []);

  return (
    <div className="home-registration-wrapper">
      <div className="home-login">
        <div className="home-participant-id-field">
          <input
            autoComplete="off"
            onChange={(e) => {
              setParticipantId(e.currentTarget.value);
            }}
            type="text"
            name="login"
            id="login"
            placeholder="Participant ID"
          />
        </div>
        <GenericButton
          onClick={() => {
            handleLogin(participantId, history, setRouteIsAllowed, Version);
          }}
          hasIcon={true}
          className={"btn"}
          id="start-survey-button"
          iconClassName={"fa fa-play mr-2"}
          label="Start survey"
        />
      </div>
    </div>
  );
};

export default LoginNonAnonymous;
