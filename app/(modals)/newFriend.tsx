import { SafeAreaView } from "react-native";

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
import { generateID } from "@/utils/generateID";

import { Text, Layout } from "@/components/Themed";

import { useStore, saveToLocal } from "@/classes/userStore";
import { useRouter } from "expo-router";
import FriendForm from "@/components/form/FriendForm";

import { sharedStyles as baseStyles } from "@/components/styles";

interface FormData {
	name: string;
	method: number;
	freq1: number;
	freq2: string;
	img: string;
	lastContacted: Date;
}

const NewFriend = () => {
	const addFriend = useStore((state) => state.addFriend);
	const router = useRouter();
	const friends = useStore((state) => state.friends);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const friend = {
			name: data.name,
			method: contactMethods[data.method],
			frequency: { unit: data.freq1, period: data.freq2 },
			img: data.img,
			lastContacted: new Date(data.lastContacted),
			id: generateID(),
		};
		addFriend(friend);
		console.log(friends);
		saveToLocal();
		router.back();
		console.log(data);
	};

	return (
		<Layout>
			<Text style={baseStyles.title}>Add New Friend</Text>
			<FriendForm
				onSubmit={onSubmit}
				buttonText='Add Friend'
				defaultValues={{
					img: "/assets/images/placeholder.png",
					name: "",
				}}
			/>
		</Layout>
	);
};

export default NewFriend;
