export const getAge = (date) => {
  date = Date.parse(date);
  let now = Date.now();
  let age = Math.floor(((now - date) * 0.001) / 31556952);
  return age;
};
export const formatMailingAddress = (address, city, state, zip) => {
  return address + ", " + city + ", " + state + " " + zip;
};
