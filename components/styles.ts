import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const sharedStyles = StyleSheet.create({
	title: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Fredoka-SemiBold",
	},
	bigTitle: {
		fontSize: 30,
		textAlign: "center",
		fontFamily: "Fredoka-SemiBold",
	},

	text: {
		padding: 8,
	},
	list: {
		width: "100%",
	},
	item: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		borderRadius: 8,
		marginVertical: 10,
		padding: 20,
		elevation: 2,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 50,
	},
	closeIcon: {
		position: "absolute",
		right: 10,
		top: 10,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
		elevation: 2,
	},
	placeHolderImage: {
		width: 50,
		height: 50,
		borderRadius: 50,
		elevation: 2,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 20,
	},
	label: {
		fontSize: 16,
		fontFamily: "Fredoka-SemiBold",
	},
});

export const lightTheme = StyleSheet.create({
	item: {
		backgroundColor: Colors.light.tertiaryContainer,
	},
	image: {
		backgroundColor: Colors.light.secondaryContainer,
	},
	label: {
		color: Colors.light.primary,
	},
});

export const darkTheme = StyleSheet.create({
	item: {
		backgroundColor: Colors.dark.tertiaryContainer,
	},
	image: {
		backgroundColor: Colors.dark.secondaryContainer,
	},
	label: {
		color: Colors.dark.primary,
	},
});
