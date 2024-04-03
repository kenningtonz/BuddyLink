import * as React from "react";
import {
	View,
	TextInput,
	Pressable,
	StyleSheet,
	ViewStyle,
	TextStyle,
	TextInputProps,
} from "react-native";
import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import formStyles from "./styles";

interface Props extends TextInputProps {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
}

export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { style, label, rules, name, error, ...inputProps } = props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });

		return (
			<View style={formStyles.formField}>
				<Pressable onPress={() => formContext.setFocus(name)}>
					<Text style={formStyles.label}>{label}</Text>
				</Pressable>
				<TextInput
					ref={ref}
					onChangeText={field.onChange}
					onBlur={field.onBlur}
					value={field.value}
					{...inputProps}
					style={formStyles.input}
				/>
				{error && <Text style={formStyles.errorText}>{error.message}</Text>}
			</View>
		);
	}
);
