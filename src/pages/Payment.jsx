import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState("₹0");

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = JSON.parse(localStorage.getItem("bookingData"));
    if (data?.totalPrice) {
      setTotalPrice(data.totalPrice);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful!");
      navigate("/confirmation");
    }, 1500);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="payment-section" data-aos="fade-in">
      <div className="payment-container">
        <h2 className="payment-title">Stripe Payment Page</h2>
        <p className="payment-text">Total to Pay: {totalPrice}</p>
        <form onSubmit={handleSubmit}>
          <div className="card-element-wrapper">
            <CardElement />
          </div>
          <button className="payment-button" type="submit" disabled={!stripe || loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
