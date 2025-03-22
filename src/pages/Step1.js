import React, { useState } from 'react';

const Step1 = ({ formData, handleInputChange, handleNext }) => {
  const [emailValid, setEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false); // To show a loading indicator when sending OTP

  const validateAndSendOtp = async () => {
    if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) {
      setLoading(true); // Start loading when the button is clicked
      try {
        // Validate if the email is new
        const response = await fetch('https://api.huberway.com/auth/is-new-email', {
          method: 'POST',
          body: JSON.stringify({ email: formData.email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();

        if (result.type === 'registered') {
          setErrorMessage('This email is already registered.');
          setEmailValid(false);
          setLoading(false); // Stop loading
        } else {
          setEmailValid(true);
          setErrorMessage('');

          // Email is valid, now send the OTP
          const otpResponse = await sendOtp(formData.email);

          if (otpResponse) {
            handleNext(); // Go to the next step after sending OTP
          } else {
            setLoading(false); // Stop loading if OTP fails
          }
        }
      } catch (error) {
        setErrorMessage('Error while verifying email.');
        setLoading(false); // Stop loading on error
      }
    } else {
      setErrorMessage('Invalid email format.');
      setEmailValid(false);
      setLoading(false); // Stop loading
    }
  };

  const sendOtp = async (email) => {
    try {
      const response = await fetch('https://api.huberway.com/auth/send-mail-verify', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result.message);
      if (result.message == 'success') {
        setOtpSent(true);
        setErrorMessage('');
        return true; // OTP sent successfully
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
        return false; // OTP failed
      }
    } catch (error) {
      setErrorMessage('Error while sending OTP.');
      return false;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 head-register">
          <h1>Create your free account</h1>
          <h5>100% free. No credit card needed.</h5>
        </div>
      </div>

      <div className="row mb-20">
        <div className="col-md-12">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            required
          />
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>
      </div>

      <button
        onClick={validateAndSendOtp}
        disabled={loading} // Disable the button when loading
        className="btn btn-primary btn-cons m-t-10 btn-login"
      >
        {loading ? 'Sending OTP...' : 'Verify Email'}
      </button>

      {/* Information message after OTP is sent */}
      {otpSent && <p>OTP has been sent to your email address. Please check your inbox.</p>}

      <p className="text-information">
        We’re committed to your privacy. Huberway uses the information you provide to us to contact you
        about our relevant content, products, and services. You may unsubscribe from these communications
        at any time. For more information, check out our <a href="https://legal.huberway.com/privacy-policy">Privacy Policy</a>.
      </p>
    </>
  );
};

export default Step1;
