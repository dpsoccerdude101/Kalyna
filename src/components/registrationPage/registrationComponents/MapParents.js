import Parent from "../registrationComponents/Parents/Parent";
import React from "react";
import { EMERGENCY_CONTACT } from "../registrationComponents/Parents/parentTypes";

const MapParents = (props) => {
  const type = (() => {
    switch (props.type) {
      case EMERGENCY_CONTACT:
        return "Emergency Contact";
      default:
        return "Parent";
    }
  })();
  // props.parents equals array of Mothers in State
  return (
    <>
      <h4>{type}'s Information:</h4>
      {props.parents ? (
        props.parents.map((parent, index) => {
          return (
            <Parent
              key={index}
              index={index}
              type={props.type}
              parent={parent}
              setParent={(newParent) =>
                props.setParents(() => {
                  let tempArr = [...props.parents];
                  tempArr[index] = newParent;
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
export default MapParents;
