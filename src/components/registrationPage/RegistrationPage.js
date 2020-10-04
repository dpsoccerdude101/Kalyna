import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { studentTemplate, parentTemplate } from "../../constants/index";
import StudentInformation from "./registrationComponents/StudentInformation";
import StudentContacts from "./registrationComponents/StudentContacts";
import Volunteering from "./registrationComponents/Volunteering";
import Tuition from "./registrationComponents/Tuition";
import CodeOfConduct from "./registrationComponents/CodeOfConduct";
import PaymentInformation from "./registrationComponents/PaymentInformation";
import {
  addVolunteerRoleToPerson,
  isFormValid,
  getAllRequiredInputs,
  constructFormArr,
  formatText,
  doesFormMatchExistingDocuments,
  writeFormArrToDB,
  initializeImportedData,
  addPaidTuitionAttributeToEachStudent,
} from "../functions/functions";
import SuccessMessage from "./registrationComponents/SuccessMessage";

const RegistrationPage = (props) => {
  const [students, setStudents] = useState([studentTemplate]);
  const [emergencyContacts, setEmergencyContacts] = useState([parentTemplate]);
  const [parents, setParents] = useState([parentTemplate]);
  const [importedData, setImportedData] = useState([]);
  const [volunteer, setVolunteer] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");
  const [volunteerRole, setVolunteerRole] = useState("");
  const [volunteerFullName, setVolunteerFullName] = useState("");
  const [totalTuition, setTotalTuition] = useState(0);
  const [agreementToCodeOfConduct, setAgreementToCodeOfConduct] = useState();
  const [submit, setSubmit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [promocodeApplied, setPromocodeApplied] = useState("");
  const [formArr, setFormArr] = useState([]);
  const [cardFulfilled, setCardFulfilled] = useState();
  const [importedVolunteerData, setImportedVolunteerData] = useState([]);
  const [error, setError] = useState();

  /**
   * This gets all of the available volunteer positions to hydrate the webpage with
   */
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("availableVolunteerRoles").get();
      //setImportedVolunteerDataLength(data.size);
      setImportedVolunteerData(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: formatText(doc.id),
        }))
      );
    };
    fetchData();
  }, []);

  /* useEffect(() => {
    if (submit == "payment accepted") {
      setStudents((students) => {
        let tempArr = [...students];
        const modifiedTempArr = tempArr.map((student) => {
          return { ...student, paidTuition: true };
        });
        return modifiedTempArr;
      });
      setSubmit((submit) => "loading");
    }
  }, [submit]);
*/
  /* useEffect(() => {
    if (submit == "volunteer role") {
      setFormArr((formArr) =>
        constructFormArr([students, parents, emergencyContacts])
      );
    }
  }, [submit]); */

  /**
   * This gets all of the current students in the db to check for any matches
   */
  /*   useEffect(() => {
    if (formArr.length > 0) {
      (async () => {
        const db = firebase.firestore();
        const data = await db.collection("studentsNames").get();
        setImportedData(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      })();
    }
  }, [formArr]); */
  /**
   * This checks if any of the submitted students match any of the
   * existing students in the db.
   */

  /*   useEffect(() => {
    if (
      submit == "payment intent accepted" &&
      formArr.length > 0 &&
      importedData.length > 0
    ) {
      setSubmit((submit) => "loading");
      const onSubmit = async (student) => {
        const db = firebase.firestore();
        const length = (importedData.length + 1).toString();
        setErrorMessage("");
        await db
          .collection("students")
          .doc(length)
          .set(student)
          .then((response) => {
            console.log(student + " successfully written!");
            setSubmit((submit) => "success");
            setErrorMessage("");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
            setSubmit((submit) => "error");
            setErrorMessage(error);
          });
      };
      formArr.forEach((formObj) => onSubmit(formObj));
    }
  }, [submit]); */
  useEffect(() => {
    if (importedData.length > 0) {
      const formDoesMatchDocs = doesFormMatchExistingDocuments(
        importedData,
        students
      );
      if (!formDoesMatchDocs) {
        setSubmit((submit) => "loading payment charge");
      } else {
        setSubmit("student already registered");
      }
    }
  }, [importedData]);

  /**
   *
   * @param {submit} state
   * @param {setSubmit} stateModifier
   */
  const submitReducer = (state, stateModifier) => {
    switch (state) {
      case "payment intent accepted":
        initializeImportedData(setImportedData);
        break;
      case "payment accepted":
        addPaidTuitionAttributeToEachStudent(setStudents);
        stateModifier((submit) => "construct formArr");
        break;
      case "construct formArr":
        setFormArr((formArr) =>
          constructFormArr([students, parents, emergencyContacts])
        );
        stateModifier("formArr constructed");
        break;
      case "student already registered":
        alert("This student has already been registered.");
        break;
      case "formArr constructed":
        if (formArr.length > 0 && importedData.length > 0) {
          stateModifier((submit) => "loading");
          for (const student of formArr) {
            writeFormArrToDB(student, importedData, setErrorMessage)
              ? stateModifier((submit) => "success")
              : stateModifier((submit) => "failure");
          }
        }
        break;
      default:
    }
  };

  /**
   * Validates Form
   * @param {Event} e
   */
  const formValidation = (e) => {
    e.preventDefault();
    const requiredInputs = getAllRequiredInputs(e);
    console.log(requiredInputs);
    if (
      isFormValid(
        requiredInputs,
        cardFulfilled,
        [parents, emergencyContacts],
        volunteerRole,
        volunteerFullName
      )
    ) {
      /**
       * If a volunteer role is chosen then append it as a property to that person object
       */
      if (volunteerRole != "") {
        addVolunteerRoleToPerson(
          [parents, students, emergencyContacts],
          [setParents, setStudents, setEmergencyContacts],
          volunteerFullName,
          volunteerRole
        );
      }
      setSubmit("loading payment");
    }
  };
  /**
   * Runs all of the event-driven-programming after the submit button is pushed
   */
  useEffect(() => submitReducer(submit, setSubmit), [submit]);
  return (
    <>
      <SuccessMessage submit={submit} errorMessage={errorMessage} />
      <div id="studentInformation">
        <h1>2020/21 Student Registration</h1>
        <form onSubmit={(e) => formValidation(e)}>
          <StudentInformation students={students} setStudents={setStudents} />
          <hr />
          <StudentContacts
            emergencyContacts={emergencyContacts}
            setEmergencyContacts={setEmergencyContacts}
            parents={parents}
            setParents={setParents}
          />
          <hr />
          <Volunteering
            volunteerRole={volunteerRole}
            setVolunteerRole={setVolunteerRole}
            volunteerFullName={volunteerFullName}
            setVolunteerFullName={setVolunteerFullName}
            volunteer={volunteer}
            setVolunteer={setVolunteer}
            importedVolunteerData={importedVolunteerData}
          />
          <hr />
          <Tuition
            students={students}
            volunteer={volunteer}
            promocodeApplied={promocodeApplied}
          />
          <hr />
          <CodeOfConduct
            digitalSignature={digitalSignature}
            setDigitalSignature={setDigitalSignature}
            agreementToCodeOfConduct={agreementToCodeOfConduct}
            setAgreementToCodeOfConduct={setAgreementToCodeOfConduct}
          />
          <hr />
          <PaymentInformation
            totalTuition={totalTuition}
            setTotalTuition={setTotalTuition}
            students={students}
            volunteer={volunteer}
            promocodeApplied={promocodeApplied}
            setPromocodeApplied={setPromocodeApplied}
            submit={submit}
            setSubmit={setSubmit}
            setCardFulfilled={setCardFulfilled}
            parents={parents}
            error={error}
            setError={setError}
          />
          <hr />
          <br />
          <input type="submit" value="SUBMIT"></input>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;