import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import { sharedFormStyles, darkTheme, lightTheme } from "./styles";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import useColorScheme from "@/components/useColorScheme";
interface Props {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
	customStyle?: any;
	data: {
		label: string;
		value: any;
		icon?: keyof typeof FontAwesome.glyphMap;
	}[];
}

// https://www.npmjs.com/package/react-native-element-dropdown
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { label, rules, name, error, data, customStyle, ...dropdownProps } =
			props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });
		const [isFocused, setIsFocused] = React.useState(false);

		const theme = useColorScheme();
		const themeStyles = theme === "dark" ? darkTheme : lightTheme;

		const getSelectedIcon = (value: any) => {
			const item = data.find((item) => item.value == value);
			return item ? item.icon : "chevron-down";
		};

		return (
			<View style={sharedFormStyles.formField}>
				<Text style={[sharedFormStyles.label, themeStyles.label]}>{label}</Text>
				<Dropdown
					containerStyle={sharedFormStyles.dropdown}
					placeholderStyle={sharedFormStyles.placeholderStyle}
					selectedTextStyle={sharedFormStyles.textStyle}
					itemContainerStyle={sharedFormStyles.itemContainer}
					activeColor={
						theme == "light"
							? Colors.light.primaryContainer
							: Colors.dark.primaryContainer
					}
					itemTextStyle={sharedFormStyles.textStyle}
					accessibilityLabel={`Select a ${label}`}
					placeholder={`Select a ${label}`}
					labelField='label'
					valueField='value'
					data={data}
					renderRightIcon={() => {
						if (data[0].icon) {
							return (
								<FontAwesome
									name={getSelectedIcon(field.value)}
									size={20}
									color={theme === "dark" ? Colors.dark.primary : Colors.light.primary}
								/>
							);
						} else {
							<FontAwesome
								name={"chevron-down"}
								size={20}
								color={theme === "dark" ? Colors.dark.primary : Colors.light.primary}
							/>;
						}
					}}
					onChange={(item) => {
						field.onChange(item.value);
						console.log(item.value);
					}}
					onFocus={() => setIsFocused(true)}
					value={field.value}
					onBlur={() => {
						field.onBlur();
						setIsFocused(false);
					}}
					style={[
						[sharedFormStyles.input, themeStyles.input],
						isFocused ? themeStyles.inputFocused : {},
						customStyle ?? {},
					]}
					{...dropdownProps}
				/>
				{error && <Text style={[themeStyles.error]}>{error.message}</Text>}
			</View>
		);
	}
);
