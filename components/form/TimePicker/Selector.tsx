import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
interface SelectorProps {
	isVertical: boolean;
	value: number;
	buttonStyle: any;
	iconStyle: any;
	textStyle: any;
	max: number;
	min: number;
	setValue: (value: number) => void;
}

const Selector: React.FC<SelectorProps> = ({
	isVertical,
	value,
	buttonStyle,
	textStyle,
	setValue,
	max,
	min,
	iconStyle,
}) => {
	if (value > max) {
		value = min;
	}
	if (value < min) {
		value = max;
	}

	return (
		<View style={isVertical ? styles.vertical : styles.horizontal}>
			<Pressable
				style={buttonStyle}
				onPress={() => setValue(value - 1 < min ? max : value - 1)}
			>
				<FontAwesome style={iconStyle} name='minus' size={24} color='black' />
			</Pressable>

			<Text style={textStyle}>{value < 10 ? `0${value}` : value}</Text>

			<Pressable
				style={buttonStyle}
				onPress={() => setValue(value + 1 > max ? min : value + 1)}
			>
				<FontAwesome style={iconStyle} name='plus' size={24} color='black' />
			</Pressable>
		</View>
	);
};

export default Selector;

const styles = StyleSheet.create({
	vertical: {
		flexDirection: "column",
		alignItems: "center",
	},
	horizontal: {
		flexDirection: "row",
		alignItems: "center",
	},
});
