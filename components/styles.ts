import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	text: {
		fontFamily: "Fredoka",
		padding: 8,
	},
	container: {
		flex: 1,

		alignItems: "center",
		justifyContent: "center",
	},
	list: {
		padding: 20,

		width: "100%",
	},
	item: {
		backgroundColor: Colors.light.primaryLight,
		borderRadius: 8,
		marginVertical: 10,
		padding: 20,
	},
	button: {
		paddingVertical: 10,
		fontSize: 15,
		paddingHorizontal: 15,
		backgroundColor: Colors.light.primary,
		borderRadius: 10,
		shadowColor: Colors.light.primaryDark,
		shadowOffset: { width: 0, height: 2 },
	},
	buttonDown: {
		transform: [{ translateY: 2 }],
		paddingVertical: 10,
		fontSize: 15,
		paddingHorizontal: 15,
		backgroundColor: Colors.light.primary,
		borderRadius: 10,
	},
	buttonText: {
		color: Colors.light.primaryText,
		fontWeight: "bold",
		fontFamily: "Fredoka",
	},

	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

export default styles;
