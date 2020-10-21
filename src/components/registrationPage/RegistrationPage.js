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
  writeVolunteerObjToDB,
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
  const [volunteerID, setVolunteerID] = useState("");
  const [volunteerObj, setVolunteerObj] = useState({});
  const [totalTuition, setTotalTuition] = useState(0);
  const [agreementToCodeOfConduct, setAgreementToCodeOfConduct] = useState();
  const [submit, setSubmit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [promocodeApplied, setPromocodeApplied] = useState("");
  const [formArr, setFormArr] = useState([]);
  const [cardFulfilled, setCardFulfilled] = useState();
  const [importedVolunteerData, setImportedVolunteerData] = useState([]);
  const [error, setError] = useState("");

  /**
   * This gets all of the available volunteer positions to hydrate the webpage with
   */
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("availableVolunteerRoles").get();
      setImportedVolunteerData(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: formatText(doc.id),
        }))
      );
    };
    fetchData();
  }, []);

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
        addPaidTuitionAttributeToEachStudent(students, setStudents);
        stateModifier(() => "construct formArr");
        break;
      case "construct formArr":
        setFormArr(() =>
          constructFormArr([students, parents, emergencyContacts])
        );
        stateModifier("formArr constructed");
        break;
      case "student already registered":
        alert("This student has already been registered.");
        break;
      case "formArr constructed":
        console.dir(formArr);
        if (formArr.length > 0 && importedData.length > 0) {
          stateModifier(() => "loading");
          //get id of last student
          let length =
            parseInt(importedData[importedData.length - 1].id, 10) + 1;
          if (volunteerObj != {}) {
            writeVolunteerObjToDB(volunteerObj, volunteerID, setErrorMessage)
              ? stateModifier(() => "success")
              : stateModifier(() => "error");
          }
          for (const student of formArr) {
            writeFormArrToDB(student, length, setErrorMessage)
              ? stateModifier(() => "success")
              : stateModifier(() => "error");
            length++;
            firebase.analytics().logEvent("new_student_registered", student);
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
    if (isFormValid(requiredInputs, cardFulfilled, parents)) {
      /**
       * If a volunteer role is chosen then append it as a property to that person object.
       * Also set the VolunteerObj.
       */
      if (volunteer == "yes") {
        addVolunteerRoleToPerson(
          parents,
          setParents,
          volunteerFullName,
          volunteerRole,
          setVolunteerObj
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
      <SuccessMessage submit={submit} error={error} />
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
            parents={parents}
            emergencyContacts={emergencyContacts}
            volunteerID={volunteerID}
            setVolunteerID={setVolunteerID}
            parents={parents}
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
