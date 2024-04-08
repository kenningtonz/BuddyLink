import React from "react";
import { Row, Text } from "@/components/Themed";
import { Button, ButtonVariants } from "../Button";
import { time, timeToString } from "@/classes/time";
import { sharedStyles as styles } from "../styles";
import { View } from "react-native";

const Page6: React.FC<{
	friend: {
		name: string;
		lastContacted: Date;
		freq: { unit: number; period: string };
	};
	userSettings: { reminderTime: time };
	next: () => void;
	back: () => void;
}> = ({ friend, userSettings, next, back }) => {
	return (
		<View>
			<Text style={[styles.bigTitle, { marginBottom: 30 }]}>Friend Review</Text>

			<View style={{ marginBottom: 30 }}>
				<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>Name:</Text>
				<Text style={{ fontSize: 20 }}>{friend.name}</Text>
			</View>
			{/* <Text>Last Contacted: {friend.lastContacted.toLocaleString()}</Text> */}
			<View style={{ marginBottom: 30 }}>
				<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>
					Last Contacted:
				</Text>
				<Text style={{ fontSize: 20 }}>
					{friend.lastContacted.toLocaleString("en-CA", {
						month: "long",
						year: "numeric",
						day: "numeric",
					})}
				</Text>
			</View>
			<View style={{ marginBottom: 30 }}>
				<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>
					Frequency of Reminders:
				</Text>
				<Text style={{ fontSize: 20 }}>
					{friend.freq.unit == 1
						? "Once"
						: friend.freq.unit == 2
						? "Twice"
						: "Thrice"}{" "}
					a {friend.freq.period}
				</Text>
			</View>

			<View style={{ marginBottom: 30 }}>
				<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>
					Reminder Time
				</Text>
				<Text style={{ fontSize: 20, marginBottom: 10 }}>
					{timeToString(userSettings.reminderTime)}
				</Text>
			</View>

			<Row style={{ gap: 8 }}>
				<Button
					style={{ flex: 1 }}
					variant={ButtonVariants.Ghost}
					icon='chevron-left'
					onPress={back}
				/>
				<Button
					style={{ flex: 5 }}
					text='Looks Good!'
					variant={ButtonVariants.Primary}
					onPress={next}
				/>
			</Row>
		</View>
	);
};

export default Page6;
