import React from "react";
import MapParents from "./MapParents";
import AddAndRemoveParent from "./AddAndRemoveParent";
import { EMERGENCY_CONTACT } from "../../../components/registrationPage/registrationComponents/Parents/parentTypes";

const StudentContacts = (props) => {
  return (
    <>
      <h3>STUDENT CONTACTS</h3>
      <MapParents
        parents={props.parents}
        setParents={(arr) => props.setParents(arr)}
      />
      <AddAndRemoveParent
        parents={props.parents}
        setParents={(arr) => props.setParents(arr)}
      />
      <br />
      <br />
      <MapParents
        parents={props.emergencyContacts}
        setParents={(arr) => props.setEmergencyContacts(arr)}
        type={EMERGENCY_CONTACT}
      />
      <h5>
        <i>
          By providing your email address and signing below you have given
          Kalyna permission to send you emails and texts using out chosen e-mail
          and text management tools. Please look for news and updates via these
          communications.
        </i>
      </h5>
    </>
  );
};

export default StudentContacts;
