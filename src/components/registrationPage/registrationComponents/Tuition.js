import React from "react";

const Tuition = (props) => {
  return (
    <>
      <h3>TUITION</h3>
      <h5>
        <i>
          First Child Tuition includes: instruction, professionally recorded
          DVD, five recital tickets, and most (but not all) costuming. Tuition
          for additional children covers instruction and costuming only.
        </i>
      </h5>
      <ul name="tuitionForChildren">
        <li name="firstChild">First Child $240.00</li>
        <li name="secondChild">Second Child $95.00</li>
        <li name="eachAdditionalChild">
          Each Additional Child (<i>After Second</i>) $70.00
        </li>
        <li name="volunteerFee">
          Volunteer Fee (<i>If Applicable</i>) $50.00
        </li>
        {props.promocodeApplied ? (
          <li name="promocode">
            *APPLIED PROMO CODE (Instructor2020). Flat Rate $40.00
          </li>
        ) : (
          <></>
        )}
      </ul>
    </>
  );
};
export default Tuition;
