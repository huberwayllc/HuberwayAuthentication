import React from 'react';

const Step11 = ({ formData, handleInputChange, handleNext, handleBack }) => {
  return (
    <>
      <button onClick={handleBack} className="back">
        <i className="fal fa-chevron-left"></i> Back</button>
      <div className="row">
        <div className="col-md-12 head-register">
          <h1>What is your company's website?</h1>
        </div>
      </div>
      <div className="row mb-20">
        <div className="col-md-12">
          <label>Company website</label>
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleInputChange}
            className="form-control"
            required
          />
          <p>Please change it if it's not right. This was our best guess based on your email address.</p>
        </div>
      </div>
      <button onClick={handleNext} disabled={!formData.companyWebsite} className="btn btn-primary btn-cons m-t-10 btn-login">
        Create account
      </button>
    </>
  );
};

export default Step11;
