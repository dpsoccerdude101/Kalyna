import { Student } from "./Students/Student";
import React from "react";

const MapStudents = (props) => {
  return (
    <>
      {props.students ? (
        props.students.map((student, index) => {
          return (
            <Student
               key={index} 
              student={student}
              setStudent={(newStudent) =>
                props.setStudents(() => {
                  let tempArr = [...props.students];
                  tempArr[index] = newStudent;
                  return tempArr;
                })
              }
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
export default MapStudents;
