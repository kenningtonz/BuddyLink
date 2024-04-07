import React from "react";
import {
	Text,
	StyleSheet,
	Pressable,
	PressableProps,
	useColorScheme,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export enum ButtonVariants {
	Primary = "primary",
	Secondary = "secondary",
	Danger = "danger",
	Ghost = "Ghost",
}

interface Props extends PressableProps {
	onPress?: () => void;
	text?: string;
	variant?: ButtonVariants;
	icon?: keyof typeof FontAwesome6.glyphMap;
}

export const Button = React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { onPress, text, icon, variant, ...otherProps } = props;

		const theme = useColorScheme();
		const themeStyles = theme === "dark" ? darkTheme : lightTheme;

		const buttonStyle = () => {
			switch (variant) {
				case ButtonVariants.Primary:
					return [sharedStyles.button, themeStyles.primary];
				case ButtonVariants.Secondary:
					return [sharedStyles.button, themeStyles.secondary];
				case ButtonVariants.Danger:
					return [sharedStyles.danger, themeStyles.error];

				case ButtonVariants.Ghost:
					return [sharedStyles.ghost, themeStyles.ghost];
				default:
					return sharedStyles.button;
			}
		};

		return (
			<Pressable ref={ref} onPress={onPress} {...otherProps}>
				{({ pressed }) => (
					<>
						{text ? (
							<Text
								style={[
									buttonStyle(),
									sharedStyles.text,
									{
										transform: [{ translateY: pressed ? 2 : 0 }],
									},
								]}
							>
								{text}
							</Text>
						) : null}
						{icon ? (
							<FontAwesome6
								name={icon}
								style={[
									buttonStyle(),
									sharedStyles.icon,
									{ transform: [{ translateY: pressed ? 2 : 0 }] },
								]}
							/>
						) : null}
					</>
				)}
			</Pressable>
		);
	}
);

const sharedStyles = StyleSheet.create({
	button: {
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowColor: Colors.light.primary,
		elevation: 2,
		textAlign: "center",
		borderRadius: 10,
		fontFamily: "Fredoka-SemiBold",
	},
	text: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		fontSize: 18,
	},
	icon: {
		padding: 10,
		fontSize: 22,
	},
	danger: {
		paddingVertical: 10,
		fontSize: 12,
		paddingHorizontal: 15,
		textAlign: "center",
		fontFamily: "Fredoka",
	},
	ghost: {
		paddingVertical: 10,
		fontSize: 15,
		paddingHorizontal: 15,
		textAlign: "center",
		fontFamily: "Fredoka",
		backgroundColor: "transparent",
	},
});

const lightTheme = StyleSheet.create({
	primary: {
		backgroundColor: Colors.light.primaryContainer,
		shadowColor: Colors.light.primary,
		color: Colors.light.onPrimaryContainer,
	},
	secondary: {
		backgroundColor: Colors.light.secondaryContainer,
		shadowColor: Colors.light.secondary,
		color: Colors.light.onSecondaryContainer,
	},
	error: {
		color: Colors.light.onErrorContainer,
	},
	ghost: {
		color: Colors.light.onPrimaryContainer,
	},
});

const darkTheme = StyleSheet.create({
	primary: {
		backgroundColor: Colors.dark.primaryContainer,
		shadowColor: Colors.dark.primary,
		color: Colors.dark.onPrimaryContainer,
	},
	secondary: {
		backgroundColor: Colors.dark.secondaryContainer,
		shadowColor: Colors.dark.secondary,
		color: Colors.dark.onSecondaryContainer,
	},
	error: {
		color: Colors.dark.onErrorContainer,
	},
	ghost: {
		color: Colors.dark.onPrimaryContainer,
	},
});
