import DateTimePicker from "react-native-ui-datepicker";
import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import dayjs from "dayjs";
import Dialog from "../Dialog";
import useColorScheme from "../useColorScheme";
import { Pressable, View } from "react-native";
import { sharedFormStyles, darkTheme, lightTheme } from "./styles";

import React, { useState } from "react";

import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
}

// https://github.com/farhoudshapouran/react-native-ui-datepicker/
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const [open, setOpen] = useState(false);
		const { label, rules, name, error, ...dropdownProps } = props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });

		const theme = useColorScheme();
		const themeStyles = theme === "dark" ? darkTheme : lightTheme;

		return (
			<>
				<View style={[sharedFormStyles.formField]}>
					<Text style={[sharedFormStyles.label, themeStyles.label]}>{label}</Text>
					<Pressable onPress={() => setOpen(!open)}>
						<Text style={[sharedFormStyles.input, themeStyles.input]}>
							{field.value
								? dayjs(field.value).format("DD MMMM, YYYY")
								: "Select Date"}
						</Text>
					</Pressable>

					{error && <Text style={[themeStyles.error]}>{error.message}</Text>}
				</View>
				{open ? (
					<Dialog open={open} setOpen={setOpen}>
						<DateTimePicker
							mode='single'
							calendarTextStyle={{ fontFamily: "Fredoka" }}
							selectedItemColor={Colors.light.primary}
							headerTextStyle={{ fontFamily: "Fredoka" }}
							weekDaysTextStyle={{ fontFamily: "Fredoka" }}
							maxDate={new Date(new Date().getTime() + 1000 * 60 * 60)}
							onChange={(params) => {
								field.onChange(params.date);
								console.log(new Date(params.date as string));
								setOpen(false);
							}}
							date={field.value}
							{...dropdownProps}
						/>
					</Dialog>
				) : null}
			</>
		);
	}
);
