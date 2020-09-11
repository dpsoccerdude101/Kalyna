const firestoreService = require("firestore-export-import");
const serviceAccount = require("./serviceAccountKey.json");

const databaseUrl = "https://kalyna-uafgr-87f61.firebaseio.com";

firestoreService.initializeApp(serviceAccount, databaseUrl);

firestoreService.restore("./data.json");