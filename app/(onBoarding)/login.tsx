import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { Layout, Row, Text } from "@/components/Themed";
import { useUserStore } from "@/classes/userStore";

import {
	FormProvider,
	useForm,
	SubmitHandler,
	SubmitErrorHandler,
} from "react-hook-form";

import { Button, ButtonVariants } from "@/components/Button";

import { TextInput, Dropdown } from "@/components/form";
import { useRouter } from "expo-router";

interface FormData {
	email: string;
	password: string;
}
const LogIn = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const methods = useForm<FormData>();

	const signInWithEmail: SubmitHandler<FormData> = async (data) => {
		setLoading(true);

		router.push("/(tabs)");
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
					text='Sign in'
					variant={ButtonVariants.Primary}
					disabled={loading}
					onPress={methods.handleSubmit(signInWithEmail)}
				/>
			</FormProvider>
		</Layout>
	);
};

export default LogIn;
