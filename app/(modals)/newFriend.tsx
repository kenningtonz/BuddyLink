import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Friend, Frequency } from "@/classes/friend";

import { Text, Layout } from "@/components/Themed";

import { useStore, saveToLocal } from "@/classes/userStore";
import { Stack, useRouter } from "expo-router";
import FriendForm from "@/components/form/FriendForm";

import { sharedStyles as baseStyles } from "@/components/styles";
import { Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useColorScheme from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

interface FormData {
	name: string;
	method: number;
	freq1: number;
	freq2: string;
	img: string;
	lastContacted: Date;
}

const NewFriend = () => {
	const addFriend = useStore((state) => state.addFriend);
	const router = useRouter();
	const friends = useStore((state) => state.friends);
	const user = useStore((state) => state.user);
	const addReminder = useStore((state) => state.addReminder);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const friend = new Friend(data.name, new Date(data.lastContacted), {
			unit: data.freq1,
			period: data.freq2,
		});
		// const friend = {
		// 	name: data.name,
		// 	method: contactMethods[data.method],
		// 	frequency: { unit: data.freq1, period: data.freq2 },
		// 	img: data.img,
		// 	lastContacted: new Date(data.lastContacted),
		// 	id: generateID(),

		// };
		if (user.id !== undefined) {
			friend.setReminderTime(
				user.settings.reminderTime.hour,
				user.settings.reminderTime.minute
			);
		}
		friend.setNextReminder();
		addReminder(friend.nextReminder!);
		addFriend(friend);
		console.log(friends);
		saveToLocal();
		router.back();
		console.log(data);
	};

	const colorScheme = useColorScheme();
	const theme = colorScheme === "light" ? "light" : "dark";

	return (
		<Layout>
			<Stack.Screen
				options={{
					title: "Add New Friend",
					headerTitleStyle: {
						fontSize: 20,
						fontFamily: "Fredoka-Medium",
					},
					headerStyle: {
						backgroundColor:
							colorScheme === "light"
								? Colors.light.background
								: Colors.dark.background,
					},
					headerTintColor:
						colorScheme === "light" ? Colors.light.secondary : Colors.dark.secondary,

					headerLeft: () => (
						<Pressable onPress={() => router.back()}>
							<FontAwesome6
								name='xmark'
								size={25}
								style={{
									marginLeft: 15,
									color:
										theme === "light"
											? Colors.light.onPrimaryContainer
											: Colors.dark.onPrimaryContainer,
								}}
							/>
						</Pressable>
					),
				}}
			/>

			<FriendForm
				onSubmit={onSubmit}
				buttonText='Add Friend'
				defaultValues={{
					img: "/assets/images/placeholder.png",
					name: "",
					freq1: 1,
					freq2: "day",
				}}
			/>
		</Layout>
	);
};

export default NewFriend;
