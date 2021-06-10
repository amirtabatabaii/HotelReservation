import React from "react";
import "./otelDate.css";
import SelectOtel from "./selectOtel";
import StepProgressBar from "react-step-progress";

const step2Content = <h1>Step 2 Content</h1>;
const step3Content = <h1>Step 3 Content</h1>;

function OtelDate(props) {
  const step2Validator = () => {
    // return a boolean
  };

  const step3Validator = () => {
    // return a boolean
  };

  const onFormSubmit = () => {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  };

  return (
    <div className='p-5'>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: "Otel ve Tarih Seçimi",
            name: "step 1",
            content: <SelectOtel />,
          },
          {
            label: "Step 2",
            name: "step 2",
            content: step2Content,
            validator: step2Validator,
          },
          {
            label: "Step 3",
            name: "step 3",
            content: step3Content,
            validator: step3Validator,
          },
        ]}
      />
    </div>
  );
}
export default OtelDate;
