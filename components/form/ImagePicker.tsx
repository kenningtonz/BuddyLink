import * as ImagePicker from "expo-image-picker";

import { useController, useFormContext, FieldError } from "react-hook-form";
import { Text } from "../Themed";
import useColorScheme from "@/components/useColorScheme";
import { Pressable, View, Image } from "react-native";
import { sharedFormStyles, darkTheme, lightTheme } from "./styles";
import { sharedStyles as baseStyles } from "../styles";

import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

interface Props {
	name: string;
	label?: string;
	error?: FieldError | undefined;
	rules?: any;
	defaultValue?: string;
	style?: any;
}

// https://docs.expo.dev/versions/latest/sdk/imagepicker/#imagepickerresult
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { label, rules, name, error, style, ...imageProps } = props;
		const formContext = useFormContext();
		const { formState } = formContext;
		const { field } = useController({ name, rules });
		// field.value = field.value || imageProps.defaultValue;

		const theme = useColorScheme();
		const themeStyles = theme === "dark" ? darkTheme : lightTheme;

		const pickImage = async () => {
			// No permissions request is necessary for launching the image library
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				field.onChange(result.assets[0].uri);
			}
		};

		return (
			<View style={[sharedFormStyles.formField, style]}>
				<Text style={[sharedFormStyles.label, themeStyles.label]}>{label}</Text>
				<Pressable onPress={pickImage}>
					{!field.value ? (
						<View
							style={[
								{
									width: 100,
									height: 100,
									borderRadius: 50,

									justifyContent: "center",
									alignItems: "center",
								},
								themeStyles.image,
							]}
						>
							<FontAwesome6 name='user' size={50} />
						</View>
					) : (
						<Image source={{ uri: field.value }} style={sharedFormStyles.image} />
					)}
				</Pressable>
				{error && <Text style={[themeStyles.error]}>{error.message}</Text>}
			</View>
		);
	}
);
