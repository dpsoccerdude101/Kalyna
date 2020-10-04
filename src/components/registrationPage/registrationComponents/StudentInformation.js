import React from "react";
import MapStudents from "./MapStudents";
import AddAndRemoveStudent from "./AddAndRemoveStudent";

const StudentInformation = (props) => {
  return (
    <>
      <h3>STUDENT INFORMATION</h3>
      <MapStudents
        students={props.students}
        setStudents={(arr) => props.setStudents(arr)}
      />
      <AddAndRemoveStudent
        students={props.students}
        setStudents={(arr) => props.setStudents(arr)}
      />
      <h5>
        <i>
          The student's name, as entered on this application, is the way it will
          appear in the recital program.
        </i>
      </h5>
    </>
  );
};

export default StudentInformation;
