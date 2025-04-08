import "../assets/css/home.css";
import LoginAnonymousWithID from "../major-components/loginAnonymousWithID";
import LoginNonAnonymous from "../major-components/loginNonAnonymous";
import LoginAnonymousWithoutID from "../major-components/loginAnonymousWithoutID";
import { fetchConfigVariablesBatch } from "../utils/handleConfigVars";

const Home = ({ setRouteIsAllowed, participantId, setParticipantId, Version }) => {
  const { REACT_APP_general, REACT_APP_home } = fetchConfigVariablesBatch([
    "REACT_APP_general",
    "REACT_APP_home",
  ]);
  let pageToRender;
  switch (REACT_APP_general?.loginOption) {
    case "anonymousWithID":
      pageToRender = (
        <LoginAnonymousWithID
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          setParticipantId={setParticipantId}
        />
      );
      break;
    case "anonymousWithoutID":
      pageToRender = (
        <LoginAnonymousWithoutID
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          Version={Version}
        />
      );
      break;
    case "nonAnonymous":
      pageToRender = (
        <LoginNonAnonymous
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          setParticipantId={setParticipantId}
        />
      );
      break;

    default:
      pageToRender = (
        <LoginAnonymousWithID
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          setParticipantId={setParticipantId}
        />
      );
  }
  return (
    <div className="home-welcome">
      <div className="home-header">
        <h2>
          {(REACT_APP_home && REACT_APP_home["title"]) ||
            (REACT_APP_general && REACT_APP_general["appName"])}
        </h2>
        <div className="home-intro">{REACT_APP_home && REACT_APP_home["introText"]}</div>
      </div>
      {pageToRender}
      <span className="home-additional-text">
        {REACT_APP_home && REACT_APP_home["additionalText"]}
      </span>
    </div>
  );
};

export default Home;
