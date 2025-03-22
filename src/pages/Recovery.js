import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Verifica se le password corrispondono
  useEffect(() => {
    if (newPassword && confirmPassword) {
      setPasswordMatch(newPassword === confirmPassword);
    } else {
      setPasswordMatch(false);
    }
  }, [newPassword, confirmPassword]);

  // Funzione per inviare l'OTP
  const handleSendOtp = async () => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      try {
        const response = await fetch(
          "https://api.huberway.com/auth/send-otp-registered",
          {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.message === "success") {
          setOtpSent(true);
          setErrorMessage("");
          setSuccessMessage("OTP inviato alla tua email.");
        } else {
          setErrorMessage("Errore durante l'invio dell'OTP. Riprova.");
        }
      } catch (error) {
        console.error("Errore durante l'invio dell'OTP:", error);
        setErrorMessage("Errore di sistema durante l'invio dell'OTP.");
      }
    } else {
      setErrorMessage("Inserisci un'email valida.");
    }
  };

  // Funzione per verificare l'OTP
  const handleVerifyOtp = async () => {
    if (otp) {
      try {
        const response = await fetch(
          "https://api.huberway.com/auth/verify-otp",
          {
            method: "POST",
            body: JSON.stringify({ email, otp }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.type === "success") {
          setOtpVerified(true);
          setErrorMessage("");
          setSuccessMessage("OTP verificato con successo.");
        } else {
          setErrorMessage("OTP non valido.");
        }
      } catch (error) {
        console.error("Errore durante la verifica dell'OTP:", error);
        setErrorMessage("Errore di sistema durante la verifica dell'OTP.");
      }
    } else {
      setErrorMessage("Inserisci l'OTP.");
    }
  };

  // Funzione per reimpostare la password
  const handleResetPassword = async () => {
    if (passwordMatch && otpVerified) {
      try {
        const response = await fetch(
          "https://api.huberway.com/auth/reset-password",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              otp,
              password: newPassword,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.message === "Password reset successfully.") {
          setSuccessMessage("Password reimpostata con successo.");
        } else {
          setErrorMessage("Errore durante la reimpostazione della password.");
        }
      } catch (error) {
        console.error(
          "Errore durante la reimpostazione della password:",
          error
        );
        setErrorMessage(
          "Errore di sistema durante la reimpostazione della password."
        );
      }
    } else {
      setErrorMessage("Le password non corrispondono o OTP non verificato.");
    }
  };

  return (
    <div className="register-container sm-p-t-30">
      <div className="d-flex flex-column">
        <img
          src="https://cdn.huberway.com/site/logo-dark.svg"
          className="login-logo"
          alt="Huberway Logo"
        />
        <h5 className="secondary-title">
          Password Forgot? or <Link to="/account/login">Sign in</Link>
        </h5>

        {!otpSent ? (
          <>
            <div className="row mb-20">
              <div className="col-md-12">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </div>
            </div>
            <button
              onClick={handleSendOtp}
              className="btn btn-primary btn-cons m-t-10 btn-login"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="row mb-20">
              <div className="col-md-12">
                <label>OTP from your e-mail</label>
                <input
                  type="text"
                  name="otp"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button
                  onClick={handleVerifyOtp}
                  className="btn btn-primary btn-cons m-t-10 btn-login"
                >
                  Verify OTP
                </button>
              </div>
            </div>

            {otpVerified && (
              <>
                <div className="row mb-20">
                  <div className="col-md-12">
                    <label>New password</label>
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-20">
                  <div className="col-md-12">
                    <label>Confirm new password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {!passwordMatch && confirmPassword && (
                      <p className="text-danger">The password don't matched.</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleResetPassword}
                  className="btn btn-primary btn-cons m-t-10 btn-login"
                  disabled={!passwordMatch || !otpVerified}
                >
                  Reset password
                </button>
              </>
            )}
          </>
        )}

        {successMessage && <p className="text-success">{successMessage}</p>}
      </div>
      <div className="m-b-30 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix copyright-login">
        <div className="col-md-12 no-padding d-flex align-items-center text-center">
          <p className="hinted-text small inline sm-p-t-10 m-auto">
            &copy;{new Date().getFullYear()} Huberway LLC. All Rights Reserved.
          </p>
        </div>
        <div className="col-md-12 no-padding d-flex align-items-center text-center">
          <a
            href="https://legal.huberway.com/privacy-policy"
            className="m-auto"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
