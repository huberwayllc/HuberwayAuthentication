import React, { useState } from 'react';

const Step5 = ({ formData, handleNext, handleBack }) => {
  const [firstUse, setFirstUse] = useState(formData.firstUse || '');

  const handleCheckboxChange = (value) => {
    setFirstUse(value);
  };

  return (
    <>
      <button onClick={handleBack} className="back">
        <i className="fal fa-chevron-left"></i> Back
      </button>
      <div className="row">
        <div className="col-md-12 head-register">
          <h1>Have you used software to manage or engage with customers before?</h1>
          <h5>Your answer will help us give you the best start.</h5>
        </div>
      </div>
      <input
        type="radio"
        name="firstUse"
        value="yes"
        onChange={() => handleCheckboxChange('yes')}
        checked={firstUse === 'yes'}
      />
      Yes
      <input
        type="radio"
        name="firstUse"
        value="no"
        onChange={() => handleCheckboxChange('no')}
        checked={firstUse === 'no'}
      />
      No
      <button onClick={handleNext} disabled={!firstUse} className="btn btn-primary">
        Next
      </button>
    </>
  );
};

export default Step5;
