import React, { useState } from 'react';

const Step3 = ({ formData, handleInputChange, handleNext, handleBack }) => {
  const [passwordValid, setPasswordValid] = useState(false);

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const lowercaseCheck = /[a-z]/.test(password);
    const uppercaseCheck = /[A-Z]/.test(password);
    const specialCheck = /[\d\W_]/.test(password);
    return lengthCheck && lowercaseCheck && uppercaseCheck && specialCheck;
  };

  const handlePasswordChange = (e) => {
    handleInputChange(e);
    setPasswordValid(validatePassword(e.target.value));
  };

  return (
    <>
    <button onClick={handleBack} className="back">
      <i className="fal fa-chevron-left"></i> Back
    </button>
      <div className="row">
        <div className="col-md-12 head-register">
          <h1>Create your password</h1>
        </div>
      </div>
      <div className="row mb-20">
        <input type="password" name="password" value={formData.password} onChange={handlePasswordChange} className="form-control" required />
        <ul className="checking_password">
          <li><span className={passwordValid ? "check_password one active" : "check_password one"}></span>At least 8 characters</li>
          <li><span className={/[a-z]/.test(formData.password) ? "check_password two active" : "check_password two"}></span>One lowercase character</li>
          <li><span className={/[A-Z]/.test(formData.password) ? "check_password three active" : "check_password three"}></span>One uppercase character</li>
          <li><span className={/[\d\W_]/.test(formData.password) ? "check_password four active" : "check_password four"}></span>One number, symbol, or whitespace character</li>
        </ul>
      </div>
      <button onClick={handleNext} disabled={!passwordValid}  className="btn btn-primary btn-cons m-t-10 btn-login">
        Next
      </button>
    </>
  );
};

export default Step3;
