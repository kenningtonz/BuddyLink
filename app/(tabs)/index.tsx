import { View, FlatList, Image, Pressable } from "react-native";
import useColorScheme from "@/components/useColorScheme";
import { useEffect, useState } from "react";
import { saveToLocal, useStore } from "@/classes/userStore";
import { Text, Layout } from "@/components/Themed";
import { Link, useRouter } from "expo-router";
import { Friend } from "@/classes/friend";

import {
	sharedStyles as baseStyles,
	darkTheme,
	lightTheme,
} from "@/components/styles";

import { Stack } from "expo-router";
import { Button, ButtonVariants } from "@/components/Button";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "@/constants/Colors";
import { checkReminders } from "@/classes/reminder";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Friends() {
	const friendsList = useStore((state) => state.friends);
	const [sort, setSort] = useState("");

	const futureReminders = useStore((state) => state.remindersFuture);
	const addReminder = useStore((state) => state.addReminder);
	const moveReminder = useStore((state) => state.moveReminder);
	const user = useStore((state) => state.user);
	const editFriend = useStore((state) => state.editFriend);

	useEffect(() => {
		if (futureReminders.length > 0) {
			checkReminders(
				futureReminders,
				user.settings.reminderTime,
				addReminder,
				moveReminder,
				user.settings.pushNotifications,
				friendsList,
				editFriend
			);
			saveToLocal();
		}
	}, []);

	useEffect(() => {
		if (sort === "a-z") {
			friendsList.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sort === "z-a") {
			friendsList.sort((a, b) => b.name.localeCompare(a.name));
		} else if (sort === "lastContacted") {
			friendsList.sort(
				(a, b) => a.lastContacted.getTime() - b.lastContacted.getTime()
			);
		}
	}, [sort]);

	const theme = useColorScheme();
	const themeStyles = theme === "dark" ? darkTheme : lightTheme;
	const router = useRouter();

	const goToFriend = (id: string) => {
		router.push(`/friends/${id}`);
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: "Welcome to BuddyLink",
				}}
			/>
			<Layout>
				{/* <Text style={styles.title}>Friends</Text> */}
				<Link href={"/(modals)/newFriend"} asChild>
					<Button
						variant={ButtonVariants.Primary}
						text='Add Friend'
						style={{ marginBottom: 20 }}
					/>
				</Link>
				{friendsList.length > 0 ? (
					<>
						<Dropdown
							labelField='label'
							style={{
								borderRadius: 10,
								padding: 10,
								backgroundColor:
									theme === "light"
										? Colors.light.secondaryTint
										: Colors.dark.secondaryTint,
								marginBottom: 20,
							}}
							containerStyle={{
								borderRadius: 10,
								backgroundColor:
									theme === "light"
										? Colors.light.secondaryTint
										: Colors.dark.secondaryTint,
							}}
							itemTextStyle={{
								fontFamily: "Fredoka",
								color:
									theme === "light"
										? Colors.light.onBackground
										: Colors.dark.onBackground,
							}}
							iconColor={
								theme === "light" ? Colors.light.onBackground : Colors.dark.onBackground
							}
							placeholderStyle={{
								fontFamily: "Fredoka",
								color:
									theme === "light"
										? Colors.light.onBackground
										: Colors.dark.onBackground,
							}}
							placeholder={"Sort By"}
							valueField='value'
							value={sort}
							onChange={(value) => setSort(value.value)}
							data={[
								{ label: "A - Z", value: "a-z" },
								{ label: "Z - A", value: "z-a" },
								{ label: "Last Contacted", value: "lastContacted" },
							]}
						/>

						<FlatList
							style={baseStyles.list}
							data={friendsList}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<Pressable
									onPress={() => goToFriend(item.id)}
									style={[
										{
											display: "flex",
											flexDirection: "row",

											alignItems: "center",
											gap: 10,
											borderRadius: 8,
											marginVertical: 10,
											padding: 20,
											elevation: 2,
										},
										themeStyles.item,
									]}
								>
									{item.img ? (
										<View style={[baseStyles.image]}>
											<Image
												source={{ uri: item.img }}
												style={{ width: "100%", height: "100%", borderRadius: 50 }}
											/>
										</View>
									) : (
										<View
											style={{
												width: 50,
												height: 50,
												borderRadius: 50,
												backgroundColor:
													theme === "light"
														? Colors.light.secondaryContainer
														: Colors.dark.secondaryContainer,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<FontAwesome6 name='user' size={25} />
										</View>
									)}
									<Text
										style={{
											fontSize: 16,
											fontFamily: "Fredoka-Medium",
											marginTop: 10,
											color:
												theme === "light" ? Colors.light.primary : Colors.dark.primary,
										}}
									>
										{item.name}
									</Text>
								</Pressable>
							)}
						/>
					</>
				) : null}
			</Layout>
		</>
	);
}
