import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import React, { useState } from "react";
import { useFriendStore } from "@/classes/friendStore";
import relativeDate from "@/utils/relativeDate";
import { SubmitHandler } from "react-hook-form";
import { View as Column, Image, Pressable } from "react-native";
import { Text, Row, Layout } from "@/components/Themed";
import { Button, ButtonVariants } from "@/components/Button";
import baseStyles from "@/components/styles";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import FriendForm from "@/components/form/FriendForm";

import { formStyles } from "@/components/form";

import Dialog from "@/components/Dialog";

import { FriendType, contactMethods } from "@/classes/friend";

interface FormData {
	name: string;
	type: FriendType;
	method: number;
	freq1: number;
	freq2: string;
	img: string;
	lastContacted: Date;
}

const Friend = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const friendList = useFriendStore((state) => state.friends);
	const editFriend = useFriendStore((state) => state.editFriend);
	const removeFriend = useFriendStore((state) => state.removeFriend);
	const [showDialog, setShowDialog] = useState(false);

	const [isEditing, setIsEditing] = useState(false);
	const friend = friendList.find((f) => f.id === id);

	const router = useRouter();

	if (!friend) {
		return (
			<Layout>
				<Text style={baseStyles.title}>Friend Not Found</Text>
			</Layout>
		);
	}

	const onSubmit: SubmitHandler<FormData> = (data) => {
		friend.name = data.name;
		friend.type = data.type;
		friend.method = contactMethods[data.method];
		friend.frequency = { unit: data.freq1, period: data.freq2 };
		friend.img = data.img;
		friend.lastContacted = data.lastContacted;

		editFriend(friend);
		setIsEditing(false);
		console.log(data);
	};

	return (
		<Layout>
			<Stack.Screen
				options={{
					title: friend.name,
					headerTitleStyle: { fontFamily: "Fredoka" },
					headerRight: () => {
						if (isEditing) return null;
						return (
							<Pressable
								onPress={() => {
									setIsEditing(true);
								}}
							>
								{({ pressed }) => (
									<FontAwesome
										name='edit'
										size={25}
										color={Colors.light.primaryText}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						);
					},
				}}
			/>

			<Dialog open={showDialog} setOpen={setShowDialog}>
				<Text>Are you sure you want to delete {friend.name}?</Text>
				<Row>
					<Button onPress={() => setShowDialog(false)} text='Cancel' />
					<Button
						onPress={() => {
							removeFriend(friend.id);
							router.push("/");
							setShowDialog(false);
						}}
						text='Delete'
					/>
				</Row>
			</Dialog>

			{isEditing ? (
				<>
					<FriendForm
						buttonText='Save'
						defaultValues={{
							img: friend.img ?? "/assets/images/placeholder.png",
							name: friend.name,
							type: friend.type,
							method: friend.method?.id,
							freq1: friend.frequency?.unit ?? 1,
							freq2: friend.frequency?.period ?? "day",
							lastContacted: friend.lastContacted ?? new Date(),
						}}
						onSubmit={onSubmit}
					/>

					<Button
						variant={ButtonVariants.Danger}
						onPress={() => setShowDialog(true)}
						text='Delete Friend'
					/>
				</>
			) : (
				<>
					<Text style={baseStyles.title}>Friend</Text>
					{/* <Text>id: {id}</Text> */}
					<Row style={{ gap: 20 }}>
						<Image
							source={{ uri: friend.img }}
							style={{ width: 100, height: 100, borderRadius: 50 }}
						/>
						<Text style={baseStyles.title}>{friend.name}</Text>
					</Row>
					<Text>Type: {friend.type}</Text>
					<Row>
						<Text style={formStyles.label}>Preferred Contact Method:</Text>
						<Text>{friend.method?.name}</Text>
						<FontAwesome
							name={friend.method?.icon}
							size={25}
							color={Colors.light.primaryText}
						/>
					</Row>

					{/* <Text>frequency: {friend.frequency}</Text> */}
					<Text>
						Last Contact:{" "}
						{/* {friend.lastContacted?.toLocaleDateString("en-CA", {
								month: "long",
								year: "numeric",
								day: "numeric",
							})} */}
						{relativeDate(friend.lastContacted)}
					</Text>
				</>
			)}
		</Layout>
	);
};

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
