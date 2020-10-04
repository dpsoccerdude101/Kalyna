import React from "react";
import { parentTemplate } from "../../../constants/parentTemplate";
import {
  MOTHER,
  FATHER,
  LEGAL_GUARDIAN,
  EMERGENCY_CONTACT,
} from "./Parents/parentTypes";

const AddAndRemoveParent = (props) => {
  //immediately invoked function
  const type = (() => {
    switch (props.type) {
      case MOTHER:
        return "Mother";
      case FATHER:
        return "Father";
      case LEGAL_GUARDIAN:
        return "Legal Guardian";
      case EMERGENCY_CONTACT:
        return "Emergency Contact";
      default:
        return "Parent";
    }
  })();
  return (
    <>
      <button
        className="ui icon button"
        name="addAdditionalParents"
        type="button"
        onClick={() => {
          if (props.parents.length < 2)
            props.setParents([...props.parents].concat(parentTemplate));
        }}
      >
        <i className="plus square outline icon" />
      </button>
      <button
        className="ui icon button"
        name="removeAdditionalParents"
        type="button"
        onClick={() => {
          if (props.parents.length > 1)
            props.setParents(props.parents.slice(0, -1));
        }}
      >
        <i className="minus square outline icon" />
      </button>
    </>
  );
};
export default AddAndRemoveParent;
