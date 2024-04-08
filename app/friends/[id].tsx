import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import React, { useState } from "react";
import { useStore, saveToLocal } from "@/classes/userStore";

import relativeDate from "@/utils/relativeDate";
import { SubmitHandler } from "react-hook-form";
import { View as Column, Image, Pressable } from "react-native";
import useColorScheme from "@/components/useColorScheme";
import { Text, Row, Layout } from "@/components/Themed";
import { Button, ButtonVariants } from "@/components/Button";
import { sharedStyles as baseStyles } from "@/components/styles";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import FriendForm from "@/components/form/FriendForm";
import { LinearGradient } from "expo-linear-gradient";

import Dialog from "@/components/Dialog";

interface FormData {
	name: string;
	method: number;
	freq1: number;
	freq2: string;
	img: string;
	lastContacted: Date;
}

const FriendPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const friendList = useStore((state) => state.friends);
	const editFriend = useStore((state) => state.editFriend);
	const removeFriend = useStore((state) => state.removeFriend);
	const [showDialog, setShowDialog] = useState(false);

	const [isEditing, setIsEditing] = useState(false);
	const friend = friendList.find((f) => f.id === id);

	const theme = useColorScheme();

	const gradientColors =
		theme === "light"
			? [Colors.light.primaryContainer, Colors.light.background]
			: [Colors.dark.primaryContainer, Colors.dark.background];

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
		friend.frequency = { unit: data.freq1, period: data.freq2 };
		friend.img = data.img;
		friend.lastContacted = data.lastContacted;

		editFriend(friend);
		setIsEditing(false);
		saveToLocal();
		console.log(data);
	};

	return (
		<Layout>
			<Stack.Screen
				options={{
					title: "",
					headerTitleStyle: { fontFamily: "Fredoka" },
					headerBackground: () => (
						<LinearGradient
							colors={gradientColors}
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								height: "100%",
							}}
						/>
					),

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
										// color={Colors.light.primaryText}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
											color:
												theme === "light"
													? Colors.light.onPrimaryContainer
													: Colors.dark.onPrimaryContainer,
										}}
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

							method: friend.method?.id,
							freq1: friend.frequency?.unit ?? 1,
							freq2: friend.frequency?.period ?? "day",
							lastContacted: friend.lastContacted ?? new Date(),
						}}
						onSubmit={onSubmit}
					/>

					<Button
						style={{ marginTop: 20 }}
						variant={ButtonVariants.Danger}
						onPress={() => setShowDialog(true)}
						text='Delete Friend'
					/>
				</>
			) : (
				<>
					<Row style={{ gap: 20, marginBottom: 20 }}>
						{friend.img ? (
							<Image
								source={{ uri: friend.img }}
								style={{ width: 100, height: 100, borderRadius: 50 }}
							/>
						) : (
							<Column
								style={{
									width: 100,
									height: 100,
									borderRadius: 50,
									backgroundColor: Colors.light.secondaryContainer,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<FontAwesome6 name='user' size={50} />
							</Column>
						)}

						<Text style={{ fontSize: 30 }}>{friend.name}</Text>
					</Row>
					<Text style={baseStyles.label}>Next Reminder:</Text>
					<Text>{friend.nextReminder?.toString()} - </Text>
					{friend.method ? (
						<Text style={baseStyles.label}>Preferred Contact Method:</Text>
					) : null}
					<Row>
						{friend.method ? (
							<>
								<Text>{friend.method.name}</Text>
								<FontAwesome6
									name={friend.method.icon}
									size={25}
									// color={Colors.light.primaryText}
								/>
							</>
						) : null}
					</Row>

					<Text style={baseStyles.label}>Last Contacted:</Text>
					<Text style={{ fontSize: 16 }}>
						{friend.lastContacted.toLocaleDateString("en-CA", {
							month: "long",
							year: "numeric",
							day: "numeric",
						})}
					</Text>
					{/* <Text>frequency: {friend.frequency}</Text> */}
				</>
			)}
		</Layout>
	);
};

export default FriendPage;
