//Firebase
import * as firebase from "firebase";
import "firebase/auth";

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyCGSTiA4ilhlGAsDKNgDeDUNh7dhR9-t_o",
  authDomain: "basesdedatos-firebase.firebaseapp.com",
  databaseURL: "https://basesdedatos-firebase.firebaseio.com",
  projectId: "basesdedatos-firebase",
  storageBucket: "basesdedatos-firebase.appspot.com",
  messagingSenderId: "783834277910",
  appId: "1:783834277910:web:6e23b412f93c79485d2d37",
  measurementId: "G-NYFMBDR8FP"
});

export default app;
