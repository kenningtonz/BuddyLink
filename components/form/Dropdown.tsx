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
	data: {
		label: string;
		value: any;
		icon?: keyof typeof FontAwesome.glyphMap;
	}[];
}

// https://www.npmjs.com/package/react-native-element-dropdown
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { label, rules, name, error, data, ...dropdownProps } = props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });

		const getSelectedIcon = (value: any) => {
			const item = data.find((item) => item.value == value);
			return item ? item.icon : "question";
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
					renderRightIcon={() => (
						<FontAwesome
							name={getSelectedIcon(field.value)}
							size={20}
							color={Colors.light.primary}
						/>
					)}
					onChange={(item) => {
						field.onChange(item.value);
						console.log(item.value);
					}}
					value={field.value}
					onBlur={field.onBlur}
					style={[formStyles.input]}
					{...dropdownProps}
				/>
				{error && <Text style={formStyles.errorText}>{error.message}</Text>}
			</View>
		);
	}
);
