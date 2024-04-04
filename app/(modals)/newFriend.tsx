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
import { useFriendStore } from "@/classes/friendStore";
import { useRouter } from "expo-router";
import FriendForm from "@/components/form/FriendForm";

import baseStyles from "@/components/styles";

interface FormData {
	name: string;
	type: FriendType;
	method: number;
	freq1: number;
	freq2: string;
	img: string;
	lastContacted: Date;
}

const NewFriend = () => {
	const addFriend = useFriendStore((state) => state.addFriend);
	const router = useRouter();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const friend = {
			name: data.name,
			type: data.type,
			method: contactMethods[data.method],
			freq1: data.freq1,
			freq2: data.freq2,
			img: data.img,
			lastContacted: new Date(data.lastContacted),
			id: generateID(),
		};
		addFriend(friend);
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
					type: FriendType.Friend,
					method: 0,
					freq1: 1,
					freq2: "day",
					lastContacted: new Date(),
				}}
			/>
		</Layout>
	);
};

export default NewFriend;
