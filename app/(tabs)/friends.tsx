import { StyleSheet, FlatList, Pressable } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { Friend } from "@/components/classes/friend";

import { useFriendStore } from "@/components/classes/friendStore";
import styles from "@/components/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
export default function Friends() {
	const friendsList = useFriendStore((state) => state.friends);

	return (
		<SafeAreaView>
			<Stack.Screen
				options={{
					title: "Friends",
					headerTitleStyle: { fontFamily: "Fredoka" },
				}}
			/>

			<View style={{ height: "100%", padding: 10 }}>
				{/* <Text style={styles.title}>Friends</Text> */}
				<Link href={"/(modals)/newFriend"} asChild>
					<Pressable
						// sizePressable={"icon"}
						style={styles.button}
						// style={({ pressed }) => (pressed ? styles.buttonDown : styles.button)}
					>
						<Text style={styles.buttonText}>New Friend</Text>
					</Pressable>
				</Link>
				<FlatList
					style={styles.list}
					data={friendsList}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => <FriendItem friend={item} />}
				/>
			</View>
		</SafeAreaView>
	);
}

const FriendItem = ({ friend }: { friend: Friend }) => {
	return (
		<View lightColor=''>
			<Link href={`/friends/${friend.id}`} style={styles.item}>
				<Text>{friend.name}</Text>
			</Link>
		</View>
	);
};
