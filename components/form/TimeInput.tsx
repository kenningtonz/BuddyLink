import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";

import TimeSelector from "./TimePicker/TimeSelector";
import { time } from "@/classes/time";
import { StyleSheet } from "react-native";
import { Pressable, View, useColorScheme } from "react-native";
import { sharedFormStyles, darkTheme, lightTheme } from "./styles";

import React, { useState } from "react";

interface Props {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
	buttonStyle?: any;
	iconStyle?: any;
	textStyle?: any;
}

// https://github.com/farhoudshapouran/react-native-ui-datepicker/
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { label, rules, name, error, buttonStyle, iconStyle, textStyle } =
			props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });
		const theme = useColorScheme();
		const themeStyles = theme === "dark" ? darkTheme : lightTheme;

		return (
			<>
				<View style={[sharedFormStyles.formField]}>
					<Text style={[sharedFormStyles.label, themeStyles.label]}>{label}</Text>

					{error && <Text style={[themeStyles.error]}>{error.message}</Text>}
				</View>
				<TimeSelector
					// containerStyle={themeStyles.container}
					buttonStyle={[sharedFormStyles.button, themeStyles.button, buttonStyle]}
					iconStyle={[themeStyles.icon, iconStyle]}
					textStyle={textStyle}
					value={field.value}
					onChange={(params) => {
						console.log("params", params);
						field.onChange(params);
					}}
				/>
			</>
		);
	}
);
