import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { supabase } from "@/utils/supabase";
import { Layout, Row, Text } from "@/components/Themed";
import { useUserStore } from "@/classes/userStore";
import {
	FormProvider,
	useForm,
	SubmitHandler,
	SubmitErrorHandler,
} from "react-hook-form";

import { Button, ButtonVariants } from "@/components/Button";

import { formStyles, TextInput, Dropdown } from "@/components/form";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

interface FormData {
	email: string;
	password: string;
}
const Page = () => {
	const [loading, setLoading] = useState(false);

	const methods = useForm<FormData>();

	const signInWithEmail: SubmitHandler<FormData> = async (data) => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});
		if (error) {
			Alert.alert("Error", error.message);
		}
		setLoading(false);
	};

	const signUpWithEmail: SubmitHandler<FormData> = async (form) => {
		setLoading(true);

		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: form.email,
			password: form.password,
		});

		if (error) {
			Alert.alert("Error", error.message);
		}
		if (!session) {
			Alert.alert("Please check your inbox for email verification!");
		}

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

				<Row>
					<Button
						text='Sign in'
						disabled={loading}
						onPress={methods.handleSubmit(signInWithEmail)}
					/>

					<Button
						text='Sign up'
						disabled={loading}
						onPress={methods.handleSubmit(signUpWithEmail)}
					/>
				</Row>
			</FormProvider>
		</Layout>
	);
};

export default Page;
