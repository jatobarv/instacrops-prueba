require("firebase/auth");
const firebase = require("firebase");
const admin = require("firebase-admin");
const serviceAccount = require("./instacrops-2c490-firebase-adminsdk-7uoa3-7897caf442.json");

const firebaseConfig = {
  apiKey: "AIzaSyBccx7m9LwHXx0soCLVKXG3YMEaj1ctBGo",
  authDomain: "instacrops-2c490.firebaseapp.com",
  databaseURL: "https://instacrops-2c490-default-rtdb.firebaseio.com",
  projectId: "instacrops-2c490",
  storageBucket: "instacrops-2c490.appspot.com",
  messagingSenderId: "734383701819",
  appId: "1:734383701819:web:7ea9f0194cfe251d30c11e",
};

firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://instacrops-2c490-default-rtdb.firebaseio.com",
});
module.exports = { firebase, admin };
