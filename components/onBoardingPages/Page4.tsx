import React, { useState } from "react";
import { Text } from "react-native";
import { Button, ButtonVariants } from "../Button";
import * as Notifications from "expo-notifications";

const Page4: React.FC<{
	next: () => void;
	back: () => void;
	setSetting: (value: string) => void;
}> = ({ next, back, setSetting }) => {
	const [status, setStatus] = useState<string | null>(null);

	const requestPermissions = async () => {
		const { status } = await Notifications.requestPermissionsAsync();
		setStatus(status);
		console.log(status);
		const { data: token } = await Notifications.getExpoPushTokenAsync();
		setSetting(token);
		next();
	};

	return (
		<>
			<Text>Enable Push Notifications? </Text>
			<Button
				text='Yes'
				variant={ButtonVariants.Primary}
				onPress={() => {
					requestPermissions();
					// next();
				}}
			/>
			<Button
				text='Continue without'
				variant={ButtonVariants.Primary}
				onPress={() => {
					setSetting("");
					next();
				}}
			/>
			<Button text='Back' onPress={back} />
		</>
	);
};

export default Page4;
