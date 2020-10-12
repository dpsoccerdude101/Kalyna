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
export const isVolunteerNameValid = (fullName, stateChecklist) => {
  let fullnames = [];
  stateChecklist.forEach((user) => {
    if (user.length >= 1) {
      user.forEach((person) => {
        fullnames.push(person.firstName + " " + person.lastName);
      });
    }
  });
  //console.log(fullnames.indexOf(fullName));
  return fullnames.indexOf(fullName) >= 0 ? true : false;
};

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
  stateChecklist,
  setterStateChecklist,
  volunteerFullName,
  volunteerRole
) => {
  let masterIndex = 0;
  let modifiedPersonType = {};
  stateChecklist.forEach((personType, index) => {
    personType.forEach((person, count) => {
      if (person.firstName + " " + person.lastName == volunteerFullName) {
        //console.log("found");
        masterIndex = index;
        let tempArr = [...personType];
        tempArr[count] = {
          ...person,
          volunteerRole: volunteerRole,
        };
        //console.log(tempArr);
        modifiedPersonType = tempArr;
        setterStateChecklist[index]((prevArr) => tempArr);
      }
    });
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
export const isFormValid = (
  requiredInputs,
  cardFulfilled,
  [parents, emergencyContacts],
  volunteerRole,
  volunteerFullName
) => {
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
  if (volunteerRole != "") {
    if (
      !isVolunteerNameValid(volunteerFullName, [parents, emergencyContacts])
    ) {
      alert(
        "The name of the Volunteer entered does not match any of the names of the Student's contacts. Please enter a parent's name."
      );
      return false;
    }
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
 * @param {*} setSubmit
 * @param {*} setErrorMessage
 * @returns {boolean} isStudentWrittentoDB
 */
export const writeFormArrToDB = async (student, length, setErrorMessage) => {
  const db = firebase.firestore();
  const lengthStr = length.toString();
  await db
    .collection("testStudents")
    .doc(lengthStr)
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

export const initializeImportedData = async (setImportedData) => {
  const db = firebase.firestore();
  console.dir(db);
  const data = await db.collection("testStudentsNames").get();
  console.dir(data);
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
