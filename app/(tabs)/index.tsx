import { View as Column, FlatList, Pressable } from "react-native";

import { Text, Layout } from "@/components/Themed";
import { Link } from "expo-router";
import { Friend } from "@/classes/friend";

import { useFriendStore } from "@/classes/friendStore";
import baseStyles from "@/components/styles";

import { Stack } from "expo-router";
import { Button, ButtonVariants } from "@/components/Button";

export default function Friends() {
	const friendsList = useFriendStore((state) => state.friends);

	return (
		<>
			<Stack.Screen
				options={{
					title: "Welcome to BuddyLink",
					headerTitleStyle: { fontFamily: "Fredoka" },
				}}
			/>
			<Layout>
				{/* <Text style={styles.title}>Friends</Text> */}
				<Link href={"/(modals)/newFriend"} asChild>
					<Button variant={ButtonVariants.Primary} text='Add Friend' />
				</Link>
				<FlatList
					style={baseStyles.list}
					data={friendsList}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => <FriendItem friend={item} />}
				/>
			</Layout>
		</>
	);
}

const FriendItem = ({ friend }: { friend: Friend }) => {
	return (
		<Column>
			<Link href={`/friends/${friend.id}`} style={baseStyles.item}>
				<Text>{friend.name}</Text>
			</Link>
		</Column>
	);
};
