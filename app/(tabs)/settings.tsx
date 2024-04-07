import { Text, Layout } from "@/components/Themed";
import { Link } from "expo-router";
import { sharedStyles as baseStyles } from "@/components/styles";
import { Pressable } from "react-native";
import { Button, ButtonVariants } from "@/components/Button";
import { useStore, saveToLocal } from "@/classes/userStore";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import TimeSelector from "@/components/form/TimePicker/TimeSelector";
import { TimeInput } from "@/components/form";
import { time, timeToString } from "@/classes/time";

export default function Settings() {
	const user = useStore((state) => state.user);
	const [setUser] = useStore((state) => [state.setUser]);
	const [reminderDialog, setReminderDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);

	const { ...methods } = useForm<{ time: time }>({
		defaultValues: user?.settings.reminderTime
			? { time: user.settings.reminderTime }
			: { time: { hour: 8, minute: 0 } },
	});

	const onSubmit: SubmitHandler<{ time: time }> = async (form) => {
		console.log(form);
		setUser({ ...user, settings: { ...user.settings, reminderTime: form.time } });
		setReminderDialog(false);
		saveToLocal();
	};

	return (
		<Layout>
			<Text style={{ fontSize: 20, fontFamily: "Fredoka-Medium" }}>
				Reminder Time
			</Text>
			<Text style={{ fontSize: 20, marginBottom: 10 }}>
				{user ? timeToString(user.settings.reminderTime) : "Not Set"}
			</Text>
			<Button
				text='Edit'
				variant={ButtonVariants.Primary}
				onPress={() => setReminderDialog(true)}
				style={{ marginBottom: 20 }}
			/>
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
			<Link
				style={{
					marginBottom: 20,
					textAlign: "center",
					fontSize: 16,
					textDecorationLine: "underline",
				}}
				href='/(onBoarding)/login'
			>
				Sign in to cloud save.
			</Link>
			<Link
				style={{
					textAlign: "center",
					fontSize: 16,
					textDecorationLine: "underline",
				}}
				href='/(onBoarding)/onBoarding'
			>
				Back to Home
			</Link>
		</Layout>
	);
}
