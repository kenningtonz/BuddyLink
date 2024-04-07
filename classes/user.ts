import { Friend } from "./friend";
import { Reminder } from "./reminder";
import { time } from "./time";

import { auth } from "@/utils/firebaseConfig";

interface User {
	id: string;
	isLocal: boolean;
	email?: string;
	name?: string;
	settings: UserSettings;
}

//settings
type UserSettings = {
	// theme: string;
	pushNotifications: boolean;
	reminderTime: time;
};

export { User, UserSettings };
