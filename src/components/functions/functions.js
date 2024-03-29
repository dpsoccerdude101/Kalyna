import * as EmailValidator from "email-validator";
import * as PhoneValidator from "phone";
import firebase from "firebase";
export const isPhoneNumberValid = (phone) => {
  return PhoneValidator(phone, "", true).length > 0;
};
export const isPhoneNumberLengthValid = (phone) => {
  return phone.replace(/\D/g, "").length <= 11;
};
export const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   * Make sure that email passes regex test and emailValidator test
   */
  return re.test(email.toLowerCase()) && EmailValidator.validate(email);
};
/* export const isVolunteerNameValid = (fullName, stateChecklist) => {
  return (
    stateChecklist
      .map((users) => {
        if (users.length >= 1) {
          return users.map(
            (person) => person.firstName + " " + person.lastName
          );
        } else return [""];
      })
      .indexOf(fullName) >= 0
  );
}; */

export const formatText = (str) => {
  let strArr = str.split(/(?=[A-Z])/);
  strArr = strArr.map((str) => {
    let temp = str.toLowerCase();
    if (temp !== "and") {
      return temp.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return temp;
    }
  });
  return strArr.join(" ");
};

//adds volunteerRole key value pair to the person that matches the volunteer name
export const addVolunteerRoleToPerson = (
  parents,
  setParents,
  volunteerFullName,
  volunteerRole,
  setVolunteerObj
) => {
  parents.forEach((parent, count) => {
    console.log("parent: " + parent.firstName + " " + parent.lastName);
    console.log(volunteerFullName);
    console.dir({
      email: parent.email,
      name: volunteerFullName,
      phoneNumber: parent.mobile,
    });
    if (parent.firstName + " " + parent.lastName == volunteerFullName) {
      setVolunteerObj({
        email: parent.email,
        name: volunteerFullName,
        phoneNumber: parent.mobile,
      });
      console.dir({
        email: parent.email,
        name: volunteerFullName,
        phoneNumber: parent.mobile,
      });
      let tempArr = [...parents];
      tempArr[count] = {
        ...parent,
        volunteerRole: volunteerRole,
      };
      setParents(() => tempArr);
    }
  });
};

/**
 *
 * @param {[Array<Objects>, Array<Objects>, Array<Objects>]} param0
 */
export const constructFormArr = ([students, parents, emergencyContacts]) => {
  return students.map((student) => {
    let studentObj = { ...student };
    let count = 0;
    for (const parent of parents) {
      let parentTitle = "parent" + count;
      studentObj = { ...studentObj, [parentTitle]: { ...parent } };
      count++;
    }
    studentObj = {
      ...studentObj,
      emergencyContact: { ...emergencyContacts[0] },
    };
    return studentObj;
  });
};

/**
 *
 * @param {Event} e
 * @return {NodeListOf<HTMLInputElement>}
 */
export const getAllRequiredInputs = (e) => {
  return e.target.querySelectorAll("input[required], input[pattern]");
};
/**
 *
 * @param {NodeListOf<HTMLInputElement>} requiredInputs
 * @param {*} cardFulfilled
 * @param {[{}[], [parentTemplate]]} param2
 * @param {String} volunteerRole
 * @param {String} volunteerFullName
 */
export const isFormValid = (requiredInputs, cardFulfilled, parents) => {
  /*
   * Check for minimum one parent + emergency contact
   */
  if (parents.length == 0) {
    alert(
      "You must have at least one parent's contact information included. Please add a parent to the registration form."
    );
    return false;
  }
  /**
   * If the card information is not filled
   */
  if (!cardFulfilled) {
    alert("Credit Card information is not complete.");
    return false;
  }
  for (const input of requiredInputs) input.reportValidity();

  return true;
};

const API = "https://us-central1-kalyna-uafgr-87f61.cloudfunctions.net/api";
//import { auth } from "../firebasefire";

/**
 * A helper function to fetch data from your API.
 */
export async function fetchFromAPI(endpointURL, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };

  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

/**
 *
 * @param {Array<Object>} data
 * @param {Array<Object>} studentsObjs
 */
export const doesFormMatchExistingDocuments = (data, studentsObjs) => {
  for (const doc of data) {
    for (const student of studentsObjs) {
      console.dir(doc);
      console.dir(student);
      //if they do match, return true
      if (
        doc.firstName == student.firstName &&
        doc.lastName == student.lastName
      )
        return true;
    }
  }
  //if doc and student have properties of firstName and last Name then check if they match
  //if it has those fields and none of them match then return false
  return false;
};

/**
 *
 * @param {*} student
 * @param {*} importedData
 * @param {*} setErrorMessage
 * @returns {boolean} isStudentWrittentoDB
 */
export const writeFormArrToDB = async (student, length, setErrorMessage) => {
  const db = firebase.firestore();
  const lengthStr = length.toString();
  await db
    .collection("students")
    .doc()
    .set(student)
    .then((response) => {
      console.log(student + " successfully written!");
      return true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      setErrorMessage(error);
      return false;
    });
};
export const writeVolunteerObjToDB = async (
  volunteerObj,
  volunteerID,
  setErrorMessage
) => {
  const db = firebase.firestore();
  await db
    .collection("volunteerRoles")
    .doc(volunteerID)
    .set(volunteerObj, { merge: true })
    .then((response) => {
      firebase
        .analytics()
        .logEvent(
          "new_volunteer_added",
          JSON.stringify(volunteerObj) + response
        );
      console.log(volunteerObj + " successfully written!");
      return true;
    })
    .catch(function (error) {
      firebase
        .analytics()
        .logEvent(
          "new_volunteer_added_failure",
          JSON.stringify(volunteerObj) + error
        );
      console.error("Error writing document: ", error);
      setErrorMessage(error);
      return false;
    });
};

export const initializeImportedData = async (setImportedData) => {
  const db = firebase.firestore();
  const data = await db.collection("studentsNames").get();
  setImportedData(
    data.docs.length > 0
      ? data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      : [
          {
            firstName: "aaaaaaaaaa",
            lastName: "aaaaaaaaaaaaa",
            group: 6,
            id: 0,
          },
        ]
  );
};
/**
 *
 * @param {{}[]} students
 * @param {React.Dispatch<React.SetStateAction<{}[]>>} setStudents
 */
export const addPaidTuitionAttributeToEachStudent = (students, setStudents) => {
  setStudents(() => {
    const tempArr = [...students];
    const modifiedTempArr = tempArr.map((student) => {
      return { ...student, paidTuition: "yes" };
    });
    return modifiedTempArr;
  });
};
