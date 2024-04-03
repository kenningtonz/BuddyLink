import * as ImagePicker from "expo-image-picker";

import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";

import { Pressable, View } from "react-native";
import formStyles from "./styles";
import React, { useState } from "react";

interface Props {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
}

// https://docs.expo.dev/versions/latest/sdk/imagepicker/#imagepickerresult
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { label, rules, name, error, ...imageProps } = props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });

		const pickImage = async () => {
			// No permissions request is necessary for launching the image library
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			console.log(result);

			if (!result.canceled) {
				field.value = result.assets[0].uri;
			}
		};

		return (
			<>
				<View style={formStyles.formField}>
					<Text style={formStyles.label}>{label}</Text>
					<Pressable onPress={pickImage}>
						<Text style={formStyles.input}>
							{field.value ? field.value.toString() : "Select Image"}
						</Text>
					</Pressable>
					{error && <Text style={formStyles.errorText}>{error.message}</Text>}
				</View>
			</>
		);
	}
);
