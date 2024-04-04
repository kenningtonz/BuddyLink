import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const baseStyles = StyleSheet.create({
	title: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Fredoka-SemiBold",
	},
	text: {
		padding: 8,
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
	modalOverlay: {
		backgroundColor: "rgba(0,0,0,0.5)",
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	modal: {
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

export default baseStyles;
