import { Layout } from "@/components/Themed";
import * as Device from "expo-device";
import React, { useEffect, useRef, useState } from "react";
import useColorScheme from "@/components/useColorScheme";
import { Text, View, Button } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useStore } from "@/classes/userStore";

export default function Reminder() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const reminder = useStore((state) => state.reminders.find((r) => r.id === id));
	const setReminderSeen = useStore((state) => state.setReminderSeen);

	if (reminder) {
		setReminderSeen(reminder);
	} else {
		router.push("/(tabs)");
	}

	return (
		<Layout>
			<Text>{reminder?.message}</Text>
		</Layout>
	);
}
