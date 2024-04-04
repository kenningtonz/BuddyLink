import DateTimePicker from "react-native-ui-datepicker";
import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import dayjs from "dayjs";
import Dialog from "../Dialog";

import { Pressable, View, Modal } from "react-native";
import formStyles from "./styles";
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

		return (
			<>
				<View style={formStyles.formField}>
					<Text style={formStyles.label}>{label}</Text>
					<Pressable onPress={() => setOpen(!open)}>
						<Text style={formStyles.input}>
							{field.value
								? dayjs(field.value).format("DD MMMM, YYYY")
								: "Select Date"}
						</Text>
					</Pressable>

					{error && <Text style={formStyles.errorText}>{error.message}</Text>}
				</View>
				{open ? (
					<Dialog open={open} setOpen={setOpen}>
						<DateTimePicker
							mode='single'
							calendarTextStyle={{ fontFamily: "Fredoka" }}
							selectedItemColor={Colors.light.primary}
							maxDate={new Date()}
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
