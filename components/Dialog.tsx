import React from "react";
import useColorScheme from "@/components/useColorScheme";
import { sharedStyles as baseStyles } from "./styles";
import { Pressable, StyleSheet } from "react-native";
import { Modal, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
interface Props {
	children: React.ReactNode;
	open: boolean;
	style?: any;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const theme = useColorScheme();
		const themeStyles = theme === "dark" ? darkTheme : lightTheme;
		const { children, open, setOpen, style, ...otherProps } = props;
		return (
			<>
				{open ? (
					<Modal
						{...otherProps}
						transparent={true}
						visible={open}
						onRequestClose={() => {
							setOpen(false);
						}}
					>
						<Pressable
							onPressOut={() => setOpen(false)}
							style={sharedStyles.modalOverlay}
						/>
						<View style={[sharedStyles.modal, themeStyles.modal, style]}>
							<FontAwesome
								name='close'
								size={25}
								color={theme === "dark" ? Colors.dark.primary : Colors.light.primary}
								style={baseStyles.closeIcon}
								onPress={() => setOpen(false)}
							/>
							{children}
						</View>
					</Modal>
				) : null}
			</>
		);
	}
);

const sharedStyles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		margin: 20,
		marginTop: "40%",
		borderRadius: 20,
		padding: 35,
		minHeight: 350,
		alignItems: "center",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalOverlay: {
		backgroundColor: "rgba(0,0,0,0.5)",
		position: "absolute",
		width: "100%",
		height: "100%",
	},
});

const lightTheme = StyleSheet.create({
	modal: {
		backgroundColor: Colors.light.primaryTint,
		shadowColor: Colors.light.primary,
	},
});

const darkTheme = StyleSheet.create({
	modal: {
		backgroundColor: Colors.dark.primaryTint,
		shadowColor: Colors.dark.primary,
	},
});
