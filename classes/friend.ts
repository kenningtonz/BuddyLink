import AsyncStorage from "@react-native-async-storage/async-storage";

enum FriendType {
	Acquaintance = "Acquaintance",
	Friend = "Friend",
	BestFriend = "Best Friend",
	Family = "Family",
	Work = "Work",
	Other = "Other",
}

// type FriendType = {

// }

// type Friend ={
// 	name: string;
// 	nickname?: string;

// }
import { FontAwesome } from "@expo/vector-icons";
import { Reminder, nextReminderDate } from "./reminder";
import { generateID } from "@/utils/generateID";
import { addDateTime } from "./time";

interface ContactMethod {
	name: string;
	id: number;
	icon: keyof typeof FontAwesome.glyphMap;
	// icon: string;
}

const contactMethods: ContactMethod[] = [
	{ name: "Phone", icon: "phone", id: 0 },
	{ name: "Text", icon: "comment", id: 1 },
	{ name: "Email", icon: "envelope", id: 2 },
	// { name: "Discord", icon: "discord" },
	{ name: "WhatsApp", icon: "whatsapp", id: 3 },
	{ name: "Instagram", icon: "instagram", id: 4 },
	{ name: "Facebook", icon: "facebook", id: 5 },
	{ name: "Other", icon: "ellipsis-h", id: 6 },
];

// enum ContactMethod {
// 	Phone,
// 	Text,
// 	Email,
// 	Discord,
// 	WhatsApp,
// 	Instagram,
// 	Facebook,
// 	Other,
// }

enum ReminderType {
	email,
	app,
	text,
	push,
}

interface Frequency {
	unit: number;
	period: string;
}

export enum Period {
	daily = "Daily",
	twoDay = "Every 2 Days",
	threeDay = "Every 3 Days",
	weekly = "Weekly (7 days)",
	biWeekly = "Bi-Weekly (2 weeks)",
	monthly = "Monthly (4 weeks)",
	biMonthly = "Bi-Monthly (8 weeks)",
	quarterly = "Quarterly (13 weeks)",
	yearly = "Yearly (52 weeks)",
}

// interface ContactInfo {
// 	email: string;
// 	phone: string;
// }

//friend gets created
//next reminder is created
//when reminder is sent, next reminder is created

interface Friend {
	id: string;
	name: string;
	lastContacted: Date;
	frequency: Period;

	// reminderTime?: { hour: number; minute: number };
	nextReminderDate: Date;
	method?: ContactMethod;
	birthday?: Date;
	img?: string;
	type?: FriendType;
	notes?: string;
	nickname?: string;
}

class Friend {
	notes?: string;
	nickname?: string;
	img?: string;
	birthday?: Date;

	constructor(name: string, lastContacted: Date, frequency: Period) {
		this.name = name;
		this.frequency = frequency;
		this.lastContacted = lastContacted;
		this.id = generateID();
		this.nextReminderDate = nextReminderDate(this.lastContacted, this.frequency);
	}

	// setReminderTime(hour: number, minute: number) {
	// 	this.reminderTime = { hour, minute };
	// }

	// setNextReminder() {
	// 	this.nextReminderDate = addDateTime(

	// 		this.reminderTime ?? { hour: 9, minute: 0 }
	// 	);

	// this.nextReminder = newReminder(
	// 	this.lastContacted,
	// 	this.id,
	// 	this.name,
	// 	this.frequency,
	// 	this.reminderTime ?? { hour: 9, minute: 0 }
	// );
	// }
}

// class Friend {
// 	name: string;
// 	notes?: string;
// 	nickname?: string;
// 	id: number;
// 	img?: string;
// 	type: FriendType;
// 	method: ContactMethod;
// 	frequency?: Frequency;
// 	lastContacted?: Date;
// 	birthday?: Date;
// 	constructor(
// 		name: string,
// 		type: FriendType,
// 		lastContacted: Date,
// 		method: ContactMethod,
// 		img?: string,
// 		frequency?: Frequency,
// 		nickname?: string
// 	) {
// 		this.name = name;
// 		this.nickname = nickname;
// 		this.id = Math.floor(Math.random() * 1000);
// 		this.img = img;
// 		this.type = type;
// 		this.method = method;
// 		this.frequency = frequency;
// 		this.lastContacted = lastContacted;
// 	}

// }

// // https://react-native-async-storage.github.io/async-storage/docs/usage
// class FriendList {
// 	friends: Friend[];
// 	constructor() {
// 		this.friends = [];
// 	}
// 	add(friend: Friend) {
// 		this.friends.push(friend);
// 	}
// 	remove(friend: Friend) {
// 		this.friends = this.friends.filter((f) => f.id !== friend.id);
// 	}
// 	async save() {
// 		try {
// 			const jsonValue = JSON.stringify(this.friends);
// 			await AsyncStorage.setItem("friends", jsonValue);
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	}
// }

export { Friend, Frequency };
