import React from "react";
import { Text } from "@/components/Themed";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonVariants } from "../Button";
import { TextInput } from "../form";
import { Row } from "../Themed";
import { sharedStyles as styles } from "@/components/styles";

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

	return (
		<>
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
