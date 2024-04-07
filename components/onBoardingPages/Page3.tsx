import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonVariants } from "../Button";
import { Dropdown } from "../form";
import { Row, Text } from "../Themed";
import { sharedStyles as styles } from "@/components/styles";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const Page3: React.FC<{
	next: () => void;
	back: () => void;
	setFriend: (value: { unit: number; period: string }) => void;
}> = ({ next, back, setFriend }) => {
	const { ...methods } = useForm<{ freq1: number; freq2: string }>({});
	const onSubmit: SubmitHandler<{ freq1: number; freq2: string }> = async (
		form
	) => {
		console.log(form);
		setFriend({ unit: form.freq1, period: form.freq2 });
		next();
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
				How often would you like to contact them?
			</Text>
			<FormProvider {...methods}>
				<Row
					style={{
						justifyContent: "space-around",
					}}
				>
					<Dropdown
						name='freq1'
						customStyle={{ width: 150 }}
						error={methods.formState.errors.freq1}
						rules={{ required: "Frequency is required" }}
						label=''
						data={[
							{ label: "once", value: 1 },
							{ label: "twice", value: 2 },
							{ label: "thrice", value: 3 },
							{ label: "four times", value: 4 },
						]}
					/>
					<Text>per</Text>
					<Dropdown
						name='freq2'
						customStyle={{ width: 150 }}
						error={methods.formState.errors.freq2}
						rules={{ required: "Frequency is required" }}
						data={[
							{ label: "day", value: "day" },
							{ label: "week", value: "week" },
							{ label: "month", value: "month" },
							{ label: "year", value: "year" },
						]}
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

export default Page3;
