import { create } from "zustand";
import { User, UserSettings } from "@/classes/user";
import { Reminder } from "@/classes/reminder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Friend } from "./friend";

interface UserState {
	user: User;
	setUser: (user: User) => void;
}

interface ReminderState {
	reminders: Reminder[];
	addReminder: (reminder: Reminder) => void;
	setReminderSeen: (reminder: Reminder) => void;
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
	addReminder: (reminder) =>
		set((state) => ({ reminders: [...state.reminders, reminder] })),
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
	AsyncStorage.removeItem("user");
	AsyncStorage.removeItem("friends");
}

export function clearStore() {
	useStore.setState({ user: {} as User, friends: [], reminders: [] });
}

export function saveToLocal() {
	const reminders = useStore.getState().reminders;
	const user = useStore.getState().user;
	const friends = useStore.getState().friends;
	if (reminders.length > 0) {
		AsyncStorage.setItem("reminders", JSON.stringify(reminders));
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
	console.log(friendsData, "friends");
	if (friendsData) {
		const friends = JSON.parse(friendsData);
		for (const friend of friends) {
			friend.lastContacted = new Date(friend.lastContacted);
		}
		useStore.setState({ friends });
	}

	const reminders = await AsyncStorage.getItem("reminders");
	if (reminders) {
		useStore.setState({ reminders: JSON.parse(reminders) });
	}

	const user = await AsyncStorage.getItem("user");
	console.log(user, "user");
	if (user) {
		useStore.setState({ user: JSON.parse(user) });

		return true;
	}

	return false;
}

export { useStore };
