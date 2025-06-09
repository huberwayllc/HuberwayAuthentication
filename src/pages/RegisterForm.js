import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import Step10 from "./Step10";
import Step11 from "./Step11";
import Step12 from "./Step12";
import Step13 from "./Step13";
import ProgressBar from "./ProgressBar";
import {Helmet} from "react-helmet";

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    otp: "",
    companyName: "",
    companyWebsite: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setProgress((currentStep / 7) * 100);
  }, [currentStep]);

  const handleNext = async () => {
    if (currentStep === 6) {
      setCurrentStep((prevStep) => prevStep + 1);
      // Step 11: Agglomerare dati e fare la chiamata POST
      try {
        const response = await fetch(
          "https://api.huberway.com/auth/register-huberway",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();
        if (result.success) {
          // Calcola la scadenza del cookie (365 giorni)
          const expirationDate = new Date();
          expirationDate.setTime(
            expirationDate.getTime() + 365 * 24 * 60 * 60 * 1000
          ); // 365 giorni in millisecondi
          const expires = `expires=${expirationDate.toUTCString()}`;

          // Imposta i cookie per user_email e auth_token con dominio e scadenza
          document.cookie = `user_email=${result.email}; path=/; domain=.huberway.com; ${expires}; Secure`;
          document.cookie = `auth_token=${result.auth_token}; path=/; domain=.huberway.com; ${expires}; Secure`;
          // setTimeout(() => {
          //   const redirectURL = new URLSearchParams(window.location.search).get('redirect_url');
          //   window.location.href = redirectURL ? redirectURL : 'https://app.huberway.com/account/dashboard';
          // }, 2000);
        } else {
          setErrorMessage("Registration failed: " + result.message);
        }
      } catch (error) {
        console.error("Errore durante la registrazione", error);
        setErrorMessage("Errore durante la registrazione");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      // case 5:
      //   return <Step5 formData={formData} handleNext={handleNext} handleBack={handleBack} />;
      // case 6:
      //   return <Step6 formData={formData} handleNext={handleNext} handleBack={handleBack} />;
      // case 7:
      //   return <Step7 formData={formData} handleNext={handleNext} handleBack={handleBack} />;
      // case 8:
      //   return <Step8 formData={formData} handleNext={handleNext} handleBack={handleBack} />;
      case 5:
        return (
          <Step9
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      // case 6:
      //   return <Step10 formData={formData} handleNext={handleNext} handleBack={handleBack} />;
      case 6:
        return (
          <Step11
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      // case 8:
      //   return <Step12 formData={formData} handleNext={handleNext} handleBack={handleBack} />;
      case 7:
        return <Step13 />;
      default:
        return (
          <Step1
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
          />
        );
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`; // Preleva tutti i cookie
    const parts = value.split(`; ${name}=`); // Cerca il cookie con il nome specificato
    if (parts.length === 2) return parts.pop().split(";").shift(); // Restituisce il valore del cookie
  };

  // Controlla se esiste l'auth_token nei cookie
  const authToken = getCookie("auth_token"); // Ottieni l'auth_token dai cookie
  // Se esiste l'auth_token, reindirizza l'utente alla dashboard
  if (authToken) {
    window.location.href = "https://app.huberway.com/account/dashboard";
  }

  if (currentStep === 7) {
    return renderStep();
  }

  return (
    <div>
      <Helmet>
        <title>Register - Huberway</title>
        <meta name="description" content="Create a new account to start using Huberway CRM and other tools for your business.Create a new account to start using Huberway CRM and other tools for your business." />
        <meta name="keywords" content="Register, Huberway, Business Tools, CRM Access" />
        <meta property="og:title" content="Register - Huberway" />
        <meta property="og:description" content="Create a new account to start using Huberway CRM and other tools for your business.Create a new account to start using Huberway CRM and other tools for your business." />
        <meta property="og:image" content="https://app.huberway.com/assets/images/pricing-image.png" />
        <meta property="og:url" content="https://app.huberway.com/account/register-huberway" />
        <link rel="canonical" href="https://app.huberway.com/account/register-huberway" />
      </Helmet>
      <ProgressBar progress={progress} />

      <div className="sm-p-t-30">
        <div className="d-flex justify-content-center flex-column full-height ">
          <img
            src="https://cdn.huberway.com/site/logo-dark.svg"
            className="register-logo"
            alt="logo"
            data-src="https://cdn.huberway.com/site/logo-dark.svg"
            data-src-retina="https://cdn.huberway.com/site/logo-dark.svg"
          />
          <h5 className="already-register">
            Have an account? <Link to="/account/login">Sign in.</Link>
          </h5>
        </div>
      </div>

      <div className="register-container sm-p-t-30 mt-50 register-form">
        <div className="d-flex flex-column">{renderStep()}</div>
      </div>
    </div>
  );
};

export default RegisterForm;
