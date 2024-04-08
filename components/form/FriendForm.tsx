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
	freq1: number;
	freq2: string;
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
					<Text style={[sharedFormStyles.label, themeStyles.label]}>
						Contact Frequency
					</Text>
					<Row
						style={{
							justifyContent: "space-around",
							marginBottom: 10,

							alignItems: "center",
						}}
					>
						<Dropdown
							name='freq1'
							customStyle={{ width: 100 }}
							error={methods.formState.errors.freq1}
							rules={{ required: "Frequency is required" }}
							data={[
								{ label: "once", value: 1 },
								{ label: "twice", value: 2 },
								{ label: "thrice", value: 3 },
							]}
						/>
						<Text style={[baseStyles.label, themeStyles.label]}>a</Text>
						<Dropdown
							name='freq2'
							customStyle={{ width: 100 }}
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
