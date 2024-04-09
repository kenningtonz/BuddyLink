import React, { useState } from "react";
import { Text } from "react-native";
import { Button, ButtonVariants } from "../Button";
import * as Notifications from "expo-notifications";
import { Row } from "../Themed";

import { sharedStyles as styles } from "../styles";
import { registerForPushNotificationsAsync } from "@/utils/notifications";

const Page4: React.FC<{
	next: () => void;
	back: () => void;
	setSetting: (value: boolean) => void;
}> = ({ next, back, setSetting }) => {
	// const [status, setStatus] = useState<string | null>(null);

	// const requestPermissions = async () => {
	// 	const { status } = await Notifications.requestPermissionsAsync();
	// 	setStatus(status);
	// 	console.log(status);
	// 	if (status == "granted") {
	// 		const token = await registerForPushNotificationsAsync();
	// 		if (token) {
	// 			setSetting(token);
	// 		}
	// 	}
	// 	next();
	// };

	return (
		<>
			<Text style={[styles.bigTitle]}>Enable Push Notifications? </Text>
			<Button
				text='Yes'
				variant={ButtonVariants.Primary}
				onPress={() => {
					// requestPermissions();
					setSetting(true);
					next();
				}}
			/>

			<Row style={{ gap: 8 }}>
				<Button
					style={{ flex: 1 }}
					variant={ButtonVariants.Ghost}
					icon='chevron-left'
					onPress={back}
				/>
				<Button
					style={{ flex: 5 }}
					text='Continue without'
					variant={ButtonVariants.Primary}
					onPress={() => {
						setSetting(false);
						next();
					}}
				/>
			</Row>
		</>
	);
};

export default Page4;
