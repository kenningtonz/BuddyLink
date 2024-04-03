import AsyncStorage from "@react-native-async-storage/async-storage";

enum FriendType {
	Acquaintance,
	Friend,
	BestFriend,
	Family,
	Work,
	Other,
}

// type FriendType = {

// }

// type Friend ={
// 	name: string;
// 	nickname?: string;

// }

// type ContactMethod = {
// 	name: string;
// 	icon : string;
// }

enum ContactMethod {
	Phone,
	Text,
	Email,
	Discord,
	WhatsApp,
	Instagram,
	Facebook,
	Other,
}

class Friend {
	name: string;
	nickname?: string;
	id: number;
	img?: string;
	type: FriendType;
	method?: ContactMethod;
	frequency?: string;
	lastContacted?: Date;
	constructor(
		name: string,
		type: FriendType,
		lastContacted?: Date,
		img?: string,
		method?: ContactMethod,
		frequency?: string,
		nickname?: string
	) {
		this.name = name;
		this.nickname = nickname;
		this.id = Math.floor(Math.random() * 1000);
		this.img = img;
		this.type = type;
		this.method = method;
		this.frequency = frequency;
		this.lastContacted = lastContacted;
	}
	edit() {
		console.log("Edit");
	}
}

// // https://react-native-async-storage.github.io/async-storage/docs/usage
// class FriendList {
// 	friends: Friend[];
// 	constructor() {
// 		this.friends = [];
// 	}
// 	add(friend: Friend) {
// 		this.friends.push(friend);
// 	}
// 	remove(friend: Friend) {
// 		this.friends = this.friends.filter((f) => f.id !== friend.id);
// 	}
// 	async save() {
// 		try {
// 			const jsonValue = JSON.stringify(this.friends);
// 			await AsyncStorage.setItem("friends", jsonValue);
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	}
// }

export { Friend, FriendType, ContactMethod };
