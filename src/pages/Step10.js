import React, { useState } from 'react';

const Step10 = ({ formData, handleNext, handleBack }) => {
  const [companySize, setCompanySize] = useState(formData.companySize || '');

  const handleCheckboxChange = (value) => {
    setCompanySize(value);
  };

  return (
    <div>
      <button onClick={handleBack} className="back">
        Back
      </button>
      <h1>How many people work at your company?</h1>
      <input
        type="radio"
        name="companySize"
        value="1-10"
        onChange={() => handleCheckboxChange('1-10')}
        checked={companySize === '1-10'}
      />
      1-10
      <input
        type="radio"
        name="companySize"
        value="11-50"
        onChange={() => handleCheckboxChange('11-50')}
        checked={companySize === '11-50'}
      />
      11-50
      <input
        type="radio"
        name="companySize"
        value="51-200"
        onChange={() => handleCheckboxChange('51-200')}
        checked={companySize === '51-200'}
      />
      51-200
      <input
        type="radio"
        name="companySize"
        value="201+"
        onChange={() => handleCheckboxChange('201+')}
        checked={companySize === '201+'}
      />
      201+
      <button onClick={handleNext} disabled={!companySize} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Step10;
