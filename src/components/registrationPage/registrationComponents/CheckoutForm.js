import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../../functions/functions";

const CheckoutForm = (props) => {
  const [succeeded, setSucceeded] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState({});
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  /**
   * Waits to see if user has submitted the registration form
   * Upon submission of the form, it makes a call to the Stripe API for
   * a payment intent of the amount 'totalTuition'
   */
     useEffect(() => {
    if (props.submit == "loading payment") {
      const createPaymentIntent = async () => {
        //Clamp amount to Stripe min/max
        let validAmount = Math.min(Math.max(props.totalTuition, 0.5), 9999999);
        //Convert Dollars to Cents as that is what Stripe API uses
        validAmount = Math.round(
          100 *
            parseFloat(
              typeof validAmount === "string"
                ? validAmount.replace(/[$,]/g, "")
                : validAmount
            )
        );
        //Make the API Request
        const api = await fetchFromAPI("test-Payments", {
          body: { amount: validAmount, email: props.email },
          // body: { amount: validAmount , email: props.email}, 
        });
        setPaymentIntent((paymentIntent) => api);
        props.setSubmit("payment intent accepted");
      };
      createPaymentIntent();
    }
  }, [props.submit]); 

  /**
   * Waits to see if there is a change on paymentIntent state.
   * If there is change then a condition is checked if it contains the key "client_secret"
   * If it contains that key then it sends out a charge through the Stripe API
   */
  useEffect(() => {
    /**
     * Handles submission of payment and create payment intent
     * @param {*} event
     */
    console.log(props.submit);
    if (props.submit == "loading payment charge") {
      if (
        paymentIntent.hasOwnProperty("client_secret") &&
        paymentIntent.hasOwnProperty("status")
      ) {
        if (paymentIntent.status == "requires_payment_method") {
          const handlePaymentSubmit = async (event) => {
            //event.preventDefault();
            setProcessing(true);
            const cardElement = elements.getElement(CardElement);
            //Confirm Card Payment
            const {
              paymentIntent: updatedPaymentIntent,
              error,
            } = await stripe.confirmCardPayment(
              paymentIntent.client_secret,
              {
                payment_method: { card: cardElement },
              }
            );

            if (error) {
              console.error(error);
              props.setError(error.message);
              error.payment_intent &&
                setPaymentIntent(error.payment_intent);
              setProcessing(false);
              setSucceeded(false);
              //props.setSubmit("payment failed");
            } else {
              setSucceeded(true);
              setPaymentIntent(updatedPaymentIntent);
              cardElement.clear();
              props.setSubmit("payment accepted");
            }
          };
          handlePaymentSubmit();
        }
      }
    }
  }, [props.submit]);

  const cardStyle = {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    props.setError(event.error ? event.error.message : "");
    props.setCardFulfilled(event.complete);
  };
  /* 
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
  }; */

  return (
    <>
      <div style={{ width: "400px" }}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        {/* Show any error that happens when processing the payment */}
        {props.error && (
          <div className="card-error" role="alert">
            {props.error}
          </div>
        )}
        {succeeded ? (
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your email. Refresh the page to
            submit a new form.
          </p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default CheckoutForm;
