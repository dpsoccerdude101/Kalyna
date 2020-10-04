import React, { useState, useEffect } from "react";
import {
  isPhoneNumberLengthValid,
  isPhoneNumberValid,
  isEmailValid,
} from "../../../functions/functions";
import { EMERGENCY_CONTACT } from "../Parents/parentTypes";

export const Parent = (props) => {
  //immediately invoked function
  const type = (() => {
    switch (props.type) {
      case EMERGENCY_CONTACT:
        return "Emergency Contact";
      default:
        return "Parent";
    }
  })();
  const numParent = (() => {
    if (props.type == EMERGENCY_CONTACT) return "";
    else {
      switch (props.index) {
        case 0:
          return "First";
        case 1:
          return "Second";
        default:
          return "";
      }
    }
  })();

  const handleChange = (event, property) => {
    const value = event.target.value;
    props.setParent({ ...props.parent, [property]: value });
  };

  return (
    <>
      <section className="line">
        <h5>
          {numParent} {type}:
        </h5>
        <label>First Name</label>
        <input
          type="text"
          required
          value={props.parent.firstName}
          onChange={(e) => handleChange(e, "firstName")}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          required
          value={props.parent.lastName}
          onChange={(e) => handleChange(e, "lastName")}
        />
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          name="email"
          required
          value={props.parent.email}
          onChange={(e) => handleChange(e, "email")}
          onBlur={(e) => {
            if (!isEmailValid(e.target.value))
              e.target.setCustomValidity(
                e.target.value + " not valid. Try entering a different email."
              );
            else e.target.setCustomValidity("");
          }}
        />
      </section>
      <section className="line">
        <label htmlFor="mobilePhone">Mobile Phone</label>
        <input
          type="tel"
          name="mobilePhone"
          required
          value={props.parent.mobile}
          onChange={(e) => {
            if (isPhoneNumberLengthValid(props.parent.mobile)) {
              handleChange(e, "mobile");
            }
          }}
          onBlur={(e) => {
            if (!isPhoneNumberValid(e.target.value))
              e.target.setCustomValidity(
                e.target.value +
                  " is not valid. Try entering a different phone number"
              );
            else e.target.setCustomValidity("");
          }}
        />
        <label htmlFor="receiveIncomingTextMessages">
          Would you like to receive incoming text messages?
        </label>
        <label htmlFor="yesReceiveIncomingTextMessages">Yes</label>
        <input
          type="radio"
          name={"receiveIncomingTextMessages" + props.type}
          required
          style={
            props.parent.receiveIncomingTextMessages == "yes"
              ? {
                  background:
                    "url(data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=) no-repeat center center",
                  backgroundSize: "9px 9px",
                  outlineColor: "transparent",
                }
              : {}
          }
          value="yes"
          checked={props.parent.receiveIncomingTextMessages == "yes"}
          onChange={(e) => {
            handleChange(e, "receiveIncomingTextMessages");
          }}
        />
        <label htmlFor="noReceiveIncomingTextMessages">No</label>
        <input
          type="radio"
          name={"receiveIncomingTextMessages" + props.type}
          required
          style={
            props.parent.receiveIncomingTextMessages == "no"
              ? {
                  background:
                    "url(data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=) no-repeat center center",
                  backgroundSize: "9px 9px",
                  outlineColor: "transparent",
                }
              : {}
          }
          value="no"
          checked={props.parent.receiveIncomingTextMessages == "no"}
          onChange={(e) => handleChange(e, "receiveIncomingTextMessages")}
        />
      </section>
      <br />
    </>
  );
};
export default Parent;
