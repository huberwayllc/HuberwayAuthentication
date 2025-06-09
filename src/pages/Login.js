import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import {useLocation, Link, useNavigate} from "react-router-dom";
import {getAuthData} from "../backend/AuthData";
import {Helmet} from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  useEffect(() => {
    if (emailVerified && passwordVerified) {
      setErrorMessage("");
    }
  }, [emailVerified, passwordVerified]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = async () => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      // Make API request to check if the email exists
      try {
        const response = await fetch(
          "https://api.huberway.com/auth/verify-mail-exist",
          {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.exists) {
          setEmailVerified(true);
          setShowPasswordField(true);
          setErrorMessage("");
        } else {
          setEmailVerified(false);
          setShowPasswordField(false);
          setErrorMessage("You don't have an account. Sign up now is free.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setErrorMessage("System error occurred while verifying email.");
      }
    } else {
      setEmailVerified(false);
      setErrorMessage("Invalid email format.");
    }
  };

  const validatePassword = async () => {
    if (emailVerified && password) {
      // Make API request to check if the password is correct
      try {
        const response = await fetch(
          "https://api.huberway.com/auth/verify-password-exist",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.valid) {
          setPasswordVerified(true);
          setErrorMessagePassword("");
        } else {
          setPasswordVerified(false);
          setErrorMessagePassword("Password is incorrect.");
        }
      } catch (error) {
        console.error("Error verifying password:", error);
        setErrorMessagePassword(
          "System error occurred while verifying password."
        );
      }
    } else {
      setPasswordVerified(false);
      setErrorMessagePassword("Please enter a password.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailVerified && passwordVerified) {
      // Submit the login form
      try {
        const response = await fetch("https://api.huberway.com/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
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
          // Controlla se esiste redirect_url nella query string
          const urlParams = new URLSearchParams(window.location.search);
          const redirectUrl = urlParams.get("redirect_url");

          // Reindirizza all'URL trovato o a quello di default
          window.location.href = redirectUrl ? redirectUrl : 'https://app.huberway.com/account/dashboard';
        //  window.location.href = "https://app.huberway.com/account/dashboard";
        } else {
          alert(`Login failed: ${result.message}`);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again later.");
      }
    } else {
      alert("Please verify your email and password.");
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`; // Preleva tutti i cookie
    const parts = value.split(`; ${name}=`); // Cerca il cookie con il nome specificato
    if (parts.length === 2) return parts.pop().split(";").shift(); // Restituisce il valore del cookie
  };

  const { auth_token } = getAuthData();

  // Se esiste l'auth_token, reindirizza l'utente alla dashboard
  if (auth_token) {
    window.location.href = "https://app.huberway.com/account/dashboard";
  }

  return (
    <>
      <Helmet>
        <title>Login - Huberway</title>
        <meta name="description" content="Login to Huberway and access your business management tools." />
        <meta name="keywords" content="Login, Huberway, Business Tools, CRM Access" />
        <meta property="og:title" content="Login - Huberway" />
        <meta property="og:description" content="Login to Huberway and access your business management tools." />
        <meta property="og:image" content="https://app.huberway.com/assets/images/pricing-image.png" />
        <meta property="og:url" content="https://app.huberway.com/account/pricing" />
        <link rel="canonical" href="https://app.huberway.com/account/pricing" />
      </Helmet>
      <div className="register-container  sm-p-t-30">
        <div className="d-flex flex-column">
          <img
            src="https://cdn.huberway.com/site/logo-dark.svg"
            className="login-logo"
            alt="Huberway Logo"
          />
          <h5 className="secondary-title">
            Don't have an account?{" "}
            <Link to="/account/register-huberway">Sign up</Link>
          </h5>
          <form onSubmit={handleLogin} role="form">
            <div className="row mb-20">
              <div className="col-md-12">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateEmail}
                  required
                />
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </div>
            </div>

            {showPasswordField && (
              <div className="row mb-20">
                <div className="col-md-12">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                    required
                  />
                  {errorMessagePassword && (
                    <p className="text-danger">{errorMessagePassword}</p>
                  )}
                </div>
              </div>
            )}

            <div className="row m-t-10">
              <div className="col-lg-6">
                <Link to="/account/recovery">Forgot my password</Link>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-cons m-t-10 btn-login"
              disabled={!emailVerified || !passwordVerified}
            >
              LOGIN
            </button>
          </form>

          <div className="m-b-30 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix copyright-login">
            <div className="col-md-12 no-padding d-flex align-items-center text-center">
              <p className="hinted-text small inline sm-p-t-10 m-auto">
                &copy;{new Date().getFullYear()} Huberway LLC. All Rights
                Reserved.
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
      </div>
    </>
  );
};

export default Login;
