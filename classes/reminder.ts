import {
	schedulePushNotification,
	sendPushNotification,
} from "@/utils/notifications";
import { Friend } from "./friend";
import { addDateTime, time } from "./time";
import { generateID } from "@/utils/generateID";
import { saveToLocal, useStore } from "./userStore";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Reminder {
	id: string;
	friendID: string;
	message: string;
	title: string;
	// contactMethod: ContactMethod;
	date: Date;
	hasSeen: boolean;
}

const newReminder = (
	reminderDate: Date,
	id: string,
	name: string,
	// frequency: { unit: number; period: string },
	reminderTime: time
) => {
	const date = addDateTime(reminderDate, reminderTime);
	// const timeSinceLastContacted = new Date().getTime() - lastContacted.getTime();
	const reminder: Reminder = {
		id: generateID(10),
		friendID: id,
		message: `It's been a bit since you last contacted ${name}!`,
		title: `Contact ${name}`,
		date: date,
		hasSeen: false,
	};
	const secondsTill = new Date().getTime() - reminder.date.getTime();
	return reminder;
};

const checkReminders = (
	futureReminders: Reminder[],
	reminderTime: time,
	addReminder: (reminder: Reminder) => void,
	moveReminder: (id: string) => void,
	token: string,
	friends: Friend[],
	editFriend: (friend: Friend) => void
) => {
	const now = new Date();

	for (const reminder of futureReminders) {
		if (reminder.date < now) {
			// sendReminder(reminder);
			if (Platform.OS != "web") {
				sendPushNotification(token, reminder);
				console.log("sent push notification");
			}
			moveReminder(reminder.id);
			const friend = friends.find((f) => f.id === reminder.friendID);

			if (friend) {
				friend.lastContacted = new Date();
				friend.nextReminderDate = nextReminderDate(
					friend.lastContacted,
					friend.frequency
				);
				editFriend(friend);
				addReminder(
					newReminder(friend.nextReminderDate, friend.id, friend.name, reminderTime)
				);
			}
		}
	}
	console.log("checked reminders");
};

//reminders  are added to futre,
//when open app for web, or background for android, check and move to past and send off

function nextReminderDate(
	lastContacted: Date,
	frequency: { unit: number; period: string }
) {
	const unit = frequency.unit;
	const period = frequency.period;
	const date = new Date(lastContacted);

	switch (period) {
		case "day":
			date.setDate(date.getDate() + unit);
			break;
		case "week":
			date.setDate(date.getDate() + unit * 7);
			break;
		case "month":
			date.setMonth(date.getMonth() + unit);
			break;
		case "year":
			date.setFullYear(date.getFullYear() + unit);
			break;
	}

	if (date < new Date()) {
		date.setDate(date.getDate() + 1);
	}
	return date;
}

// enum ReminderMethod {
// 	auto,
// 	prompted,
// 	manual,
// }

export { Reminder, newReminder, nextReminderDate, checkReminders };

//type of reminders
//send message for them? - connect to contactMethods - update last contacted
//send yourself - have button to send message - eg open app - connect to contactMethods , come back to app to confirm if message was sent
//contact yourself - have button to contact yourself , ask if you cantacted, update last contacted

//new reminders

//archived reminders

//friend contact method - frequency - last contacted
function sendReminder(friend: Friend) {
	//send reminder
}
