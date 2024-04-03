import { create } from "zustand";
import { Friend } from "@/components/classes/friend";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FriendState {
	friends: Friend[];
	addFriend: (friend: Friend) => void;
	removeFriend: (id: number) => void;
}

const useFriendStore = create<FriendState>()((set) => ({
	friends: [],
	addFriend: (friend) =>
		set((state) => ({ friends: [...state.friends, friend] })),
	removeFriend: (id) =>
		set((state) => ({
			friends: state.friends.filter((friend) => friend.id !== id),
		})),
	async save() {
		try {
			const jsonValue = JSON.stringify(this.friends);
			await AsyncStorage.setItem("friends", jsonValue);
		} catch (e) {
			console.log(e);
		}
	},
}));

// function loadFriends() {
// 	const friendsList = new FriendList();
// 	AsyncStorage.getItem("friends").then((value) => {
// 		if (value) {
// 			const friends = JSON.parse(value);
// 			friends.forEach((f: Friend) => {
// 				friendsList.add(
// 					new Friend(
// 						f.name,
// 						f.id,
// 						f.type,
// 						f.lastContacted,
// 						f.img,
// 						f.method,
// 						f.frequency,
// 						f.nickname
// 					)
// 				);
// 			});
// 		}
// 	});
// 	return friendsList;
// }

export { useFriendStore };
