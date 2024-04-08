import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

import { Reminder } from "@/classes/reminder";

export async function schedulePushNotification(
	title: string,
	body: string,
	seconds: number,
	id: string
) {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: title,
			body: body,
			data: { id },
		},
		trigger: { seconds: seconds },
	});
}

export async function registerForPushNotificationsAsync() {
	let token;

	//if platform is web return
	if (Platform.OS === "web") {
		return;
	}

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		// Learn more about projectId:
		// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: "d295ae1b-18c9-4782-827c-ea0677a48d27",
			})
		).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	return token;
}

export async function sendPushNotification(
	expoPushToken: string,
	reminder: Reminder
) {
	const message = {
		to: expoPushToken,
		sound: "default",
		title: reminder.title,
		body: reminder.message,
		data: { id: reminder.id },
	};
	console.log(message);

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}
