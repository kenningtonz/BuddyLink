import { create } from "zustand";
import { User, UserSettings } from "@/classes/user";
import { Reminder } from "@/classes/reminder";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import React from "react";

async function loadUser(
	session: Session,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
	try {
		setLoading(true);
		const { data, error, status } = await supabase
			.from("profiles")
			.select(`id, name, email, settings, friends, reminders`)
			.eq("id", session?.user.id)
			.single();
		if (error && status !== 406) {
			throw error;
		}

		if (data) {
			const user = {
				id: data.id,
				email: data.email,
				name: data.name,
				settings: data.settings,
				friends: data.friends,
				reminders: data.reminders,
			};
			return user;
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	} finally {
		setLoading(false);
	}
}

interface UserState {
	session: Session | null;
	reminders: Reminder[];
	user: User | null;
	settings: UserSettings;
	setUser: (user: User) => void;
	setSettings: (settings: UserSettings) => void;
	addReminder: (reminder: Reminder) => void;
	setReminderSeen: (reminder: Reminder) => void;
	setSession: (session: Session | null) => void;
}

const useUserStore = create<UserState>((set) => ({
	session: null,
	setSession: (session) => set({ session }),
	reminders: [],
	user: null,
	settings: {
		pushNotifications: false,
		reminderTime: { hour: 12, minute: 0 },
	},
	setUser: (user) => set({ user }),
	setSettings: (settings) => set({ settings }),
	addReminder: (reminder) =>
		set((state) => ({ reminders: [...state.reminders, reminder] })),

	setReminderSeen: (reminder) =>
		set((state) => ({
			reminders: state.reminders.map((r) => {
				if (r.id === reminder.id) {
					return { ...r, seen: true };
				}
				return r;
			}),
		})),
}));

export { useUserStore };
