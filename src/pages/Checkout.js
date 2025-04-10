import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAccountDetails} from "../backend/api";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from "@mui/material";
import {loadStripe} from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_live_51PUWs9GSLkBTsLypyUtbfkdxZTG2dHOIKT0Z8B9MaBXws0n50xuSNmtpuBxd7NWkG1wmMytEwf8ogvj6iYjrfLNw00TuFSi5UU"); // <-- la tua public key Stripe

const CheckoutForm = ({user, priceID}) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [email, setEmail] = useState(user.email || "");
    const [nameOnCard, setNameOnCard] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name: nameOnCard,
                email: email,
                address: {
                    country: country,
                    postal_code: zip,
                },
            },
        });

        if (error) {
            setErrorMsg(error.message);
            return;
        }

        // Chiamata al backend per creare la subscription
        try {
            const response = await fetch("http://localhost:8080/subscription/create-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    priceId: priceID,
                    paymentMethodId: paymentMethod.id
                })
            });

            const data = await response.json();

            if (data.clientSecret) {
                const result = await stripe.confirmCardPayment(data.clientSecret);
                if (result.error) {
                    setErrorMsg(result.error.message);
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        alert("Abbonamento attivato!");
                        navigate("/success");
                    }
                }
            } else {
                alert("Abbonamento attivato senza bisogno di conferma.");
                navigate("/success");
            }
        } catch (err) {
            setErrorMsg("Errore: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input className="checkoutInp" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <div className="mt-4">
                <label>Card information</label>
                <div style={{border: "1px solid #ccc", padding: "10px", borderRadius: "8px"}}>
                    <CardElement options={{hidePostalCode: true}}/>
                </div>
            </div>

            <div className="mt-4">
                <label>Name on card</label>
                <input className="checkoutInp" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)}/>
            </div>

            <div className="mt-4">
                <label>Country</label>
                <input className="checkoutInp" value={country} onChange={(e) => setCountry(e.target.value)}/>
                <input placeholder="ZIP" className="checkoutInp" value={zip} onChange={(e) => setZip(e.target.value)}/>
            </div>

            {errorMsg && <div className="mt-3 text-danger">{errorMsg}</div>}

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
                    disabled={!stripe}
                >
                    Subscribe
                </button>
            </div>
        </form>
    );
};

const Checkout = () => {
    const [user, setUser] = useState({email: "", name: "", id: ""});
    const navigate = useNavigate();

    useEffect(() => {
        getAccountDetails()
            .then((data) => {
                setUser({
                    email: data.data.email,
                    name: data.data.username,
                    id: data.data.stripeCustomerId, // <-- assicurati di avere questo nel DB
                });
            })
            .catch((error) => {
                console.error("Errore:", error);
                navigate("/account/login");
            });
    }, [navigate]);

    const goBack = () => navigate(-1);

    return (
        <Elements stripe={stripePromise}>
            <div className="dashboard-container" style={{height: "0vh"}}>
                <main className="d-flex w-100 h-100">
                    {/* Colonna sinistra */}
                    <div style={{backgroundColor: "#009688", padding: "60px"}}
                         className="flex-1 h-100 w-100 text-white d-flex flex-column justify-content-center">
                        <div className="position-relative" style={{minHeight: "624px"}}>
                            <div className="d-flex align-items-center gap-2 mt-1">
                                <IconButton className="p-0" onClick={goBack}>
                                    <ArrowBackIcon style={{color: "#8FD0C9"}}/>
                                </IconButton>
                                <h5 className="m-0">Test mode</h5>
                            </div>
                            <div className="ps-3 mt-5">
                                <h6 style={{color: "#8FD0C9"}} className="mb-0">Subscribe to Starter</h6>
                                <div className="d-flex gap-2 mt-2 align-items-center">
                                    <h2 style={{fontSize: "40px"}} className="m-0">$12.00</h2>
                                    <p style={{color: "#8FD0C9"}} className="m-0">per <br/> month</p>
                                </div>
                            </div>
                            <div className="d-flex gap-2" style={{
                                color: "#8FD0C9",
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                width: "100%"
                            }}>
                                <h6>Powered by <span className="fw-bold">stripe</span></h6>
                                <h6>|</h6>
                                <h6>Terms</h6>
                                <h6>Privacy</h6>
                            </div>
                        </div>
                    </div>

                    {/* Colonna destra - checkout */}
                    <div style={{backgroundColor: "white", padding: "60px", color: "#474747"}}
                         className="flex-1 h-100 w-100 d-flex flex-column justify-content-center">
                        <div className="position-relative" style={{maxHeight: "624px"}}>
                            <h1 className="mt-0" style={{fontSize: "22px", fontWeight: "600"}}>Pay with Card</h1>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm user={user}/>
                            </Elements>
                            <div className="mt-4 text-center">
                                <p>
                                    By confirming your subscription, you allow togethere to charge your card for this
                                    payment and future payments in accordance with their terms.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Elements>
    );
};

export default Checkout;
