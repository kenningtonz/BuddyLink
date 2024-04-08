import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const sharedFormStyles = StyleSheet.create({
	title: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Fredoka-SemiBold",
	},
	errorText: {
		marginBottom: 10,
	},
	itemContainer: {
		borderRadius: 8,
	},
	textStyle: {
		fontFamily: "Fredoka",
		// padding: 8,
	},
	placeholderStyle: {
		fontFamily: "Fredoka",
	},
	dropdown: {
		// padding: 4,
		borderRadius: 8,
	},
	container: {
		flex: 1,
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
		fontSize: 16,
		fontFamily: "Fredoka-SemiBold",
	},
	input: {
		fontFamily: "Fredoka",
		padding: 12,
		borderRadius: 8,
		height: 50,

		borderWidth: 1,
		borderColor: "transparent",
	},
	formField: {
		marginBottom: 10,
	},
	button: {
		borderRadius: 8,
		padding: 6,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});

const lightTheme = StyleSheet.create({
	error: {
		color: Colors.light.error,
	},
	dropdown: {
		backgroundColor: Colors.light.primaryContainer,
		shadowColor: Colors.light.primary,
	},
	container: {
		backgroundColor: Colors.light.primaryContainer,
	},
	inputFocused: {
		borderWidth: 2,
		borderColor: Colors.light.primary,
	},
	input: {
		borderColor: Colors.light.primaryContainer,
		color: Colors.light.onBackground,
		backgroundColor: Colors.light.background,
	},
	label: {
		color: Colors.light.primary,
	},
	icon: {
		color: Colors.light.onPrimaryContainer,
	},
	button: {
		backgroundColor: Colors.light.primaryContainer,
	},
});

const darkTheme = StyleSheet.create({
	error: {
		color: Colors.dark.error,
	},
	dropdown: {
		backgroundColor: Colors.dark.primaryContainer,
		shadowColor: Colors.dark.primary,
	},
	container: {
		backgroundColor: Colors.dark.primaryContainer,
	},
	inputFocused: {
		borderWidth: 2,
		borderColor: Colors.dark.primary,
	},
	input: {
		color: Colors.dark.onBackground,
		backgroundColor: Colors.dark.background,
		borderColor: Colors.dark.primaryContainer,
	},
	label: {
		color: Colors.dark.primary,
	},
	icon: {
		color: Colors.dark.onPrimaryContainer,
	},
	button: {
		backgroundColor: Colors.dark.primaryContainer,
	},
});

export { sharedFormStyles, lightTheme, darkTheme };
