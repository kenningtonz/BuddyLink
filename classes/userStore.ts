import { create } from "zustand";
import { User, UserSettings } from "@/classes/user";
import { Reminder, checkReminders } from "@/classes/reminder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Friend } from "./friend";
import { addDateTime } from "./time";

interface UserState {
	user: User;
	setUser: (user: User) => void;
}

interface ReminderState {
	remindersFuture: Reminder[];
	reminders: Reminder[];
	addReminder: (reminder: Reminder) => void;
	moveReminder: (id: string) => void;
	setReminderSeen: (reminder: Reminder) => void;
	changeReminderTime: (newTime: { hour: number; minute: number }) => void;
}

interface FriendState {
	friends: Friend[];
	addFriend: (friend: Friend) => void;
	removeFriend: (id: string) => void;
	editFriend: (friend: Friend) => void;
}

const useStore = create<UserState & FriendState & ReminderState>((set) => ({
	user: {
		id: "",
		isLocal: true,
		email: null,
		settings: {
			theme: "light",
			pushNotifications: "true",
			reminderTime: { hour: 9, minute: 0 },
		},
	},

	setUser: (user) => set({ user }),

	friends: [],
	addFriend: (friend) => {
		set((state) => ({ friends: [...state.friends, friend] }));
	},
	removeFriend: (id: string) =>
		set((state) => ({
			friends: state.friends.filter((friend) => friend.id !== id),
		})),
	editFriend: (friend: Friend) =>
		set((state) => ({
			friends: state.friends.map((f) => {
				if (f.id === friend.id) {
					return friend;
				}
				return f;
			}),
		})),

	reminders: [],
	remindersFuture: [],

	changeReminderTime: (newTime) =>
		set((state) => {
			const futureReminders = state.remindersFuture;
			for (const reminder of futureReminders) {
				reminder.date = addDateTime(reminder.date, newTime);
			}
			return { remindersFuture: futureReminders };
		}),

	//move reminder from furture to reminders
	moveReminder: (id) =>
		set((state) => {
			const reminder = state.remindersFuture.find((r) => r.id === id);
			if (reminder) {
				console.log("moved reminder");
				return {
					reminders: [...state.reminders, reminder],
					remindersFuture: state.remindersFuture.filter((r) => r.id !== id),
				};
			}
			return state;
		}),

	addReminder: (reminder) =>
		set((state) => ({ remindersFuture: [...state.remindersFuture, reminder] })),
	setReminderSeen: (reminder) =>
		set((state) => ({
			reminders: state.reminders.map((r) => {
				if (r.id === reminder.id) {
					return { ...r, hasSeen: true };
				}
				return r;
			}),
		})),
}));

export function clearLocal() {
	AsyncStorage.removeItem("reminders");
	AsyncStorage.removeItem("remindersFuture");
	AsyncStorage.removeItem("user");
	AsyncStorage.removeItem("friends");
}

export function clearStore() {
	useStore.setState({
		user: {
			id: "",
			isLocal: true,
			email: null,
			settings: {
				theme: "light",
				pushNotifications: "true",
				reminderTime: { hour: 9, minute: 0 },
			},
		},
		friends: [],
		reminders: [],
		remindersFuture: [],
	});
}

export function saveToLocal() {
	const reminders = useStore.getState().reminders;
	const remindersFuture = useStore.getState().remindersFuture;
	const user = useStore.getState().user;
	const friends = useStore.getState().friends;
	if (reminders.length > 0) {
		AsyncStorage.setItem("reminders", JSON.stringify(reminders));
	}
	if (remindersFuture.length > 0) {
		AsyncStorage.setItem("remindersFuture", JSON.stringify(remindersFuture));
	}
	if (user) {
		AsyncStorage.setItem("user", JSON.stringify(user));
	}
	if (friends.length > 0) {
		AsyncStorage.setItem("friends", JSON.stringify(friends));
	}
}

export async function loadFromLocal() {
	const friendsData = await AsyncStorage.getItem("friends");
	if (friendsData) {
		const friends = JSON.parse(friendsData);
		for (const friend of friends) {
			friend.lastContacted = new Date(friend.lastContacted);
			friend.newReminderDate = new Date(friend.newReminderDate);
		}
		useStore.setState({ friends });
		// console.log(friends, "friends");
	}

	const remindersData = await AsyncStorage.getItem("reminders");
	if (remindersData) {
		const reminders = JSON.parse(remindersData);
		for (const reminder of reminders) {
			reminder.date = new Date(reminder.date);
		}
		useStore.setState({ reminders });
		// console.log(reminders, "reminders");
	}

	const remindersFutureData = await AsyncStorage.getItem("remindersFuture");
	if (remindersFutureData) {
		const remindersFuture = JSON.parse(remindersFutureData);
		for (const reminder of remindersFuture) {
			reminder.date = new Date(reminder.date);
		}
		useStore.setState({ remindersFuture });
		// console.log(remindersFuture, "remindersFuture");
	}

	const userData = await AsyncStorage.getItem("user");

	if (userData) {
		const user = JSON.parse(userData);
		useStore.setState({ user });

		return true;
	}

	return false;
}

export { useStore };
