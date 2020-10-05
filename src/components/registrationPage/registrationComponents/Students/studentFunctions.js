export const getAge = (date) => {
  date = Date.parse(date);
  let now = Date.now();
  let age = Math.floor(((now - date) * 0.001) / 31556952);
  return age;
};
export const formatMailingAddress = (address, city, state, zip) => {
  return address + ", " + city + ", " + state + " " + zip;
};

/**
 *
 * @param {String} grade
 * @param {String} sex
 * @param {React.Dispatch<React.SetStateAction<Object>>} stateModifier
 */
export const getGroupByGradeAndSex = (grade, sex, stateModifier) => {
  console.log(grade);
  console.dir(stateModifier);
  let group = 0;
  if (grade == "Pre-K" || grade == "Kindergarten" || grade == "1") group = 1;
  else if (Number.parseInt(grade, 10) <= 4) group = 2;
  else if (
    (Number.parseInt(grade, 10) <= 6 && sex == "female") ||
    (Number.parseInt(grade, 10) <= 7 && sex == "male")
  )
    group = 3;
  else if (Number.parseInt(grade, 10) <= 12) group = 4;
  else group = 0;
  stateModifier(group, "group");
};
