import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyCKFVmEL6jGSph_4TuTy9-jjAZRTO-ibhA",
	authDomain: "buddylink-418902.firebaseapp.com",
	projectId: "buddylink-418902",
	storageBucket: "buddylink-418902.appspot.com",
	messagingSenderId: "543255269223",
	appId: "1:543255269223:web:e0d44a177046477335a9c2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
