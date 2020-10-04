import React from "react";
import { studentTemplate } from "../../../constants/studentTemplate";

const AddAndRemoveStudent = (props) => {
  return (
    <>
      <button
        className="ui icon button"
        name="addAdditionalStudents"
        type="button"
        onClick={() => {
          props.setStudents([...props.students].concat(studentTemplate));
        }}
      >
        Add Student <i className="plus square outline icon"></i>
      </button>
      <button
        className="ui icon button"
        name="removeAdditionalStudent"
        type="button"
        onClick={() => {
          if (props.students.length > 1)
            props.setStudents(props.students.slice(0, -1));
        }}
      >
        Remove Student <i className="minus square outline icon" />
      </button>
    </>
  );
};
export default AddAndRemoveStudent;
