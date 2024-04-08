import { Link, Stack, useRouter } from "expo-router";
import { useStore, saveToLocal } from "@/classes/userStore";
import { Layout, Row } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Platform, Pressable, Text } from "react-native";
import { Button, ButtonVariants } from "@/components/Button";
import { sharedStyles as styles } from "@/components/styles";
import {
	Page1,
	Page2,
	Page3,
	Page4,
	Page5,
	Page6,
} from "@/components/onBoardingPages";
import { time } from "@/classes/time";
import { generateID } from "@/utils/generateID";
import { Friend } from "@/classes/friend";

import { Image } from "expo-image";
import useColorScheme from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { newReminder } from "@/classes/reminder";

export default function OnBoarding() {
	const user = useStore((state) => state.user);

	const addReminder = useStore((state) => state.addReminder);
	const addFriend = useStore((state) => state.addFriend);
	const router = useRouter();

	const [onBoardPage, setOnBoardPage] = useState(0);
	const setUser = useStore((state) => state.setUser);

	const colorScheme = useColorScheme();
	const theme = colorScheme === "light" ? "light" : "dark";

	const [friend, setFriend] = useState<{
		name: string;
		lastContacted: Date;
		freq: { unit: number; period: string };
	}>({
		name: "",
		lastContacted: new Date(),
		freq: { unit: 0, period: "day" },
	});

	const [userSettings, setUserSettings] = useState<{
		reminderTime: time;
		pushNotifications: string;
	}>({
		reminderTime: { hour: 9, minute: 0 },
		pushNotifications: "",
	});

	const complete = () => {
		const newFriend = new Friend(friend.name, friend.lastContacted, friend.freq);
		setUser({
			email: "",
			isLocal: true,
			settings: userSettings,
			id: generateID(),
		});
		addFriend(newFriend);
		// if (user.id !== undefined) {
		// 	addReminder(
		// 		newReminder(
		// 			newFriend.nextReminderDate,
		// 			newFriend.id,
		// 			newFriend.name,
		// 			user.settings.reminderTime
		// 		)
		// 	);
		// }
		//testing
		const today = new Date();
		const currentHour = today.getHours();
		const currentMinute = today.getMinutes();
		addReminder(
			newReminder(today, newFriend.id, newFriend.name, {
				hour: currentHour,
				minute: currentMinute + 1,
			})
		);
		saveToLocal();
		// if (isGuest) {
		router.replace("/(tabs)");
		// } else {
		// 	router.push("/(onBoarding)/logup");
		// }
	};

	const gradientColors =
		theme === "light"
			? [Colors.light.tertiaryContainer, Colors.light.background]
			: [Colors.dark.tertiaryContainer, Colors.dark.background];

	const next = () => {
		if (Platform.OS === "web" && onBoardPage === 3) {
			setOnBoardPage(onBoardPage + 2);
		} else {
			setOnBoardPage(onBoardPage + 1);
		}
	};

	const back = () => {
		if (Platform.OS === "web" && onBoardPage === 5) {
			setOnBoardPage(onBoardPage - 2);
		} else {
			setOnBoardPage(onBoardPage - 1);
		}
	};

	return (
		<>
			<Layout
				style={{
					justifyContent: "space-around",
				}}
			>
				<LinearGradient
					// Background Linear Gradient
					colors={gradientColors}
					style={{ position: "absolute", left: 0, right: 0, top: 0, height: "100%" }}
				/>
				{onBoardPage == 0 ? (
					<>
						<Image
							style={{
								width: 200,
								height: 200,
								alignSelf: "center",
							}}
							contentFit='contain'
							source={require("../../assets/images/logo.png")}
						/>
						<Text
							style={{
								fontSize: 30,
								fontFamily: "Fredoka-Medium",
								textAlign: "center",
								color:
									theme === "light"
										? Colors.light.onTertiaryContainer
										: Colors.dark.onTertiaryContainer,
							}}
						>
							Welcome to Buddy Link
						</Text>
						<Button
							variant={ButtonVariants.Primary}
							text='Add your First Friend'
							onPress={() => setOnBoardPage(onBoardPage + 1)}
						/>

						{user.id ? (
							<Button
								text='Continue from Saved Data'
								variant={ButtonVariants.Primary}
								onPress={() => router.push("/(tabs)")}
							/>
						) : null}
					</>
				) : null}

				{onBoardPage == 1 ? (
					<Page1
						back={back}
						next={next}
						setFriend={(value: string) => {
							setFriend({ ...friend, name: value });
						}}
					/>
				) : null}
				{onBoardPage == 2 ? (
					<Page2
						back={back}
						next={next}
						setFriend={(value: Date) => {
							setFriend({ ...friend, lastContacted: value });
						}}
					/>
				) : null}
				{onBoardPage == 3 ? (
					<Page3
						back={back}
						next={next}
						setFriend={(value: { unit: number; period: string }) => {
							setFriend({ ...friend, freq: value });
						}}
					/>
				) : null}
				{onBoardPage == 4 ? (
					<Page4
						setSetting={(value: string) =>
							setUserSettings({ ...userSettings, pushNotifications: value })
						}
						back={back}
						next={next}
					/>
				) : null}
				{onBoardPage == 5 ? (
					<Page5
						setSetting={(value: time) =>
							setUserSettings({ ...userSettings, reminderTime: value })
						}
						back={back}
						next={next}
					/>
				) : null}
				{onBoardPage == 6 ? (
					<Page6
						friend={friend}
						userSettings={userSettings}
						next={complete}
						back={back}
					/>
				) : null}

				{/* {onBoardPage == 7 ? (
					<>
						<Text style={[styles.bigTitle]}>
							Would you like to create an account to cloud save?
						</Text>
						<Button
							text='Create account'
							variant={ButtonVariants.Primary}
							onPress={() => complete(false)}
						/>
						<Button
							text='Continue as Guest'
							variant={ButtonVariants.Primary}
							onPress={() => complete(true)}
						/>
					</>
				) : null} */}
			</Layout>
		</>
	);
}
