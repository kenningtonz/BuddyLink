import { schedulePushNotification } from "@/utils/notifications";
import { Friend } from "./friend";
import { time } from "./time";
import { generateID } from "@/utils/generateID";

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
	lastContacted: Date,
	id: string,
	name: string,
	frequency: { unit: number; period: string },
	reminderTime: time
) => {
	const date = nextReminderDate(lastContacted, frequency);
	const timeSinceLastContacted = new Date().getTime() - lastContacted.getTime();
	const reminder: Reminder = {
		id: generateID(10),
		friendID: id,
		message: `It'ss been ${new Date(
			timeSinceLastContacted
		).toLocaleString()} since you last contacted ${name}!`,
		title: `Contact ${name}`,
		date: new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			reminderTime.hour,
			reminderTime.minute
		),
		hasSeen: false,
	};
	const secondsTill = new Date().getTime() - reminder.date.getTime();
	// schedulePushNotification(
	// 	reminder.title,
	// 	reminder.message,
	// 	reminder.date.getTime(),
	// 	reminder.id
	// );
	return reminder;
};

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
	return date;
}

// enum ReminderMethod {
// 	auto,
// 	prompted,
// 	manual,
// }

export { Reminder, newReminder };

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
