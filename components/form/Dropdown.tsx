import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import formStyles from "./styles";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

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

		const getSelectedIcon = (value: any) => {
			const item = data.find((item) => item.value == value);
			return item ? item.icon : "chevron-down";
		};

		return (
			<View style={formStyles.formField}>
				<Text style={formStyles.label}>{label}</Text>
				<Dropdown
					containerStyle={formStyles.dropdown}
					placeholderStyle={formStyles.placeholderStyle}
					selectedTextStyle={formStyles.textStyle}
					itemContainerStyle={formStyles.itemContainer}
					activeColor={Colors.light.primary}
					itemTextStyle={formStyles.textStyle}
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
									color={Colors.light.primary}
								/>
							);
						} else {
							<FontAwesome
								name={"chevron-down"}
								size={20}
								color={Colors.light.primary}
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
						formStyles.input,
						isFocused ? formStyles.inputFocused : {},
						customStyle ?? {},
					]}
					{...dropdownProps}
				/>
				{error && <Text style={formStyles.errorText}>{error.message}</Text>}
			</View>
		);
	}
);
