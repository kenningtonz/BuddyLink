import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonVariants } from "../Button";
import { Dropdown, sharedFormStyles, darkTheme, lightTheme } from "../form";
import { Row, Text } from "../Themed";
import { sharedStyles as styles } from "@/components/styles";
import useColorScheme from "../useColorScheme";
import { Period } from "@/classes/friend";

const Page3: React.FC<{
	next: () => void;
	back: () => void;
	setFriend: (value: Period) => void;
}> = ({ next, back, setFriend }) => {
	const { ...methods } = useForm<{ freq: Period }>({});
	const onSubmit: SubmitHandler<{ freq: Period }> = async (form) => {
		console.log(form);
		setFriend(form.freq);
		next();
	};

	const colorScheme = useColorScheme();
	const themeStyles = colorScheme === "dark" ? darkTheme : lightTheme;

	return (
		<>
			<Text style={[styles.bigTitle]}>
				How often would you like to contact them?
			</Text>
			<FormProvider {...methods}>
				<Dropdown
					name='freq'
					label='Contact Frequency'
					error={methods.formState.errors.freq}
					rules={{ required: "Frequency is required" }}
					data={[
						{ label: Period.daily, value: Period.daily },
						{ label: Period.twoDay, value: Period.twoDay },
						{ label: Period.threeDay, value: Period.threeDay },
						{ label: Period.weekly, value: Period.weekly },
						{ label: Period.biWeekly, value: Period.biWeekly },
						{ label: Period.monthly, value: Period.monthly },
						{ label: Period.biMonthly, value: Period.biMonthly },
						{ label: Period.quarterly, value: Period.quarterly },
						{ label: Period.yearly, value: Period.yearly },
					]}
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

export default Page3;
