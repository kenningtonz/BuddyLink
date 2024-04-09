import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Friend, Frequency, Period } from "@/classes/friend";

import { Text, Layout } from "@/components/Themed";

import { useStore, saveToLocal } from "@/classes/userStore";
import { Stack, useRouter } from "expo-router";
import FriendForm from "@/components/form/FriendForm";

import { sharedStyles as baseStyles } from "@/components/styles";
import { Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useColorScheme from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { newReminder } from "@/classes/reminder";

interface FormData {
	name: string;
	method: number;
	frequency: Period;
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
		const friend = new Friend(
			data.name,
			new Date(data.lastContacted),
			data.frequency
		);
		addFriend(friend);

		//testing
		const today = new Date();
		const currentHour = today.getHours();
		const currentMinute = today.getMinutes();
		addReminder(
			newReminder(today, friend.id, friend.name, {
				hour: currentHour,
				minute: currentMinute + 1,
			})
		);

		saveToLocal();
		router.back();
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
					img: "",
					name: "",
				}}
			/>
		</Layout>
	);
};

export default NewFriend;
