import React, { useState, useEffect } from "react";
import {
  isPhoneNumberLengthValid,
  isEmailValid,
  isPhoneNumberValid,
} from "../../../functions/functions";
import firebase from "firebase";
import {
  getAge,
  formatMailingAddress,
  getGroupByGradeAndSex,
} from "./studentFunctions";
import States from "./States";
import DatePicker from "react-date-picker";
import { postcodeValidator } from "postcode-validator";

export const Student = (props) => {
  /*You are accepting two props (props.student and props.setStudent()).
    props.setStudent(newStudent) is a function that takes a parameter 
    that is a modified version of student with your updates in it. */
  const [checked, setChecked] = useState(false);
  const handleChange = (event, property) => {
    const value = event.target.value;
    props.setStudent({ ...props.student, [property]: value });
  };
  const handleGroupChange = (value, property) => {
    props.setStudent({ ...props.student, [property]: value });
  };
  const handleCheckChange = (checkedValue, property) => {
    props.setStudent({ ...props.student, [property]: checkedValue });
  };
  const handleChangeAge = (ageValue, property) => {
    props.setStudent({ ...props.student, [property]: ageValue });
  };
  const handleMailingAddressChange = (addressValue, property) => {
    props.setStudent({ ...props.student, [property]: addressValue });
  };
  const handleDateChange = (value) => {
    props.setStudent({ ...props.student, dateOfBirth: value });
  };

  useEffect(() => {
    handleChangeAge(getAge(props.student.dateOfBirth), "age");
  }, [props.student.dateOfBirth]);
  useEffect(() => {
    getGroupByGradeAndSex(
      props.student.grade,
      props.student.sex,
      handleGroupChange
    );
  }, [props.student.grade, props.student.sex]);
  return (
    <>
      <section className="line">
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          required
          value={props.student.firstName}
          onChange={(e) => handleChange(e, "firstName")}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          required
          value={props.student.lastName}
          onChange={(e) => handleChange(e, "lastName")}
        />
        <label htmlFor="sex">Sex</label>
        <select
          name="sex"
          required
          value={props.student.sex}
          onChange={(e) => handleChange(e, "sex")}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="dateOfBirth">Date of Birth (mm/dd/year)</label>
        <DatePicker
          value={props.student.dateOfBirth}
          onChange={(e) => {
            handleDateChange(e);
          }}
          required
          maxDate={new Date("December 31, 2016 00:00:00")}
          minDate={new Date("January 1, 2000 00:00:00")}
        />
        <label htmlFor="grade">Grade</label>
        <select
          name="grade"
          required
          value={props.student.grade}
          onChange={(e) => {
            handleChange(e, "grade");
          }}
        >
          <option value="Pre-K">Pre-K</option>
          <option value="Kindergarten">Kindergarten</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <label htmlFor="group">Group</label>
        <input
          type="number"
          name="group"
          readOnly
          value={props.student.group}
        />
      </section>
      <section
        className="line"
        onBlur={() =>
          handleMailingAddressChange(
            formatMailingAddress(
              props.student.address,
              props.student.city,
              props.student.state,
              props.student.zip
            ),
            "mailingAddress"
          )
        }
      >
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          required
          value={props.student.address}
          onChange={(e) => handleChange(e, "address")}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          required
          value={props.studentcity}
          onChange={(e) => handleChange(e, "city")}
        />
        <label htmlFor="state">State</label>
        <select
          name="state"
          required
          value={props.student.state}
          onChange={(e) => handleChange(e, "state")}
        >
          <States />
        </select>
        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          name="zip"
          required
          value={props.student.zip}
          onChange={(e) => handleChange(e, "zip")}
          onBlur={(e) => {
            if (!postcodeValidator(e.target.value, "US"))
              e.target.setCustomValidity(
                e.target.value +
                  " is not valid. Try entering a different zip code"
              );
            else e.target.setCustomValidity("");
          }}
        />
      </section>
      <section className="line">
        <label htmlFor="mobilePhone">
          Mobile Phone <i>(if applicable)</i>
        </label>
        <input
          type="tel"
          name="mobilePhone"
          value={props.student.mobile}
          onChange={(e) => {
            if (isPhoneNumberLengthValid(e.target.value))
              handleChange(e, "mobile");
          }}
          onBlur={(e) => {
            if (e.target.value.length > 0) {
              if (!isPhoneNumberValid(e.target.value))
                e.target.setCustomValidity(
                  e.target.value +
                    " is not valid. Try entering a different phone number"
                );
              else e.target.setCustomValidity("");
            } else e.target.setCustomValidity("");
          }}
        />
        {props.student.mobile.length > 0 ? (
          <>
            {" "}
            <label htmlFor="receiveIncomingTextMessages">
              Would you like to receive incoming text messages?
            </label>
            <label htmlFor="yesReceiveIncomingTextMessages">Yes</label>
            <input
              type="radio"
              name="receiveIncomingTextMessages"
              required
              style={
                props.student.receiveIncomingTextMessages == "yes"
                  ? {
                      background:
                        "url(data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=) no-repeat center center",
                      backgroundSize: "9px 9px",
                      outlineColor: "transparent",
                    }
                  : {}
              }
              value="yes"
              checked={props.student.receiveIncomingTextMessages == "yes"}
              onChange={(e) => handleChange(e, "receiveIncomingTextMessages")}
            />
            <label htmlFor="noReceiveIncomingTextMessages">No</label>
            <input
              type="radio"
              name="receiveIncomingTextMessages"
              required
              style={
                props.student.receiveIncomingTextMessages == "no"
                  ? {
                      background:
                        "url(data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=) no-repeat center center",
                      backgroundSize: "9px 9px",
                      outlineColor: "transparent",
                    }
                  : {}
              }
              value="no"
              checked={props.student.receiveIncomingTextMessages == "no"}
              onChange={(e) => handleChange(e, "receiveIncomingTextMessages")}
            />
          </>
        ) : (
          <></>
        )}

        <label htmlFor="email">
          E-Mail Address <i>(if applicable)</i>
        </label>
        <input
          type="email"
          name="email"
          value={props.student.email}
          onChange={(e) => handleChange(e, "email")}
          onBlur={(e) => {
            if (e.target.value.length > 0) {
              if (!isEmailValid(e.target.value))
                e.target.setCustomValidity(
                  e.target.value + " not valid. Try entering a different email."
                );
              else e.target.setCustomValidity("");
            } else e.target.setCustomValidity("");
          }}
        />
      </section>
      <section className="line">
        <label htmlFor="additionalInformation">
          Additional Information{" "}
          <i>(medical needs, allergies, outside activities, etc)</i>
        </label>
        <textarea
          type="textArea"
          name="additionalInformation"
          rows="5"
          cols="33"
          value={props.student.additionalInformation}
          onChange={(e) => handleChange(e, "additionalInformation")}
        />
      </section>
      <section className="line">
        <label htmlFor="returningDancer">Returning dancer?</label>
        <input
          type="checkbox"
          name="returningDancer"
          checked={checked}
          value={checked}
          onChange={(e) => {
            setChecked(!checked);
            handleCheckChange(e.target.checked, "returningDancer");
          }}
        />
      </section>
    </>
  );
};
