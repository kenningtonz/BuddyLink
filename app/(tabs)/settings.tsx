import { Text, Layout } from "@/components/Themed";
import { Link, router } from "expo-router";
import { sharedStyles as baseStyles } from "@/components/styles";
import { Platform, Pressable, View } from "react-native";
import useColorScheme from "@/components/useColorScheme";
import { Button, ButtonVariants } from "@/components/Button";
import {
	useStore,
	saveToLocal,
	clearLocal,
	clearStore,
} from "@/classes/userStore";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import { TimeInput } from "@/components/form";
import { time, timeToString } from "@/classes/time";
import { registerForPushNotificationsAsync } from "@/utils/notifications";
import Colors from "@/constants/Colors";

export default function Settings() {
	const user = useStore((state) => state.user);
	const [setUser] = useStore((state) => [state.setUser]);
	const [reminderDialog, setReminderDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const changeReminderTime = useStore((state) => state.changeReminderTime);
	// const [status, setStatus] = useState();

	const colorScheme = useColorScheme();
	const theme = colorScheme === "light" ? "light" : "dark";

	const { ...methods } = useForm<{ time: time }>({
		defaultValues: user.settings
			? { time: user.settings.reminderTime }
			: { time: { hour: 8, minute: 0 } },
	});

	const requestPermissions = async () => {
		const token = await registerForPushNotificationsAsync();
		if (token) {
			setUser({
				...user,
				settings: { ...user.settings, pushNotifications: token },
			});
			saveToLocal();
		}
		console.log(token);
	};

	const onSubmit: SubmitHandler<{ time: time }> = async (form) => {
		setUser({ ...user, settings: { ...user.settings, reminderTime: form.time } });
		changeReminderTime(form.time);
		setReminderDialog(false);
		saveToLocal();
	};

	return (
		<Layout style={{ justifyContent: "space-between" }}>
			{Platform.OS != "web" ? (
				<>
					{user.settings.pushNotifications == "" ? (
						<View>
							<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>
								Push Notifications
							</Text>
							<Button
								text='Enable'
								variant={ButtonVariants.Primary}
								onPress={() => {
									requestPermissions();
								}}
								style={{ marginBottom: 20 }}
							/>
						</View>
					) : (
						<View>
							<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>
								Push Notifications
							</Text>

							<Button
								text='Disable'
								variant={ButtonVariants.Danger}
								onPress={() => {
									setUser({
										...user,
										settings: { ...user.settings, pushNotifications: "" },
									});
									saveToLocal();
								}}
								style={{ marginBottom: 20 }}
							/>
						</View>
					)}
				</>
			) : null}
			<View>
				<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>Theme</Text>
				{user.settings.theme == "light" ? (
					<Button
						text='Light'
						variant={ButtonVariants.Primary}
						onPress={() => {
							setUser({
								...user,
								settings: { ...user.settings, theme: "dark" },
							});
							saveToLocal();
						}}
						style={{ marginBottom: 20 }}
					/>
				) : (
					<Button
						text='Dark'
						variant={ButtonVariants.Primary}
						onPress={() => {
							setUser({
								...user,
								settings: { ...user.settings, theme: "light" },
							});
							saveToLocal();
						}}
						style={{ marginBottom: 20 }}
					/>
				)}
			</View>
			<View>
				<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>
					Reminder Time
				</Text>
				<Text style={{ fontSize: 20, marginBottom: 10 }}>
					{timeToString(user.settings.reminderTime)}
				</Text>
				<Button
					text='Edit'
					variant={ButtonVariants.Primary}
					onPress={() => setReminderDialog(true)}
					style={{ marginBottom: 20 }}
				/>
			</View>
			<Dialog open={reminderDialog} setOpen={setReminderDialog} style={{}}>
				<FormProvider {...methods}>
					<TimeInput
						name='time'
						buttonStyle={{ width: 50, height: 50 }}
						textStyle={{ fontSize: 30 }}
						iconStyle={{ fontSize: 20 }}
					/>
					<Button
						text='Save'
						variant={ButtonVariants.Primary}
						onPress={methods.handleSubmit(onSubmit)}
					/>
				</FormProvider>
			</Dialog>
			<View>
				{/* <Link
					style={{
						marginBottom: 20,
						textAlign: "center",
						fontSize: 16,
						textDecorationLine: "underline",
						color:
							theme === "light" ? Colors.light.onBackground : Colors.dark.onBackground,
					}}
					href='/(onBoarding)/login'
				>
					Sign in to Cloud Save
				</Link> */}
				<Link
					style={{
						textAlign: "center",
						fontSize: 16,
						textDecorationLine: "underline",
						color:
							theme === "light" ? Colors.light.onBackground : Colors.dark.onBackground,
					}}
					href='/(onBoarding)/home'
				>
					Back to Home
				</Link>
			</View>
			<View>
				<Button
					text='Delete Save Data'
					variant={ButtonVariants.Danger}
					onPress={() => setDeleteDialog(true)}
					style={{ marginBottom: 20 }}
				/>
				<Dialog open={deleteDialog} setOpen={setDeleteDialog}>
					<Text style={{ fontSize: 20 }}>Are you sure you want to delete?</Text>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<Button
							text='No'
							variant={ButtonVariants.Primary}
							onPress={() => setDeleteDialog(false)}
						/>
						<Button
							text='Yes'
							variant={ButtonVariants.Danger}
							onPress={() => {
								clearLocal();
								clearStore();
								router.replace("/(onBoarding)/home");
								// setDeleteDialog(false);
							}}
						/>
					</View>
				</Dialog>
			</View>
		</Layout>
	);
}
