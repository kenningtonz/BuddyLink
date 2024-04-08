import { Layout, Row } from "@/components/Themed";
import * as Device from "expo-device";
import React, { useEffect, useRef, useState } from "react";
import useColorScheme from "@/components/useColorScheme";
import { View } from "react-native";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import { useStore } from "@/classes/userStore";
import { Text } from "@/components/Themed";
import { Button, ButtonVariants } from "@/components/Button";

import { darkTheme, lightTheme } from "@/components/styles";
import Colors from "@/constants/Colors";

export default function Reminder() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const reminder = useStore((state) => state.reminders.find((r) => r.id === id));
	const friend = useStore((state) =>
		state.friends.find((f) => f.id === reminder?.friendID)
	);
	const editFriend = useStore((state) => state.editFriend);
	if (!reminder) {
		router.replace("/(tabs)");
		return null;
	}

	const theme = useColorScheme();

	const onSubmit = (didContact: boolean) => {
		if (friend) {
			if (didContact) {
				friend.lastContacted = new Date();
				editFriend(friend);
				console.log("Contacted");
			}
			router.back();
		}
	};

	return (
		<Layout style={{ justifyContent: "center" }}>
			<Stack.Screen
				options={{
					title: "",
				}}
			/>

			<View
				style={{
					position: "relative",
					borderRadius: 8,
					marginVertical: 10,
					padding: 15,
					elevation: 2,
					marginBottom: 40,
					justifyContent: "center",
					minHeight: 200,
					backgroundColor:
						theme === "light"
							? Colors.light.tertiaryContainer
							: Colors.dark.tertiaryContainer,
				}}
			>
				<Text
					style={{
						fontSize: 26,
						fontFamily: "Fredoka-SemiBold",
						marginBottom: 20,
						textAlign: "center",
						color:
							theme === "light"
								? Colors.light.onTertiaryContainer
								: Colors.dark.onTertiaryContainer,
					}}
				>
					{reminder.title}
				</Text>
				<Text
					style={{
						fontSize: 20,
						textAlign: "center",
						color:
							theme === "light"
								? Colors.light.onTertiaryContainer
								: Colors.dark.onTertiaryContainer,
					}}
				>
					{reminder.message}
				</Text>
			</View>
			<Text
				style={{
					fontSize: 16,
					textAlign: "center",
				}}
			>
				Did you contact them?
			</Text>

			<Row
				style={{
					justifyContent: "space-around",
					marginTop: 20,
				}}
			>
				<Button
					text='No'
					variant={ButtonVariants.Danger}
					onPress={() => onSubmit(false)}
				/>
				<Button
					text='Yes'
					variant={ButtonVariants.Primary}
					onPress={() => onSubmit(true)}
				/>
			</Row>
		</Layout>
	);
}
