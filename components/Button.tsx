import React from "react";
import { Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useThemeColor } from "./Themed";

export enum ButtonVariants {
	Primary = "primary",
	Secondary = "secondary",
	Danger = "danger",
	Link = "link",
}

interface Props extends PressableProps {
	onPress?: () => void;
	text: string;
	variant?: ButtonVariants;
}

export const Button = React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { onPress, text, variant, ...otherProps } = props;

		const bgPrimary = useThemeColor({}, "primary");
		const sPrimary = useThemeColor({}, "primaryDark");
		const textPrimary = useThemeColor({}, "primaryText");

		const bgSecondary = useThemeColor({}, "secondary");
		const sSecondary = useThemeColor({}, "secondaryDark");
		const textSecondary = useThemeColor({}, "secondaryText");
		const textError = useThemeColor({}, "error");

		const buttonStyle = () => {
			switch (variant) {
				case ButtonVariants.Primary:
					return [
						styles.button,
						{ backgroundColor: bgPrimary, shadowColor: sPrimary, color: textPrimary },
					];
				case ButtonVariants.Secondary:
					return [
						styles.button,
						{
							backgroundColor: bgSecondary,
							shadowColor: sSecondary,
							color: textSecondary,
						},
					];
				case ButtonVariants.Danger:
					return [styles.danger, { color: textError }];
				default:
					return styles.button;
			}
		};

		return (
			<Pressable ref={ref} onPress={onPress} {...otherProps}>
				{({ pressed }) => (
					<Text
						style={[
							buttonStyle(),
							{
								transform: [{ translateY: pressed ? 2 : 0 }],
							},
						]}
					>
						{text}
					</Text>
				)}
			</Pressable>
		);
	}
);

// export default function ButtonIcon(
// 	props: PressableProps,
// 	icon: keyof typeof FontAwesome.glyphMap,
// ) {
// 	const { onPress, ...otherProps } = props;
// 	const backgroundColor = useThemeColor({}, "primary");
// 	const shadowColor = useThemeColor({}, "primaryDark");
// 	const textColor = useThemeColor({}, "primaryText");
// 	return (
// 		<Pressable
// 			style={({ pressed }) => ({
// 				transform: [{ translateY: pressed ? 2 : 0 }],
// 				backgroundColor,
// 				shadowColor,
//
// 				...styles.button,
// 			})}
// 			onPress={onPress}
// 			{...otherProps}
// 		>

// 		<FontAwesome name={icon} size={24} color={textColor} />
// 		</Pressable>
// 	);
// }

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		fontSize: 15,
		shadowOffset: { width: 0, height: 2 },
		paddingHorizontal: 15,
		textAlign: "center",
		borderRadius: 10,
		fontFamily: "Fredoka-SemiBold",
	},

	danger: {
		paddingVertical: 10,
		fontSize: 15,
		paddingHorizontal: 15,
		textAlign: "center",
		fontFamily: "Fredoka",
	},
});
