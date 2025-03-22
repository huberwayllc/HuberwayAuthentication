import React, { useState } from 'react';

const Step6 = ({ formData, handleNext, handleBack }) => {
  const [problemIdentified, setProblemIdentified] = useState(formData.problemIdentified || '');

  const handleCheckboxChange = (value) => {
    setProblemIdentified(value);
  };

  return (
    <div>
      <button onClick={handleBack} className="back">
        Back
      </button>
      <h1>Do you know which problems you want to solve with Huberway?</h1>
      <h5>Your answer will help us give you the best start.</h5>
      <input
        type="radio"
        name="problemIdentified"
        value="yes"
        onChange={() => handleCheckboxChange('yes')}
        checked={problemIdentified === 'yes'}
      />
      Yes
      <input
        type="radio"
        name="problemIdentified"
        value="no"
        onChange={() => handleCheckboxChange('no')}
        checked={problemIdentified === 'no'}
      />
      No
      <button onClick={handleNext} disabled={!problemIdentified} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Step6;
