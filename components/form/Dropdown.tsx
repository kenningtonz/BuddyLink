import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import formStyles from "./styles";
import Colors from "@/constants/Colors";

interface Props {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
	data: any;
}

// https://www.npmjs.com/package/react-native-element-dropdown
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { label, rules, name, error, data, ...dropdownProps } = props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });

		return (
			<View style={formStyles.formField}>
				<Text style={formStyles.label}>{label}</Text>
				<Dropdown
					labelField='label'
					containerStyle={formStyles.dropdown}
					placeholderStyle={formStyles.placeholderStyle}
					selectedTextStyle={formStyles.textStyle}
					itemContainerStyle={formStyles.itemContainer}
					activeColor={Colors.light.primary}
					itemTextStyle={formStyles.textStyle}
					placeholder={`Select a ${label}`}
					valueField='value'
					accessibilityLabel={`Select a ${label}`}
					data={data}
					onChange={(item) => {
						field.onChange(item.value);
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
