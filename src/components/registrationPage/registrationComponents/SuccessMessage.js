import React, { useState } from "react";

const SuccessMessage = (props) => {
  return props.submit == "loading" ? (
    <div className="ui icon message" style={{ position: "fixed", top: "0" }}>
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>We're registering your student dancer(s) for you.</p>
      </div>
    </div>
  ) : props.submit == "volunteer role" ? (
    <div className="ui icon message" style={{ position: "fixed", top: "0" }}>
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>
          We're adding the volunteer role to the parent's information for you.
        </p>
      </div>
    </div>
  ) : props.submit == "student already registered" ? (
    <div className="ui error message">
      <div className="header">
        The student you have entered is already registered.
      </div>
      <ul class="list">
        <li>You must include both a new student to be registered.</li>
      </ul>
    </div>
  ) 
  : props.submit == "loading payment" ? (
    <div className="ui icon message" style={{ position: "fixed", top: "0" }}>
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>
          We're handling payment for the registration of your student dancer(s)
          for you.
        </p>
      </div>
    </div>
  ) : props.submit == "payment accepted" ? (
    <div className="ui icon message" style={{ position: "fixed", top: "0" }}>
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>
          Your credit card was succesfully charged. Now preparing student
          information to be sent off to the database...
        </p>
      </div>
    </div>
  ) : props.submit == "payment intent accepted" ? (
    <div className="ui icon message" style={{ position: "fixed", top: "0" }}>
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>
          Payment intent accepted. Importing existing student database for
          duplicate checking...
        </p>
      </div>
    </div>
  ) : props.submit == "loading payment charge" ? (
    <div className="ui icon message" style={{ position: "fixed", top: "0" }}>
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>Charging your credit card currently...</p>
      </div>
    </div>
  ) : props.submit == "success" ? (
    <div className="ui success message" style={{ position: "fixed", top: "0" }}>
      <div className="header">
        Your student dancer registration was successful.
      </div>
      <p>Please check your email for a receipt.</p>
    </div>
  ) : props.submit == "error" ? (
    <div className="ui error message" style={{ position: "fixed", top: "0" }}>
      <div className="header">There were some errors with your submission</div>
      <ul className="list">
        <li>{props.errorMessage}</li>
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default SuccessMessage;
