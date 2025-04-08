import React from "react";
import { useParams } from "react-router-dom";
import "../assets/css/demonstration.css";
import ParagraphWithList from "../minor-components/paragraphWithList";
import RankedAudio from "../minor-components/rankedAudio";
import RankedImage from "../minor-components/rankedImage";
import RankedVideo from "../minor-components/rankedVideo";
import { fetchConfigVariable } from "../utils/handleConfigVars";
import { conditionalPushToBucket } from "../utils/handleResponse";
import { logSessionInfo } from "../utils/localStorage";

const Demonstration = () => {
  const demoId = useParams().demoId;
  const REACT_APP_demonstration = fetchConfigVariable(`REACT_APP_demonstration`)[demoId - 1];

  logSessionInfo(false, `demonstration${demoId}`);
  conditionalPushToBucket();

  return (
    <div className="demonstration-wrapper">
      {(REACT_APP_demonstration["textBefore"] ||
        REACT_APP_demonstration["textAfter"] ||
        REACT_APP_demonstration["listOptions"]) && (
        <ParagraphWithList
          listClassName={REACT_APP_demonstration["listClassName"]}
          textClassName={REACT_APP_demonstration["textClassName"]}
          textBefore={REACT_APP_demonstration["textBefore"]}
          textAfter={REACT_APP_demonstration["textAfter"]}
          listOptions={REACT_APP_demonstration["listOptions"]}
        />
      )}
      <p style={{ textAlign: "left", paddingLeft: "60px" }}>
        In the following, In this survey, you will complete a series of basic listening tasks. Each
        task works as follows:
      </p>
      <ul style={{ textAlign: "left" }}>
        <li>You will hear a short audio description of a scene or situation.</li>
        <li>
          Some audio clips might:
          <ul>
            <li>Have clear, undistorted sound.</li>
            <li>Contain noticeable distortion or lower quality.</li>
            <li>Include loud background noise.</li>
          </ul>
        </li>
        <li>Select the image that best matches the content described in the audio.</li>
      </ul>
      <p style={{ textAlign: "left", paddingLeft: "60px" }}>
        We ask you to rank the answers based on which one you find most appropriate. Please
        carefully look at the image and both explanations before you provide your ranking. Once you
        click on one of the explanations, your ranking will appear on the right.
      </p>
      {REACT_APP_demonstration["hasImage"] && (
        <RankedImage
          path={REACT_APP_demonstration["imagePath"]}
          className={REACT_APP_demonstration["imageClassName"]}
          wrapperClassName={REACT_APP_demonstration["wrapperClassName"]}
        />
      )}
      {REACT_APP_demonstration["hasVideo"] && (
        <RankedVideo
          url={REACT_APP_demonstration["videoPath"]}
          height={REACT_APP_demonstration["videoHeight"]}
          width={REACT_APP_demonstration["videoWidth"]}
        />
      )}
      {REACT_APP_demonstration["hasAudio"] && (
        <RankedAudio
          url={REACT_APP_demonstration["audioPath"]}
          height={REACT_APP_demonstration["audioHeight"]}
          width={REACT_APP_demonstration["audioWidth"]}
        />
      )}
    </div>
  );
};

export default Demonstration;
