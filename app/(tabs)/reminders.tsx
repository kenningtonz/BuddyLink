import { Layout, Text } from "@/components/Themed";

import { View, FlatList, Pressable } from "react-native";
import {
	sharedStyles as baseStyles,
	darkTheme,
	lightTheme,
} from "@/components/styles";
import React from "react";
import { Reminder, newReminder } from "@/classes/reminder";
import { useStore } from "@/classes/userStore";
import { Link, useRouter } from "expo-router";
import { addDateTime } from "@/classes/time";
import useColorScheme from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Button, ButtonVariants } from "@/components/Button";
import {
	sendPushNotification,
	schedulePushNotification,
} from "@/utils/notifications";

const Reminders = () => {
	const reminders = useStore((state) => state.reminders);
	const remindersFuture = useStore((state) => state.remindersFuture);
	const user = useStore((state) => state.user);
	const currentDateTime = addDateTime(new Date(), user.settings.reminderTime);
	const setReminderSeen = useStore((state) => state.setReminderSeen);

	const router = useRouter();
	//within 2 days
	const upComingReminders = remindersFuture.filter((reminder) => {
		return (
			reminder.date < new Date(currentDateTime.getTime() + 2 * 24 * 60 * 60 * 1000)
		);
	});

	const goToReminder = (reminder: Reminder) => {
		router.push(`/reminder/${reminder.id}`);
		setReminderSeen(reminder);
	};

	const theme = useColorScheme();
	const themeStyles = theme === "dark" ? darkTheme : lightTheme;

	return (
		<Layout>
			{upComingReminders.length > 0 ? (
				<>
					<Text
						style={{
							fontSize: 16,
							textAlign: "center",
							color: theme == "light" ? Colors.light.primary : Colors.dark.primary,
						}}
					>
						Upcoming Reminders
					</Text>
					<FlatList
						style={[
							baseStyles.list,
							{
								flexGrow: 0,
							},
						]}
						inverted
						data={upComingReminders}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<>
								<View
									style={{
										borderRadius: 8,
										marginVertical: 10,
										padding: 15,
										elevation: 2,
										display: "flex",
										flexDirection: "column",
										backgroundColor:
											theme == "light"
												? Colors.light.primaryContainer
												: Colors.dark.primaryContainer,
									}}
								>
									<Text
										style={{
											fontSize: 16,
											fontFamily: "Fredoka-Medium",
											color:
												theme == "light"
													? Colors.light.onBackground
													: Colors.dark.onBackground,
										}}
									>
										{item.title}
									</Text>

									<Text>
										{item.date.toLocaleDateString("en-CA", {
											month: "long",
											year: "numeric",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
										})}
									</Text>
								</View>
							</>
						)}
					/>
				</>
			) : null}
			{reminders.length > 0 ? (
				<>
					<Text
						style={{
							fontSize: 16,
							marginTop: 20,
							textAlign: "center",
							color: theme == "light" ? Colors.light.tertiary : Colors.dark.tertiary,
						}}
					>
						Past Reminders
					</Text>
					<FlatList
						style={[
							baseStyles.list,
							{
								flexGrow: 0,
							},
						]}
						data={reminders}
						inverted
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Pressable
								onPress={() => {
									if (!item.hasSeen) {
										goToReminder(item);
									}
								}}
								style={[
									{
										position: "relative",
										borderRadius: 8,
										marginVertical: 10,
										padding: 15,
										elevation: 2,
										display: "flex",
										flexDirection: "column",
										width: "100%",
									},
									item.hasSeen
										? themeStyles.item
										: {
												// position: "relative",
												backgroundColor:
													theme == "light"
														? Colors.light.errorContainer
														: Colors.dark.errorContainer,
										  },
								]}
							>
								{item.hasSeen ? null : (
									<View
										style={{
											position: "absolute",
											top: -15,
											padding: 5,
											left: 10,
											borderRadius: 5,
											backgroundColor:
												theme == "light" ? Colors.light.error : Colors.dark.error,
											marginRight: 10,
										}}
									>
										<Text
											style={{
												color:
													theme == "light" ? Colors.light.onError : Colors.dark.onError,
											}}
										>
											New
										</Text>
									</View>
								)}
								<Text
									style={{
										fontSize: 16,
										fontFamily: "Fredoka-Medium",
										color:
											theme == "light"
												? Colors.light.onBackground
												: Colors.dark.onBackground,
									}}
								>
									{item.title}
								</Text>

								<Text>
									{item.date.toLocaleDateString("en-CA", {
										month: "long",
										year: "numeric",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
									})}
								</Text>
							</Pressable>
						)}
					/>
				</>
			) : (
				<Text>No reminders</Text>
			)}
		</Layout>
	);
};

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
	return (
		<View style={baseStyles.item}>
			<Text>{reminder.message}</Text>
			<Text>{reminder.date.toLocaleDateString()}</Text>
		</View>
	);
};

export default Reminders;
