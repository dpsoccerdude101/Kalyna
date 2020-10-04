import React, { useEffect } from "react";

const VolunteerOptions = (props) => {
  //Set initial value so that no empties exist
  useEffect(() => {
    if (props.volunteer == "yes") {
      props.setVolunteerRole(
        Object.entries(props.importedVolunteerData[0])[0][1].volunteerRole
      );
    }
  }, [props.volunteer]);
  return (
    <>
      <br />
      <section className="line">
        <label htmlFor="volunteerFullName">Volunteer's Full Name</label>
        <input
          type="text"
          name="volunteerFullName"
          required={props.volunteer == "yes"}
          value={props.volunteerFullName}
          onChange={(e) => props.setVolunteerFullName(e.target.value)}
        />
        <div name="roleDiv">
          <label htmlFor="role">Role</label>

          <select
            name="role"
            required={props.volunteer == "yes"}
            value={props.volunteerRole}
            onChange={(e) => props.setVolunteerRole(e.target.value)}
          >
            {props.importedVolunteerData ? (
              props.importedVolunteerData.map((volunteerGroup) => {
                return (
                  <optgroup label={volunteerGroup.id} key={volunteerGroup.id}>
                    {Object.entries(volunteerGroup).map((volunteer) => {
                      //filter out id
                      if (volunteer[0] != "id") {
                        return (
                          <option
                            value={volunteer[1].volunteerRole}
                            title={volunteer[1].description}
                            key={volunteer[0]}
                          >
                            {volunteer[1].volunteerPosition}
                          </option>
                        );
                      }
                    })}
                  </optgroup>
                );
              })
            ) : (
              <></>
            )}
          </select>
        </div>
      </section>
    </>
  );
};
export default VolunteerOptions;
