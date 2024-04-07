import * as React from "react";
import {
	View,
	TextInput,
	Pressable,
	TextInputProps,
	useColorScheme,
} from "react-native";
import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import { sharedFormStyles, darkTheme, lightTheme } from "./styles";

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
		const [isFocused, setIsFocused] = React.useState(false);

		const theme = useColorScheme();
		const themeStyles = theme === "dark" ? darkTheme : lightTheme;

		return (
			<View style={[sharedFormStyles.formField]}>
				<Pressable onPress={() => formContext.setFocus(name)}>
					<Text style={[sharedFormStyles.label, themeStyles.label]}>{label}</Text>
				</Pressable>
				<TextInput
					ref={ref}
					onChangeText={field.onChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => {
						setIsFocused(false);
						field.onBlur();
					}}
					value={field.value}
					{...inputProps}
					style={[
						sharedFormStyles.input,
						themeStyles.label,
						isFocused ? themeStyles.inputFocused : {},
					]}
				/>
				{error && <Text style={[themeStyles.error]}>{error.message}</Text>}
			</View>
		);
	}
);
