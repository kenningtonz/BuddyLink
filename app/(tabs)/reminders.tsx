import { Layout, Text } from "@/components/Themed";

import { View, FlatList } from "react-native";
import { sharedStyles as baseStyles } from "@/components/styles";
import React from "react";
import { Reminder } from "@/classes/reminder";
import { useStore } from "@/classes/userStore";
import { Link } from "expo-router";

const Reminders = () => {
	const reminders = useStore((state) => state.reminders);
	return (
		<Layout>
			<Link href={"/reminder/1"}>
				<Text>test</Text>{" "}
			</Link>
			<FlatList
				style={baseStyles.list}
				data={reminders}
				keyExtractor={(item) => item.date.toString()}
				renderItem={({ item }) => <ReminderItem reminder={item} />}
			/>
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
