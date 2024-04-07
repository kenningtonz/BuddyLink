import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";

import { Layout, Row, Text } from "@/components/Themed";
import { useStore } from "@/classes/userStore";
import { useRouter } from "expo-router";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

import { Button, ButtonVariants } from "@/components/Button";

import { formStyles, TextInput, Dropdown } from "@/components/form";

interface FormData {
	email: string;
	password: string;
}
const LogUp = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const methods = useForm<FormData>({
		defaultValues: { email: "", password: "" },
	});

	const signUpWithEmail: SubmitHandler<FormData> = async (form) => {
		setLoading(true);
		console.log(form);

		// router.push("/(tabs)");
		setLoading(false);
	};

	return (
		<Layout>
			<Text>login</Text>
			<FormProvider {...methods}>
				<TextInput
					name='email'
					label='Email'
					rules={{ required: "Email is required" }}
					error={methods.formState.errors.email}
					autoCapitalize='none'
					keyboardType='email-address'
				/>

				<TextInput
					name='password'
					label='Password'
					rules={{ required: "Password is required" }}
					error={methods.formState.errors.password}
					secureTextEntry
				/>

				<Button
					text='Sign up'
					variant={ButtonVariants.Primary}
					disabled={loading}
					onPress={methods.handleSubmit(signUpWithEmail)}
				/>
			</FormProvider>
		</Layout>
	);
};

export default LogUp;
