// import React from "react";
// import InputRadio from "../minor-components/inputRadio";
// import InputTextArea from "../minor-components/inputTextArea";
// import InputTextField from "../minor-components/inputTextField";
// import InputTickbox from "../minor-components/inputTickbox";

// const Registration = ({
//   onCountryChange,
//   onCommentsChange,
//   handleDegreeChange,
//   handleOtherDegreeChange,
//   degreeOther,
//   onNameChange,
//   onEmailChange,
//   onFieldOfExpertiseChange,
//   onActiveYearsChange,
//   setTermsOfUse,
//   setNotifications,
//   REACT_APP_registration,
//   blur,
// }) => {
//   return (
//     <div className="registration-form-wrapper">
//       <form id="registration-form">
//         <div className="horizontal-sections">
//           <div className="vertical-section">
//             <InputTextField
//               label={REACT_APP_registration && REACT_APP_registration["Q1"].label}
//               id="name"
//               onChange={(e) => onNameChange(e)}
//               optional={false}
//             />

//             <InputTextField
//               label={REACT_APP_registration && REACT_APP_registration["Q2"].label}
//               id="email"
//               onChange={(e) => onEmailChange(e)}
//               optional={false}
//             />

//             <InputTextArea
//               id="comments"
//               label={REACT_APP_registration && REACT_APP_registration["Q4"].label}
//               onChange={(e) => onCommentsChange(e)}
//               optional={false}
//               blur={blur}
//             />
//           </div>
//           <div className="vertical-section">
//             <InputRadio
//               label={REACT_APP_registration && REACT_APP_registration["Q5"].label}
//               onChange={handleDegreeChange}
//               onTextChange={handleOtherDegreeChange}
//               degreeOther={degreeOther}
//               optional={true}
//               options={[
//                 ["BSc", false, ""],
//                 ["MSc", false, ""],
//                 ["PhD", false, ""],
//                 ["Other", true, "please specify"],
//               ]}
//               showTooltip={REACT_APP_registration && REACT_APP_registration["Q5"].showTooltip}
//               tooltipMessage={REACT_APP_registration && REACT_APP_registration["Q5"].tooltipMessage}
//             />

//             <InputTextField
//               onChange={(e) => onFieldOfExpertiseChange(e)}
//               name="field-of-expertise"
//               id="field-of-expertise"
//               label={REACT_APP_registration && REACT_APP_registration["Q6"].label}
//               showTooltip={REACT_APP_registration && REACT_APP_registration["Q6"].showTooltip}
//               optional={false}
//               tooltipMessage={REACT_APP_registration && REACT_APP_registration["Q6"].tooltipMessage}
//             />
//             {/* <InputTextField
//               onChange={(e) => onActiveYearsChange(e)}
//               id="active-years"
//               name="active-years"
//               label={REACT_APP_registration && REACT_APP_registration["Q7"].label}
//               showTooltip={REACT_APP_registration && REACT_APP_registration["Q7"].showTooltip}
//               optional={true}
//               tooltipMessage={REACT_APP_registration && REACT_APP_registration["Q7"].tooltipMessage}
//             /> */}
//           </div>
//         </div>
//         <div className="terms">
//           <InputTickbox
//             onChange={(value) => setTermsOfUse(value)}
//             label={REACT_APP_registration && REACT_APP_registration["Q8"].label}
//             id={"terms-of-use"}
//             optional={false}
//           />
//           <InputTickbox
//             onChange={(value) => setNotifications(value)}
//             label={REACT_APP_registration && REACT_APP_registration["Q9"].label}
//             id={"receive-notifications"}
//             optional={true}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Registration;

// import React from "react";
// import InputRadio from "../minor-components/inputRadio";

// const Registration = ({
//   onSoccerFanChange,
//   onGenderChange,
//   onAgeChange,
//   REACT_APP_registration,
//   blur,
// }) => {
//   return (
//     <div className="registration-form-wrapper">
//       <form id="registration-form">
//         <div className="horizontal-sections">
//           <div className="vertical-section">
//             <InputRadio
//               label={REACT_APP_registration && REACT_APP_registration["Q1"].label}
//               id="soccerFan"
//               onChange={(e) => onSoccerFanChange(e)}
//               optional={false}
//               options={[
//                 ["Yes", false, ""],
//                 ["No", false, ""],
//               ]}
//             />
//             <InputRadio
//               label={REACT_APP_registration && REACT_APP_registration["Q2"].label}
//               id="soccerFan"
//               onChange={(e) => onSoccerFanChange(e)}
//               optional={true}
//               options={[
//                 ["Yes", false, ""],
//                 ["No", false, ""],
//               ]}
//             />
//             <InputRadio
//               label={REACT_APP_registration && REACT_APP_registration["Q3"].label}
//               id="gender"
//               onChange={(e) => onGenderChange(e)}
//               optional={true}
//               options={[
//                 ["Male", false, ""],
//                 ["Female", false, ""],
//                 ["Other", false, ""],
//               ]}
//             />
//           </div>
//           <div className="vertical-section">
//             <InputRadio
//               label={REACT_APP_registration && REACT_APP_registration["Q4"].label}
//               id="age"
//               onChange={(e) => onAgeChange(e)}
//               optional={false}
//               options={[
//                 ["Below 18", false, ""],
//                 ["18-29", false, ""],
//                 ["30-39", false, ""],
//                 ["40-49", false, ""],
//                 ["50-59", false, ""],
//                 ["60-69", false, ""],
//                 ["70+", false, ""],
//               ]}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Registration;

