import { Row } from "@/components/Themed";
import React, { useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

import { Button, ButtonVariants } from "@/components/Button";

import {
	sharedFormStyles,
	darkTheme,
	lightTheme,
	TextInput,
	Dropdown,
	DatePicker,
	ImagePicker,
} from "@/components/form";
import { Text } from "@/components/Themed";
import { sharedStyles as baseStyles } from "@/components/styles";
import { useColorScheme } from "react-native";
import { Period } from "@/classes/friend";

// interface FormData {
// 	name: string;
// 	type: FriendType;
// 	method: number;
// 	freq1: number;
// 	freq2: string;
// 	img: string;
// 	lastContacted: Date;
// }

interface FormData {
	name: string;
	method: number;
	frequency: Period;
	img: string;
	lastContacted: Date;
}

interface Props {
	onSubmit: SubmitHandler<FormData>;
	buttonText: string;
	defaultValues: Partial<FormData>;
}

export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { onSubmit, buttonText, defaultValues } = props;
		const { ...methods } = useForm<FormData>({
			defaultValues: defaultValues,
		});

		const colorScheme = useColorScheme();
		const themeStyles = colorScheme === "dark" ? darkTheme : lightTheme;

		return (
			<FormProvider {...methods}>
				<>
					<ImagePicker
						name='img'
						style={{ justifyContent: "center", alignItems: "center" }}
						// label='Image'
						error={methods.formState.errors.img}
						// rules={{ required: "Image is required" }}
					/>
					<TextInput
						name='name'
						label='Name'
						error={methods.formState.errors.name}
						rules={{ required: "Name is required" }}
					/>
					{/* <Dropdown
						name='type'
						label='Friend Type'
						error={methods.formState.errors.type}
						rules={{ required: "Friend Type is required" }}
						data={[
							{ label: "Friend", value: FriendType.Friend },
							{ label: "Acquaintance", value: FriendType.Acquaintance },
							{ label: "Family", value: FriendType.Family },
							{ label: "Work", value: FriendType.Work },
							{ label: "Other", value: FriendType.Other },
						]}
					/> */}
					{/* <Dropdown
						name='method'
						label='Preferred Contact Method'
						error={methods.formState.errors.method}
						rules={{ required: "Contact Method is required" }}
						data={contactMethods.map((method) => ({
							label: method.name,
							icon: method.icon,
							value: method.id,
						}))}
					/> */}
					<DatePicker
						name='lastContacted'
						label='Last Contacted'
						error={methods.formState.errors.lastContacted}
						rules={{ required: "Last Contacted is required" }}
					/>
					{/* <Text style={[sharedFormStyles.label, themeStyles.label]}>
						Contact Frequency
					</Text> */}

					<Dropdown
						name='frequency'
						label='Contact Frequency'
						customStyle={{ width: 100 }}
						error={methods.formState.errors.frequency}
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
				</>
				<Button
					variant={ButtonVariants.Primary}
					onPress={methods.handleSubmit(onSubmit)}
					text={buttonText}
				/>
			</FormProvider>
		);
	}
);

// export default FriendForm;
