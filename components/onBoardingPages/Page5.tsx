import React from "react";
import { Text, useColorScheme } from "react-native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonVariants } from "../Button";
import { TimeInput } from "../form";
import { Row } from "../Themed";
import { time } from "@/classes/time";
import { sharedStyles as styles } from "@/components/styles";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const Page5: React.FC<{
	next: () => void;
	back: () => void;
	setSetting: (value: time) => void;
}> = ({ next, back, setSetting }) => {
	const { ...methods } = useForm<{ time: time }>({
		defaultValues: {
			time: { hour: 8, minute: 0 },
		},
	});

	const onSubmit: SubmitHandler<{ time: time }> = async (form) => {
		console.log(form);
		next();
		setSetting(form.time);
	};

	const theme = useColorScheme();

	const gradientColors =
		theme === "light"
			? [Colors.light.secondaryContainer, Colors.light.background]
			: [Colors.dark.secondaryContainer, Colors.dark.background];

	return (
		<>
			<LinearGradient
				// Background Linear Gradient
				colors={gradientColors}
				style={{ position: "absolute", left: 0, right: 0, top: 0, height: "100%" }}
			/>
			<Text style={[styles.bigTitle]}>
				What time would you like to be reminded?
			</Text>

			<FormProvider {...methods}>
				<Row
					style={{
						justifyContent: "space-around",
					}}
				>
					<TimeInput
						name='time'
						buttonStyle={{ width: 50, height: 50 }}
						textStyle={{ fontSize: 30 }}
						iconStyle={{ fontSize: 20 }}
					/>
				</Row>
			</FormProvider>
			<Row style={{ gap: 8 }}>
				<Button
					style={{ flex: 1 }}
					variant={ButtonVariants.Ghost}
					icon='chevron-left'
					onPress={back}
				/>
				<Button
					style={{ flex: 5 }}
					text='Next'
					variant={ButtonVariants.Primary}
					onPress={methods.handleSubmit(onSubmit)}
				/>
			</Row>
		</>
	);
};

export default Page5;
