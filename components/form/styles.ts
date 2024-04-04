import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const formStyles = StyleSheet.create({
	title: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Fredoka-SemiBold",
	},
	errorText: {
		color: "red",
		marginBottom: 10,
	},
	itemContainer: {
		borderRadius: 8,
	},
	textStyle: {
		fontFamily: "Fredoka",
		padding: 8,
	},
	placeholderStyle: {
		fontFamily: "Fredoka",
	},
	dropdown: {
		backgroundColor: Colors.light.primaryWhite,
		padding: 4,
		borderRadius: 8,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.light.primaryLight,
		padding: 20,
		// gap: 20,
		// alignItems: "center",
		// justifyContent: "center",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	label: {
		fontSize: 15,
		fontFamily: "Fredoka-SemiBold",
	},
	input: {
		backgroundColor: "white",
		padding: 12,
		borderRadius: 8,
		height: 50,
		borderWidth: 1,
		borderColor: "transparent",
	},
	inputFocused: {
		borderColor: Colors.light.primary,
	},
	formField: {
		marginBottom: 10,
	},
	button: {
		paddingVertical: 10,
		marginTop: 10,
		fontSize: 15,
		paddingHorizontal: 15,
		backgroundColor: Colors.light.primary,
		borderRadius: 10,
		shadowColor: Colors.light.primaryDark,
		shadowOffset: { width: 0, height: 2 },
	},
});

export default formStyles;
