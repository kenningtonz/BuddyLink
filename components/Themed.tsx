/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
	Text as DefaultText,
	View as DefaultView,
	SafeAreaView,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

// export type PressableProps = ThemeProps & DefaultPressable["props"];
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
	const theme = useColorScheme() ?? "light";
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"primaryText"
	);
	const fontFamily = "Fredoka";
	return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

// export function View(props: ViewProps) {
// 	const { style, lightColor, darkColor, ...otherProps } = props;
// 	const backgroundColor = useThemeColor(
// 		{ light: lightColor, dark: darkColor },
// 		"primaryWhite"
// 	);

// 	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
// }

export function Row(props: ViewProps) {
	const { style, ...otherProps } = props;

	return (
		<DefaultView
			style={[{ flexDirection: "row", alignItems: "center" }, style]}
			{...otherProps}
		/>
	);
}

export function Layout(props: ViewProps) {
	const { style, lightColor, darkColor, children, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"primaryWhite"
	);

	return (
		<SafeAreaView
			style={[{ backgroundColor, flex: 1, height: "100%", width: "100%" }]}
			{...otherProps}
		>
			<DefaultView style={{ height: "100%", width: "100%", padding: 20 }}>
				{children}
			</DefaultView>
		</SafeAreaView>
	);
}
