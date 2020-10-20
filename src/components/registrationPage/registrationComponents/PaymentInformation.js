import React, { useEffect, useState } from "react";
//import CreditCardInput from "react-credit-card-input";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real live publishable API key.
const promise = loadStripe(
  "pk_live_51HQEiuE35lRR4iPL4I6vRsCpNOB8EGOPJAUe7nQ4Kb3cQjwMWVyTyaIJAJM30QyT5ilxnPjBszpLuUq8e8VyFfAb00GmCL3teQ"
);

const PaymentInformation = (props) => {
  const masterPromocode = { code: "instructor2020" };
  const [promocode, setPromocode] = useState("");
  useEffect(() => {
    let total = 0;
    if (promocode === masterPromocode.code) {
      total = 40;
      props.setPromocodeApplied(true);
    } else {
      props.setPromocodeApplied(false);
      if (props.students.length > 0) total += 240;
      if (props.students.length > 1) total += 95;
      if (props.students.length > 2) total += 70 * (props.students.length - 2);
      if (props.volunteer === "no") total += 50;
    }
    props.setTotalTuition(total);
  });

  return (
    <>
      <h3>Payment Information</h3>
      <h5 name="totalTuition">
        Total Due: {"$" + props.totalTuition.toString() + ".00"}
      </h5>
      <label htmlFor="promocode">Promotional Code: </label>
      <input
        type="text"
        name="promocode"
        value={promocode}
        onChange={(e) => setPromocode(e.target.value)}
      />
      <br />
      <Elements stripe={promise}>
        <CheckoutForm
          totalTuition={props.totalTuition}
          submit={props.submit}
          setSubmit={(words) => props.setSubmit(() => words)}
          setError={(words) => props.setError(() => words)}
          email={props.parents[0].email}
          setCardFulfilled={(bool) => props.setCardFulfilled(bool)}
          error={props.error}
        />
      </Elements>
    </>
  );
};
export default PaymentInformation;
