import React, { useState } from 'react';

const Step12 = ({ formData, handleNext, handleBack }) => {
  const [hostingLocation, setHostingLocation] = useState(formData.hostingLocation || '');

  const handleCheckboxChange = (value) => {
    setHostingLocation(value);
  };

  return (
    <div>
      <button onClick={handleBack} className="back">
        Back
      </button>
      <h1>Where would you like your data to be hosted?</h1>
      <h5>Based on your location, we recommend <span>{formData.recommendedLocation || 'EU'}</span></h5>
      <input
        type="radio"
        name="hostingLocation"
        value="EU"
        onChange={() => handleCheckboxChange('EU')}
        checked={hostingLocation === 'EU'}
      />
      EU
      <input
        type="radio"
        name="hostingLocation"
        value="US"
        onChange={() => handleCheckboxChange('US')}
        checked={hostingLocation === 'US'}
      />
      US
      <input
        type="radio"
        name="hostingLocation"
        value="Asia"
        onChange={() => handleCheckboxChange('Asia')}
        checked={hostingLocation === 'Asia'}
      />
      Asia
      <button onClick={handleNext} disabled={!hostingLocation} className="btn btn-primary">
        Create account
      </button>
    </div>
  );
};

export default Step12;
