import { Row } from "@/components/Themed";
import React, { useState } from "react";
import {
	FormProvider,
	useForm,
	SubmitHandler,
	SubmitErrorHandler,
} from "react-hook-form";
import {
	Friend,
	FriendType,
	ContactMethod,
	contactMethods,
	Frequency,
} from "@/classes/friend";

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

		return (
			<FormProvider {...methods}>
				<>
					<ImagePicker
						name='img'
						label='Image'
						error={methods.formState.errors.img}
						rules={{ required: "Image is required" }}
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
					<Dropdown
						name='method'
						label='Preferred Contact Method'
						error={methods.formState.errors.method}
						rules={{ required: "Contact Method is required" }}
						data={contactMethods.map((method) => ({
							label: method.name,
							icon: method.icon,
							value: method.id,
						}))}
					/>
					<DatePicker
						name='lastContacted'
						label='Last Contacted'
						error={methods.formState.errors.lastContacted}
						rules={{ required: "Last Contacted is required" }}
					/>
					<Text style={baseStyles.label}>Contact Frequency</Text>
					<Row
						style={{
							justifyContent: "space-around",
							marginBottom: 10,
						}}
					>
						<Dropdown
							name='freq1'
							customStyle={{ width: 150 }}
							error={methods.formState.errors.freq1}
							rules={{ required: "Frequency is required" }}
							data={[
								{ label: "once", value: 1 },
								{ label: "twice", value: 2 },
								{ label: "thrice", value: 3 },
								{ label: "four times", value: 4 },
								{ label: "custom", value: 5 },
							]}
						/>
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
