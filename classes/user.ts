import { Friend } from "./friend";
import { Reminder } from "./reminder";
import { time } from "./time";

interface User {
	id: string;
	email: string;
	name: string;
	settings: UserSettings;
	friends: Friend[];
	reminders: Reminder[];
}

//settings
type UserSettings = {
	// theme: string;
	pushNotifications: boolean;
	reminderTime: time;
};

export { User, UserSettings };
