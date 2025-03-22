import React, { useState } from 'react';

const Step7 = ({ formData, handleNext, handleBack }) => {
  const [industry, setIndustry] = useState(formData.industry || '');

  const handleCheckboxChange = (value) => {
    setIndustry(value);
  };

  return (
    <div>
      <button onClick={handleBack} className="back">
        Back
      </button>
      <h1>What industry are you in?</h1>
      <input
        type="radio"
        name="industry"
        value="technology"
        onChange={() => handleCheckboxChange('technology')}
        checked={industry === 'technology'}
      />
      Technology
      <input
        type="radio"
        name="industry"
        value="healthcare"
        onChange={() => handleCheckboxChange('healthcare')}
        checked={industry === 'healthcare'}
      />
      Healthcare
      <input
        type="radio"
        name="industry"
        value="education"
        onChange={() => handleCheckboxChange('education')}
        checked={industry === 'education'}
      />
      Education
      {/* Add more industries as needed */}
      <button onClick={handleNext} disabled={!industry} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Step7;
