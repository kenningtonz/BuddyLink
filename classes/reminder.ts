import { ContactMethod, Friend } from "./friend";
import { time } from "./time";

interface Reminder {
	id: number;
	friendID: string;
	message: string;
	// contactMethod: ContactMethod;
	date: Date;
	hasSeen: boolean;
}

const newReminder = (
	friendID: string,
	friendName: string,
	date: Date,
	reminderTime: time
) => {
	return {
		id: Math.floor(Math.random() * 1000),
		friendID: friendID,
		message: `Contact ${friendName} today!`,
		date: new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			reminderTime.hour,
			reminderTime.minute
		),
		hasSeen: false,
	};
};

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

const nextReminderDate = (friend: Friend) => {
	// const lastContacted = friend.lastContacted;
	// const frequency = friend.frequency;
	// const unit = frequency.unit;
	// const period = frequency.period;
	// let nextReminder = new Date();
	// if(period === 'days'){
	//     nextReminder.setDate(lastContacted.getDate() + unit);
	// } else if(period === 'weeks'){
	//     nextReminder.setDate(lastContacted.getDate() + (unit * 7));
	// } else if(period === 'months'){
	//     nextReminder.setMonth(lastContacted.getMonth() + unit);
	// } else if(period === 'years'){
	//     nextReminder.setFullYear(lastContacted.getFullYear() + unit);
	// }
	// return nextReminder;
};
