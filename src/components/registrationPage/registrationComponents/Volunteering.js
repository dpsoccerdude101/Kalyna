import React from "react";
import VolunteerOptions from "./VolunteerOptions";

const Volunteering = (props) => {
  return (
    <>
      <h3>VOLUNTEERING</h3>
      <h5>
        <i>
          Kalyna is a volunteer-run organization. Parent Participation is vital
          to our existence. Those who choose to not volunteer, will be required
          to pay a $50 Volunteer Fee to offset expenses.
        </i>
      </h5>
      <input
        type="radio"
        name="volunteerRadio"
        value="yes"
        required
        style={
          props.volunteer === "yes"
            ? {
                background:
                  "url(data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=) no-repeat center center",
                backgroundSize: "9px 9px",
                outlineColor: "transparent",
              }
            : {}
        }
        checked={props.volunteer === "yes"}
        onChange={(e) => props.setVolunteer(e.target.value)}
      />
      <label htmlFor="yesVolunteer">
        Yes, I will volunteer for Kalyna in the following role.
      </label>
      <input
        type="radio"
        name="volunteerRadio"
        value="no"
        style={
          props.volunteer === "no"
            ? {
                background:
                  "url(data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=) no-repeat center center",
                backgroundSize: "9px 9px",
                outlineColor: "transparent",
              }
            : {}
        }
        checked={props.volunteer === "no"}
        onChange={(e) => {
          props.setVolunteer(e.target.value);
          props.setVolunteerRole("");
        }}
      />
      <label htmlFor="noVolunteer">
        No, I unfortunately will not be able to volunteer this year{" "}
        {String.fromCharCode(38)} will pay the $50 Volunteer Fee.
      </label>
      {props.volunteer === "yes" ? (
        <VolunteerOptions
          volunteerRole={props.volunteerRole}
          setVolunteerRole={(arr) => props.setVolunteerRole(arr)}
          volunteerFullName={props.volunteerFullName}
          setVolunteerFullName={(arr) => props.setVolunteerFullName(arr)}
          volunteer={props.volunteer}
          stateChecklist={props.stateChecklist}
          importedVolunteerData={props.importedVolunteerData}
          parents={props.parents}
          emergencyContacts={props.emergencyContacts}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Volunteering;
