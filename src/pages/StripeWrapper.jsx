import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

// Replace with your test publishable key
const stripePromise = loadStripe("pk_test_Your_Stripe_Test_Key");

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default StripeWrapper;
