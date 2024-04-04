import ScrollPicker from "react-native-wheel-scrollview-picker";
import { useController, useFormContext, FieldError } from "react-hook-form";
import React, { useState } from "react";
import { View } from "react-native";

import { Text } from "../Themed";
import formStyles from "./styles";

interface Props {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
	data: string[];
	// data: [label: string | number];
}

export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { label, rules, name, error, data, ...dropdownProps } = props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });

		return (
			<View style={formStyles.formField}>
				<Text style={formStyles.label}>{label}</Text>
				<ScrollPicker
					dataSource={data}
					selectedIndex={data.indexOf(field.value)}
					onValueChange={(data, selectedIndex) => {
						field.onChange(data[selectedIndex]);
					}}
					wrapperHeight={25}
					itemHeight={50}
					// highlightColor={"#d8d8d8"}
					// wrapperBackground='#ffffff'
					renderItem={(data, index, isSelected) => {
						return <Text style={formStyles.input}>{data[index]}</Text>;
					}}
				/>

				{error && <Text style={formStyles.errorText}>{error.message}</Text>}
			</View>
		);
	}
);
