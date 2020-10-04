import React from "react";
import firebase from "../firebase";

export const StudentInput = ({ student }) => {
  const [firstName, setName] = React.useState(student.firstName);

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection('students').doc('0').set({...student, firstName})
  }
  return (
    <>
      <input
        value={firstName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={() => onUpdate()}>Update</button>
    </>
  );
};
