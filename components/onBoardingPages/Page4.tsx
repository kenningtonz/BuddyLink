import React from "react";
import { Text } from "react-native";
import { Button, ButtonVariants } from "../Button";

const Page4: React.FC<{
	next: () => void;
	back: () => void;
	setSetting: (value: boolean) => void;
}> = ({ next, back, setSetting }) => {
	return (
		<>
			<Text>Enable Push Notifications? </Text>
			<Button
				text='Yes'
				variant={ButtonVariants.Primary}
				onPress={() => {
					setSetting(true);
					next();
				}}
			/>
			<Button
				text='Continue without'
				variant={ButtonVariants.Primary}
				onPress={() => {
					setSetting(false);
					next();
				}}
			/>
			<Button text='Back' onPress={back} />
		</>
	);
};

export default Page4;
