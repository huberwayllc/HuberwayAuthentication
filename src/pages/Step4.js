import React from 'react';

const Step4 = ({ formData, handleInputChange, handleNext, handleBack }) => {
  return (
    <>
      <button onClick={handleBack} className="back">
        <i className="fal fa-chevron-left"></i> Back
      </button>
      <div className="row">
        <div className="col-md-12 head-register">
          <h1>What is your name?</h1>
        </div>
      </div>
      <div className="row mb-20">
        <div className="col-md-12">
          <label>First name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="col-md-12 m-t-10">
          <label>Last name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control" required />
        </div>
      </div>
      <button onClick={handleNext} disabled={!formData.firstName || !formData.lastName} className="btn btn-primary btn-cons m-t-10 btn-login">
        Next
      </button>
    </>
  );
};

export default Step4;
