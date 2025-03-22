import React from 'react';

const Step9 = ({ formData, handleInputChange, handleNext, handleBack }) => {
  return (
    <div>
      <button onClick={handleBack} className="back">
        <i className="fal fa-chevron-left"></i> Back
      </button>
      <div className="row">
        <div className="col-md-12 head-register">
          <h1>What is your company name?</h1>
        </div>
      </div>
      <div className="row mb-20">
        <div className="col-md-12">
          <label>Company name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="form-control"
            required
          />
          <p>Please change it if it's not right. This was our best guess based on your email address.</p>
        </div>
      </div>
      <button onClick={handleNext} disabled={!formData.companyName} className="btn btn-primary btn-cons m-t-10 btn-login">
        Next
      </button>
    </div>
  );
};

export default Step9;
