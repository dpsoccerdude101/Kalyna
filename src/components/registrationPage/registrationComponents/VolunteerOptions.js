import React, { useEffect } from "react";

const VolunteerOptions = (props) => {
  //Set initial value so that no empties exist
  useEffect(() => {
    if (props.volunteer == "yes") {
      props.setVolunteerRole(
        () => Object.entries(props.importedVolunteerData[0])[0][1].volunteerRole
      );
      props.setVolunteerID(
        () => Object.entries(props.importedVolunteerData[0])[0][0]
      );
    }
  }, [props.volunteer]);

  useEffect(() => {
    props.setVolunteerFullName(
      props.parents[0].firstName + " " + props.parents[0].lastName
    );
  }, [props.parents[0]]);

  const handleVolunteerAdd = (e) => {
    let [volunteerID, volunteerRole] = e.target.value.split(":");
    console.log(volunteerID);
    props.setVolunteerRole(volunteerRole);
    props.setVolunteerID(volunteerID);
  };
  return (
    <>
      <br />
      <section className="line">
        <label htmlFor="volunteerFullName">Parent Volunteer</label>
        <select
          name="volunteerFullName"
          required={props.volunteer == "yes"}
          value={props.volunteerFullName}
          onChange={(e) => props.setVolunteerFullName(e.target.value)}
        >
          {props.parents.map((parent, index) =>
            parent.firstName != "" && parent.lastName != "" ? (
              <option
                value={parent.firstName + " " + parent.lastName}
                key={index}
              >
                {parent.firstName + " " + parent.lastName}
              </option>
            ) : (
              ""
            )
          )}
        </select>
        <div name="roleDiv">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            required={props.volunteer == "yes"}
            value={props.volunteerID + ":" + props.volunteerRole}
            onChange={(e) => handleVolunteerAdd(e)}
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
                            value={
                              volunteer[0] + ":" + volunteer[1].volunteerRole
                            }
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
