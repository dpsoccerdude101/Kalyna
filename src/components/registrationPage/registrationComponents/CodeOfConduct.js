import React, { useState } from "react";

const CodeOfConduct = (props) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <h3>CODE OF CONDUCT</h3>

      <h4>
        <a
          href="https://www.uafgr.org/wp-content/uploads/2019/10/Kalyna_CodeofConduct.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          PLEASE DOWNLOAD AND READ THE CODE OF CONDUCT, PHOTO RELEASE, VOLUNTEER
          AGREEMENT {String.fromCharCode(38)} MEDICAL RELEASE
        </a>
        <br />
        <a
          href="https://www.uafgr.org/wp-content/uploads/2020/09/KALYNA_COVIDWaiver.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          PLEASE DOWNLOAD AND READ THE COVID-19 WAIVER
        </a>
      </h4>
      <input
        type="checkbox"
        name="agreementToCodeOfConduct"
        required
        checked={checked}
        value={checked}
        onChange={(e) => {
          setChecked(!checked);
          props.setAgreementToCodeOfConduct(e.target.checked);
        }}
      />
      <label htmlFor="agreementToCodeOfConduct">
        I attest that I am the parent/guardian of the child(ren) listed above. I
        have fully read the attached Code of Conduct, Photography Release for
        Minro Children, Volunteer Agreement, Release from Liability, Medical
        Release and Liability/Waiver statements. On behalf of my child(ren), I
        agree to the terms stated and they shall be binding. Also, I the
        undersigned, promise to return all costumes supplied by Kalyna on or
        before dates requested in the same condition as given to me or I will
        pay the cost for cleaning or replacement as needed.
      </label>
      <br />
      <label htmlFor="digitalSignature">Digital Signature: </label>
      <input
        type="text"
        name="digitalSignature"
        required
        value={props.digitalSignature}
        style={{ fontFamily: "Aguafina Script" }}
        onChange={(e) => props.setDigitalSignature(e.target.value)}
      />
    </>
  );
};

export default CodeOfConduct;
