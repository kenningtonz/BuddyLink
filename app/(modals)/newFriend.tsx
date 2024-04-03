import {
	StyleSheet,
	View,
	SafeAreaView,
	Button,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import {
	FormProvider,
	useForm,
	SubmitHandler,
	SubmitErrorHandler,
} from "react-hook-form";
import { Friend, FriendType, ContactMethod } from "@/components/classes/friend";
import Colors from "@/constants/Colors";

import { formStyles, TextInput, Dropdown, DatePicker } from "@/components/form";
import { Text } from "@/components/Themed";
import { useFriendStore } from "@/components/classes/friendStore";
import { useRouter } from "expo-router";

interface FormData {
	name: string;
	type: FriendType;
	method: ContactMethod;
	// frequency: number;
	lastContacted: Date;
}

const NewFriend = () => {
	const addFriend = useFriendStore((state) => state.addFriend);
	const router = useRouter();

	const { ...methods } = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const friend = new Friend(data.name, data.type, new Date(), "", data.method);
		addFriend(friend);
		router.back();
		console.log(data);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Add New Friend</Text>
				<FormProvider {...methods}>
					<TextInput
						defaultValue={""}
						name='name'
						label='Name'
						error={methods.formState.errors.name}
						rules={{ required: "Name is required" }}
					/>
					<Dropdown
						name='type'
						label='Friend Type'
						error={methods.formState.errors.type}
						rules={{ required: "Friend Type is required" }}
						data={[
							{ label: "Friend", value: FriendType.Friend },
							{ label: "Acquaintance", value: FriendType.Acquaintance },
							{ label: "Family", value: FriendType.Family },
							{ label: "Work", value: FriendType.Work },
							{ label: "Other", value: FriendType.Other },
						]}
					/>
					<Dropdown
						name='method'
						label='Contact Method'
						error={methods.formState.errors.method}
						rules={{ required: "Contact Method is required" }}
						data={[
							{ label: "Phone", value: ContactMethod.Phone },
							{ label: "Email", value: ContactMethod.Email },
							{ label: "Text", value: ContactMethod.Text },
						]}
					/>
					<DatePicker
						name='lastContacted'
						label='Last Contacted'
						error={methods.formState.errors.lastContacted}
						rules={{ required: "Last Contacted is required" }}
					/>
				</FormProvider>
				<Pressable
					onPress={methods.handleSubmit(onSubmit)}
					style={formStyles.button}
				>
					<Text>Submit</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default NewFriend;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		fontFamily: "Fredoka",
	},
	errorText: {
		color: "red",
	},
	container: {
		flex: 1,
		backgroundColor: Colors.light.primaryLight,
		padding: 20,
		// gap: 20,
		// alignItems: "center",
		// justifyContent: "center",
	},
	label: {
		fontSize: 15,
		fontFamily: "Fredoka",
		fontWeight: "bold",
	},
	input: {
		borderWidth: 1,
		backgroundColor: "white",
		borderColor: "black",
		padding: 8,
		borderRadius: 8,
		height: 30,
		marginBottom: 10,
		fontFamily: "Fredoka",
	},
});
