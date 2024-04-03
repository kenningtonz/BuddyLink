import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const formStyles = StyleSheet.create({
	title: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
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
	label: {
		fontSize: 15,
		fontWeight: "bold",
		fontFamily: "Fredoka",
	},
	input: {
		backgroundColor: "white",
		padding: 12,
		borderRadius: 8,
		height: 50,
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
	modalOverlay: {
		backgroundColor: "rgba(0,0,0,0.5)",
		position: "absolute",
		width: "100%",
		height: "100%",
	},

	calenderContainer: {
		backgroundColor: Colors.light.primaryWhite,
		margin: 20,
		marginTop: 50,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

export default formStyles;
