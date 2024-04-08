// import { auth } from "@/firebaseConfig";
// import { setDoc } from "firebase/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export const createUser = async (email, password) => {
// 	const returnMessage = { error: false, message: "" };

// 	await createUserWithEmailAndPassword(auth, email, password)
// 		.then((userCredential) => {
// 			const newUser = {
// 				id: userCredential.user.uid,
// 				isLocal: false,
// 				email: userCredential.user.email,
// 				settings: {
// 					reminderTime: { hour: 9, minute: 0 },
// 					pushNotifications: "true",
// 				},
// 				friends: [],
// 				reminders: [],
// 			};
// 			setDoc((doc, "users", newUser.id), newUser);
// 		})
// 		.catch((error) => {
// 			returnMessage.error = true;
// 			returnMessage.message = error;
// 			return returnMessage;
// 		});
// 	return returnMessage;
// };

// const userAuthChanged = () =>
// 	auth.onAuthStateChanged((authUser) => {
// 		console.log(authUser);
// 	});

// export async function signIn(email, password) {
// 	const returnMessage = { error: false, message: "" };
// 	await signInWithEmailAndPassword(auth, email, password)
// 		.then((userCredential) => {
// 			// Signed in
// 			// getUserInfo(userInfo.email);
// 			userAuthChanged();
// 		})
// 		.catch((error) => {
// 			returnMessage.error = true;
// 			returnMessage.message = error;
// 			return returnMessage;
// 		});
// 	return returnMessage;
// }

// export async function signOut() {
// 	const returnMessage = { error: false, message: "" };
// 	await signOut(auth)
// 		.then(() => {
// 			// Sign-out successful.
// 		})
// 		.catch((error) => {
// 			returnMessage.error = true;
// 			returnMessage.message = error;
// 			return returnMessage;
// 		});
// 	return returnMessage;
// }

// export async function getUserInfo(email) {
// 	const returnMessage = { error: false, message: "" };
// 	const querySnapshot = await getDocs(
// 		query(collection(db, "users"), where("email", "==", email))
// 	);
// 	querySnapshot.forEach((doc) => {
// 		currentUser.value = doc.data();
// 	});
// 	if (user) {
// 		return user;
// 	} else {
// 		returnMessage.error = true;
// 		returnMessage.message = "User not found";
// 		return returnMessage;
// 	}
// }

// export async function updateUserInfo(user, friends, reminders) {
// 	const returnMessage = { error: false, message: "" };
// 	await updateDoc(doc(db, "users", user.id), {
// 		email: user.email,
// 		settings: user.settings,

// 		friends: friends,
// 		reminders: reminders,
// 	})
// 		.then(() => {
// 			return returnMessage;
// 		})
// 		.catch((error) => {
// 			returnMessage.error = true;
// 			returnMessage.message = error;
// 			return returnMessage;
// 		});
// }
