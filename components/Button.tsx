import React from "react";
import { Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useThemeColor } from "./Themed";

interface Props {
	onPress?: () => void;
	text: string;
}
export const Button = React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { onPress, text, ...otherProps } = props;
		const backgroundColor = useThemeColor({}, "primary");
		const shadowColor = useThemeColor({}, "primaryDark");
		const textColor = useThemeColor({}, "primaryText");

		return (
			<Pressable
				ref={ref}
				// style={({ pressed }) => ({
				// 	transform: [{ translateY: pressed ? 2 : 0 }],
				// 	backgroundColor,
				// 	shadowColor,
				// 	},
				// 	...styles.button,
				// })}
				// style={this.state.pressed ? styles.buttonPressed : styles.button}
				// style={[styles.button, { shadowColor: shadowColor }]}
				onPress={onPress}
				{...otherProps}
			>
				<Text
					style={[
						styles.button,
						{
							color: textColor,
							backgroundColor: backgroundColor,
							shadowColor: shadowColor,
						},
					]}
				>
					{text}
				</Text>
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
// 				shadowOffset: { width: 0, height: pressed ? 0 : 2 },
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
		paddingHorizontal: 15,
		borderRadius: 10,
		fontWeight: "bold",
		fontFamily: "Fredoka",
	},
});
