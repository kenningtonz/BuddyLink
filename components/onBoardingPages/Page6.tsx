import React from "react";
import { Text } from "@/components/Themed";
import { Button, ButtonVariants } from "../Button";
import { time } from "@/classes/time";
import { sharedStyles as styles } from "../styles";
import useColorScheme from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const Page6: React.FC<{
	friend: {
		name: string;
		lastContacted: Date;
		freq: { unit: number; period: string };
	};
	userSettings: { reminderTime: time };
	next: () => void;
}> = ({ friend, userSettings, next }) => {
	const theme = useColorScheme();

	const gradientColors =
		theme === "light"
			? [Colors.light.primaryContainer, Colors.light.background]
			: [Colors.dark.primaryContainer, Colors.dark.background];

	return (
		<>
			<LinearGradient
				// Background Linear Gradient
				colors={gradientColors}
				style={{ position: "absolute", left: 0, right: 0, top: 0, height: "100%" }}
			/>
			<Text style={[styles.bigTitle]}>Review</Text>
			<Text>Name: {friend.name}</Text>
			<Text>Last Contacted: {friend.lastContacted.toLocaleString()}</Text>
			<Text>
				Frequency: {friend.freq.unit} {friend.freq.period}
			</Text>

			<Text>
				Reminder Time: {userSettings.reminderTime.hour} :{" "}
				{userSettings.reminderTime.minute}{" "}
			</Text>

			<Button text='Looks Good!' variant={ButtonVariants.Primary} onPress={next} />
		</>
	);
};

export default Page6;
