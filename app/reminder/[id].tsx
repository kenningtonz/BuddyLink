import { Layout } from "@/components/Themed";
import * as Device from "expo-device";
import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import {
	registerForPushNotificationsAsync,
	schedulePushNotification,
} from "@/utils/notifications";
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});
import { Subscription } from "expo-notifications";

import { Text, View, Button } from "react-native";

export default function Reminder() {
	const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
	const [notification, setNotification] = useState<Notifications.Notification>();
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification: any) => {
				setNotification(notification);
			}
		);

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response: any) => {
				console.log(response);
			});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);
	return (
		<Layout>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>
					Data: {notification && JSON.stringify(notification.request.content.data)}
				</Text>
			</View>
			<Button
				title='Press to schedule a notification'
				onPress={async () => {
					await schedulePushNotification();
				}}
			/>
		</Layout>
	);
}
