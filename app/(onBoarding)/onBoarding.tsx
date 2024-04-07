import { Link, Stack, useRouter } from "expo-router";
import { useStore, saveToLocal } from "@/classes/userStore";
import { Layout, Row } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Pressable, Text, useColorScheme } from "react-native";
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

export default function OnBoarding() {
	// const user = useStore((state) => state.user);

	const addFriend = useStore((state) => state.addFriend);
	const router = useRouter();

	const [onBoardPage, setOnBoardPage] = useState(0);
	const setUser = useStore((state) => state.setUser);

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
		pushNotifications: boolean;
	}>({
		reminderTime: { hour: 9, minute: 0 },
		pushNotifications: true,
	});

	const complete = (isGuest: boolean) => {
		addFriend({
			id: generateID(),
			name: friend.name,
			lastContacted: friend.lastContacted,
			frequency: friend.freq,
		});
		setUser({ isLocal: isGuest, settings: userSettings, id: generateID() });
		saveToLocal();
		if (isGuest) {
			router.push("/(tabs)");
		} else {
			router.push("/(onBoarding)/logup");
		}
	};

	const next = () => {
		setOnBoardPage(onBoardPage + 1);
	};

	const back = () => {
		setOnBoardPage(onBoardPage - 1);
	};

	return (
		<>
			<Layout style={{ justifyContent: "space-around" }}>
				{onBoardPage == 0 ? (
					<>
						<Text>OnBoarding</Text>
						<Button
							variant={ButtonVariants.Primary}
							text='Add your First Friend'
							onPress={() => setOnBoardPage(onBoardPage + 1)}
						/>
						<Button
							variant={ButtonVariants.Secondary}
							text='Log in'
							onPress={() => {
								router.push("/(onBoarding)/login");
							}}
						/>
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
				{/* {onBoardPage == 4 ? (
					<Page4
						setSetting={(value: boolean) =>
							setUserSettings({ ...userSettings, pushNotifications: value })
						}
						back={back}
						next={next}
					/>
				) : null} */}
				{onBoardPage == 4 ? (
					<Page5
						setSetting={(value: time) =>
							setUserSettings({ ...userSettings, reminderTime: value })
						}
						back={back}
						next={next}
					/>
				) : null}
				{onBoardPage == 5 ? (
					<Page6 friend={friend} userSettings={userSettings} next={next} />
				) : null}

				{onBoardPage == 6 ? (
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
				) : null}
			</Layout>
		</>
	);
}
