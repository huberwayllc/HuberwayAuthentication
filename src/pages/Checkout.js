import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountDetails } from "../backend/api";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

const Checkout = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Individuals");
  const navigate = useNavigate();

  // Stati per ogni campo di input
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    getAccountDetails()
      .then((data) => {
        setUser({
          email: data.data.email,
          name: data.data.username,
          id: data.data.id,
        });
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dettagli dell'account:", error);
        navigate("/account/login");
      });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui puoi fare una fetch o qualsiasi altro processo con i dati
    console.log({
      email,
      cardNumber,
      expiryDate,
      cvc,
      nameOnCard,
      country,
      zip,
    });
  };

  // Funzione per tornare indietro
  const goBack = () => {
    navigate(-1);  // Torna alla pagina precedente
  };

  return (
    <div className="dashboard-container" style={{ height: "0vh" }}>
      <main className="d-flex w-100 h-100 ">
        <div
          style={{ backgroundColor: "#009688", padding: "60px" }}
          className="flex-1 h-100 w-100 text-white d-flex flex-column justify-content-center"
        >
          <div className="position-relative" style={{ minHeight: "624px" }}>
            <div className="d-flex align-items-center gap-2 mt-1">
              <IconButton className="p-0" onClick={goBack}>
                <ArrowBackIcon style={{ color: "#8FD0C9" }} />
              </IconButton>
              <h5 className="m-0">Test mode</h5>
            </div>

            <div className="ps-3 mt-5">
              <h6 style={{ color: "#8FD0C9" }} className="mb-0">Subscribe to Starter</h6>
              <div className="d-flex gap-2 mt-2 align-items-center">
                <h2 style={{ fontSize: "40px" }} className="m-0">$12.00</h2>
                <p style={{ color: "#8FD0C9" }} className="m-0">per <br /> month</p>
              </div>
            </div>

            <div className="d-flex gap-2"
              style={{ color: "#8FD0C9", position: "absolute", bottom: "0", left: "0", width: "100%" }}
            >
              <h6>Powered by <span className="fw-bold">stripe</span></h6>
              <h6>|</h6>
              <h6>Terms</h6>
              <h6>Privacy</h6>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: "white", padding: "60px", color: "#474747" }}
          className="flex-1 h-100 w-100 d-flex flex-column justify-content-center"
        >
          <div className="position-relative" style={{ maxHeight: "624px" }}>
            <h1 className="mt-0" style={{ fontSize: "22px", fontWeight: "600" }}>Pay with Card</h1>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <label className="p-0" style={{ display: "block" }}>Email</label>
              <input
                className="checkoutInp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="mt-4">
                <label className="p-0" style={{ display: "block" }}>Card information</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    style={{
                      borderBottomLeftRadius: "0px",
                      borderBottomRightRadius: "0px",
                      paddingRight: "80px", // spazio extra per le icone
                    }}
                    className="checkoutInp"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  
                  {/* Icon Container */}
                  <div className="d-flex align-items-center"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      gap: "8px", // spazio tra le icone
                    }}
                  >
                    <i className="fa-brands fa-cc-visa" style={{ color: "#1B3ACD", fontSize: "30px" }}></i>
                    <img
                        src="/images/mastercard.png"
                        alt="Mastercard"
                        style={{ width: "42px", height: "auto" }}
                      />
                    <i className="fa-brands fa-cc-amex" style={{ color: "#0974D1", fontSize: "30px" }}></i>
                  </div>
                </div>


                <div className="d-flex" style={{ position: "relative" }}>
                  <input
                    placeholder="MM/YY"
                    style={{
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                      borderTopLeftRadius: "0px",
                      borderTop: "0px",
                    }}
                    className="checkoutInp"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                  <div style={{ position: "relative" }}>
                    <input
                      placeholder="CVC"
                      style={{
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        borderTopRightRadius: "0px",
                        borderTop: "0px",
                        borderLeft: "0px",
                        paddingRight: "40px",
                      }}
                      className="checkoutInp"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    />
                    <i
                      className="fa-solid fa-lock"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "20px",
                        color: "black", 
                      }}
                    ></i>
                  </div>
                </div>

              </div>

              <div className="mt-4">
                <label className="p-0" style={{ display: "block" }}>Name on card</label>
                <input
                  className="checkoutInp"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="p-0" style={{ display: "block" }}>Country or region</label>
                <input
                style={{
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    paddingRight: "40px",
                    }}
                  className="checkoutInp"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <input
                style={{
                    borderTopLeftRadius: "0px",
                    borderTop:"0px",
                    borderTopRightRadius: "0px",
                    paddingRight: "40px",
                    }}
                  className="checkoutInp"
                  placeholder="ZIP"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>

              <div className="mt-5 d-flex justify-content-center">
                <button
                  style={{
                    backgroundColor: "#009688",
                    padding: "18px 0px",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                  className="border-0 rounded-3 w-100 text-white"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p>
                By confirming your subscription, you allow togethere to charge your card for this payment and future payments in accordance with their terms.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
