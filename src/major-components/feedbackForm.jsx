import React from "react";
import InputLikert from "../minor-components/inputLikert";
import InputMultipleChoice from "../minor-components/inputMultipleChoice";
import InputTextArea from "../minor-components/inputTextArea";
import { handleTextFieldChange } from "../utils/handleTextFieldChange";

const FeedbackForm = ({ feedbackFormQuestions, title, text }) => {
  const components = {
    text: InputTextArea,
    likert: InputLikert,
    mc: InputMultipleChoice,
  };

  return (
    <div style={{ alignItems: "center" }} className="feedback-form-wrapper">
      <h3>{title}</h3>
      <div className="summary-and-feedback-text-content">{text} </div>
      <div>
        {" "}
        <form style={{ alignItems: "center", marginLeft: "4.6em" }} className="feedback-form">
          {feedbackFormQuestions.map((e, index = 0) => {
            return e.questionType === "text"
              ? React.createElement(components[e["questionType"]], {
                  key: index,
                  onChange: (event) => handleTextFieldChange(event, e),
                  ...e,
                })
              : React.createElement(components[e["questionType"]], {
                  key: index,
                  config: e,
                  ...e,
                });
          })}
        </form>
      </div>
    </div>
  );
};
export default FeedbackForm;
