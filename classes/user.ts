import { time } from "./time";

import { Friend } from "./friend";
import { Reminder } from "./reminder";
interface User {
	id: string;
	isLocal: boolean;
	email: string | null;
	name?: string;
	settings: UserSettings;
}

interface UserDataBase extends User {
	friends: Friend[];
	reminders: Reminder[];
}

//settings
type UserSettings = {
	theme?: string;
	pushNotifications: string;
	reminderTime: time;
};

// export const createUser = async (
// 	email: string,
// 	password: string
// ): Promise<User> => {
// 	await createUserWithEmailAndPassword(auth, email, password)
// 		.then((userCredential) => {
// 			const newUser: User = {
// 				id: userCredential.user.uid,
// 				isLocal: false,
// 				email: userCredential.user.email,
// 				settings: {
// 					reminderTime: { hour: 9, minute: 0 },
// 					pushNotifications: "true",
// 				},
// 			};
// 			await setDoc((doc, "users", newUser.id), newUser);
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});

// 	return newUser;
// };

export { User, UserSettings, UserDataBase };
