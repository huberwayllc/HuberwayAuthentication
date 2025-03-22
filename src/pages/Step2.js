import React, { useState, useRef } from 'react';

const Step2 = ({ formData, handleInputChange, handleNext, handleBack }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  // Handle change for OTP input
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    const { value } = e.target;

    if (/^[0-9]?$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if not the last one and value is valid
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace to move to previous input field
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];

    // Paste OTP code into the fields, focus the last filled field
    pasteData.split('').forEach((char, index) => {
      if (/^[0-9]$/.test(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    // Focus the next input after the last filled one
    const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputRefs.current[nextIndex].focus();
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpValue = otp.join('');
    const response = await fetch('https://api.huberway.com/auth/verify-mail', {
      method: 'POST',
      body: JSON.stringify({ email: formData.email, otp: otpValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.type !== 'failed';
  };

  return (
    <>
      <button onClick={handleBack} className="back">
        <i className="fal fa-chevron-left"></i> Back
      </button>
      <div className="row">
        <div className="col-md-12 head-register">
          <h1>Check your email address</h1>
          <h5>Enter the verification code sent to: <b>{formData.email}</b></h5>
        </div>
      </div>
      <div className="row mb-20">
        <div className="otp-form" style={{ margin: `auto`, alignItems: `center` }} onPaste={handlePaste}>
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="otp-field"
              type="text"
              value={value}
              maxLength={1}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="off"
              style={{ textAlign: 'center', width: '13%', marginRight: '5px' }}
            />
          ))}
        </div>
        <button
          onClick={async () => {
            const validOtp = await verifyOtp();
            if (validOtp) handleNext();
          }}
          disabled={otp.join('').length < 6}
          className="btn btn-primary btn-cons m-t-10 btn-login"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Step2;
