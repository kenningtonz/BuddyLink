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
import useColorScheme from "@/components/useColorScheme";

// export type PressableProps = ThemeProps & DefaultPressable["props"];
export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
	const { style, ...otherProps } = props;
	const color =
		useColorScheme() === "dark"
			? Colors.dark.onBackground
			: Colors.light.onBackground;
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
	const { style, children, ...otherProps } = props;
	const backgroundColor =
		useColorScheme() === "dark"
			? Colors.dark.background
			: Colors.light.background;

	return (
		<SafeAreaView
			style={[{ backgroundColor, flex: 1, height: "100%", width: "100%" }]}
			{...otherProps}
		>
			<DefaultView style={[{ height: "100%", width: "100%", padding: 20 }, style]}>
				{children}
			</DefaultView>
		</SafeAreaView>
	);
}
