import React from "react";
import { Text } from "react-native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonVariants } from "../Button";
import { DatePicker } from "../form";
import { Row } from "../Themed";

import { sharedStyles as styles } from "@/components/styles";
const Page2: React.FC<{
	next: () => void;
	back: () => void;
	setFriend: (value: Date) => void;
}> = ({ next, back, setFriend }) => {
	const { ...methods } = useForm<{ lastContacted: Date }>({});
	const onSubmit: SubmitHandler<{ lastContacted: Date }> = async (form) => {
		console.log(form);
		setFriend(form.lastContacted);
		next();
	};

	return (
		<>
			<Text style={[styles.bigTitle]}>When did you last contact them?</Text>
			<FormProvider {...methods}>
				<DatePicker
					name='lastContacted'
					rules={{ required: "this is required" }}
					error={methods.formState.errors.lastContacted}
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

export default Page2;
