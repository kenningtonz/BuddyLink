// import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useFriendStore } from "@/components/classes/friendStore";

import { Stack } from "expo-router";

import { Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { View } from "@/components/Themed";
import { Button } from "@/components/Button";

const Friend = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const friendList = useFriendStore((state) => state.friends);

	const friend = friendList.find((f) => f.id === parseInt(id));

	if (!friend) {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					<Text style={styles.title}>Friend Not Found</Text>
				</View>
			</SafeAreaView>
		);
	}
	return (
		<SafeAreaView style={{ height: "100%" }}>
			<Stack.Screen
				options={{
					title: friend.name,
					headerTitleStyle: { fontFamily: "Fredoka" },
				}}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>Friend</Text>
				<Text>id: {id}</Text>
				<Text>name: {friend.name}</Text>
				<Text>type: {friend.type}</Text>
				<Text>method: {friend.method?.name}</Text>
				{/* <Text>frequency: {friend.frequency}</Text> */}
				<Text>
					lastContacted:{" "}
					{friend.lastContacted?.toLocaleDateString("en-CA", {
						month: "long",
						year: "numeric",
						day: "numeric",
					})}
				</Text>
				<Button onPress={() => console.log("Edit")} text='edit' />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

// const EditFriend = ({ id }) => {
// 	const {
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();
// 	const [submittedData, setSubmittedData] = useState(null);

// 	const onSubmit = (data) => {
// 		// Simulate form submission
// 		console.log("Submitted Data:", data);
// 		setSubmittedData(data);
// 	};
// 	return (
// 		<SafeAreaView>
// 			<View>
// 				<Text>Edit Friend</Text>
// 				<Controller
// 					control={control}
// 					render={({ field }) => <TextInput {...field} placeholder='Name' />}
// 					name='name'
// 					rules={{ required: "You must enter a name" }}
// 				/>
// 				{errors.name && <Text>{errors.name.message}</Text>}
// 			</View>
// 		</SafeAreaView>
// 	);
// };

export default Friend;
