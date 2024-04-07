import React from "react";
import { Text } from "@/components/Themed";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonVariants } from "../Button";
import { TextInput } from "../form";
import { Row } from "../Themed";
import { sharedStyles as styles } from "@/components/styles";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

const Page1: React.FC<{
	next: () => void;
	back: () => void;
	setFriend: (value: string) => void;
}> = ({ next, back, setFriend }) => {
	const { ...methods } = useForm<{ name: string }>({
		defaultValues: { name: "" },
	});
	const onSubmit: SubmitHandler<{ name: string }> = async (form) => {
		console.log(form);
		setFriend(form.name);
		next();
	};

	const theme = useColorScheme();

	const gradientColors =
		theme === "light"
			? [Colors.light.tertiaryContainer, Colors.light.background]
			: [Colors.dark.tertiaryContainer, Colors.dark.background];

	return (
		<>
			<LinearGradient
				// Background Linear Gradient
				colors={gradientColors}
				style={{ position: "absolute", left: 0, right: 0, top: 0, height: "100%" }}
			/>
			<Text style={[styles.bigTitle]}>What's your Friend's name?</Text>
			<FormProvider {...methods}>
				<TextInput
					name='name'
					label='Name'
					rules={{ required: "name is required" }}
					error={methods.formState.errors.name}
					autoCapitalize='none'
				/>
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

export default Page1;