// import React from "react";
// import InputMultipleChoice from "../minor-components/inputMultipleChoice";

// const Registration = ({
//   onSoccerFanChange,
//   onGenderChange,
//   onAgeChange,
//   onMultipleChoiceChange, // Add a handler for multiple choice
//   REACT_APP_registration,
//   blur,
// }) => {
//   return (
//     <div className="registration-form-wrapper">
//       <form id="registration-form">
//         <div className="horizontal-sections">
//           <div className="vertical-section">
//             <InputRadio
//               label={REACT_APP_registration?.Q1?.label}
//               id="soccerFan"
//               onChange={onSoccerFanChange}
//               optional={false}
//               options={[
//                 ["Yes", false, ""],
//                 ["No", false, ""],
//               ]}
//             />

//             <InputRadio
//               label={REACT_APP_registration?.Q2?.label}
//               id="soccerFan"
//               onChange={onSoccerFanChange}
//               optional={true}
//               options={[
//                 ["Yes", false, ""],
//                 ["No", false, ""],
//               ]}
//             />

//             <InputRadio
//               label={REACT_APP_registration?.Q3?.label}
//               id="gender"
//               onChange={onGenderChange}
//               optional={true}
//               options={[
//                 ["Male", false, ""],
//                 ["Female", false, ""],
//                 ["Other", false, ""],
//               ]}
//             />

//             {/* 🆕 Multiple Choice Question */}
//             <InputMultipleChoice
//               config={REACT_APP_registration}
//               label={REACT_APP_registration?.Q5?.label}
//               id="multipleChoiceQuestion"
//               choices={["Option 1", "Option 2", "Option 3", "Other"]}
//               optional={true}
//               showTooltip={true}
//               tooltipMessage="Choose one or more options"
//               onChange={onMultipleChoiceChange}
//             />
//           </div>

//           <div className="vertical-section">
//             <InputRadio
//               label={REACT_APP_registration?.Q4?.label}
//               id="age"
//               onChange={onAgeChange}
//               optional={true}
//               options={[
//                 ["Below 18", false, ""],
//                 ["18-29", false, ""],
//                 ["30-39", false, ""],
//                 ["40-49", false, ""],
//                 ["50-59", false, ""],
//                 ["60-69", false, ""],
//                 ["70+", false, ""],
//               ]}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Registration;

import React from "react";
import InputMultipleChoice from "../minor-components/inputMultipleChoice";
import InputTextField from "../minor-components/inputTextField";
import InputTickbox from "../minor-components/inputTickbox";

const logMultipleChoise = (e) => {
  console.log(e);
};

const Registration = ({
  onCountryChange,
  onCommentsChange,
  handleDegreeChange,
  handleOtherDegreeChange,
  degreeOther,
  onNameChange,
  onEmailChange,
  onFieldOfExpertiseChange,
  onActiveYearsChange,
  onMultipleChoiceChange,
  setTermsOfUse,
  setNotifications,
  REACT_APP_registration,
  blur,
}) => {
  return (
    <div className="registration-form-wrapper">
      <form id="registration-form">
        <div className="horizontal-sections">
          <div className="vertical-section">
            <InputTextField
              label={REACT_APP_registration && REACT_APP_registration["Q1"].label}
              id="name"
              onChange={(e) => onNameChange(e)}
              optional={true}
            />

            <InputTextField
              label={REACT_APP_registration && REACT_APP_registration["Q2"].label}
              id="email"
              onChange={(e) => onEmailChange(e)}
              optional={true}
            />
            <InputMultipleChoice
              config={REACT_APP_registration}
              label={REACT_APP_registration?.Q11?.label}
              id="Where are you participating from?"
              choices={["home", "work/office", "Library or study area", "Cafe or public space"]}
              optional={true}
              showTooltip={false}
              tooltipMessage="Choose one or more options"
              onChange={(e) => handleRadioChange(e, id, index, config)}
            />

            <InputMultipleChoice
              config={REACT_APP_registration}
              label={REACT_APP_registration?.Q7?.label}
              id="Do you experience any hearing difficulties that could affect your ability to listen?"
              choices={["Yes", "No"]}
              optional={true}
              showTooltip={false}
              tooltipMessage="Choose one or more options"
              onChange={(e) => handleRadioChange(e, id, index, config)}
            />
          </div>
          <div className="vertical-section">
            <InputMultipleChoice
              config={REACT_APP_registration}
              label={REACT_APP_registration?.Q4?.label}
              id="What is your age range?"
              choices={["18-29", "30-39", "40-49", "50 or avobe"]}
              optional={true}
              showTooltip={false}
              tooltipMessage="Choose one or more options"
              onChange={(e) => handleRadioChange(e, id, index, config)}
            />

            {/*  Multiple Choice Question */}
            <InputMultipleChoice
              config={REACT_APP_registration}
              label={REACT_APP_registration?.Q6?.label}
              id="Which device are you using to listen to the audio?"
              choices={[
                "Headphones (over-ear)",
                "LaptHeadphones (in-ear/earbuds)",
                "Built-in laptop/desktop speakers",
                "External/standalone speakers",
              ]}
              optional={true}
              showTooltip={false}
              tooltipMessage="Choose one or more options"
              onChange={(e) => handleRadioChange(e, id, index, config)}
            />
          </div>
        </div>
        <div className="terms">
          <InputTickbox
            onChange={(value) => setTermsOfUse(value)}
            label={REACT_APP_registration && REACT_APP_registration["Q8"].label}
            id={"terms-of-use"}
            optional={false}
          />
        </div>
      </form>
    </div>
  );
};

export default Registration;
