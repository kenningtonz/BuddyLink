import { Layout, Text } from "@/components/Themed";

import { View, FlatList } from "react-native";
import baseStyles from "@/components/styles";
import React from "react";
import { Reminder } from "@/classes/reminder";
import { useUserStore } from "@/classes/userStore";

const Reminders = () => {
	const reminders = useUserStore((state) => state.reminders);
	return (
		<Layout>
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
