const numGroups = 5; //group 0 is no group for administrators
let data = {
  students: {},
  others: {},
};

data.students[0] = {
  firstName: "Dennis",
  lastName: "Pavlyuk",
  dob: "06/09/2000",
  age: "20", //Calculated from DOB
  grade: "NA",
  group: 4,
  address: {
    mailingAddress: "30 Tuscany Lane, Webster, NY 14580", //Concatenated from text fields
    address: "30 Tuscany Lane",
    city: "Webster",
    state: "NY",
    zip: "14580",
  },
  mobile: "5853170476", //cleaned up by logic to be without symbols
  email: "dennispavlyuk@gmail.com", //must require at least one per form for confirmation
  additionalInformation: "NA",
  studentContacts: {
    //must require at least one guardian party here
    //Also must include language for guardianship
    mother: {
      firstName: "Yuliya",
      lastName: "Pavlyuk",
      email: "yulyashka78@gmail.com",
      mobile: "5858999072",
      receiveIncomingTextMessages: true,
    },
    father: {
      firstName: "Volodymyr",
      lastName: "Pavlyuk",
      email: "vpavlyuk72@gmail.com",
      mobile: "5853190177",
      receiveIncomingTextMessages: true,
    },
  },
  volunteering: {
    volunteerStatus: true, //if false, $50 fee
    individual: "Volodymyr Pavlyuk",
    role: "Leader",
  },
  tuition: "$240.00",
  agreementToCodeOfConduct: true,
  digitalSignature: true,
  paymentProcessed: true,
};
/* for (let count = 0; count < numGroups; count++) {
  data[count] = { group: count };
} */

console.log(data);
let groups = {
  init: (init = () => {
    for (let count = 0; count <= numGroups; count++) {
      groups[group`count`] = {};
    }
  })(),
};

let familyName = () => {};

let person = () => {};
let newGroup = groups();
for (const key in newGroup) {
  console.log(key);
}
