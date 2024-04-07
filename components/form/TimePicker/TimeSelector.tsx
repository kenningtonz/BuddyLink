import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";

import Selector from "@/components/form/TimePicker/Selector";
import { time } from "@/classes/time";

const TimeSelector: React.FC<{
	containerStyle?: any;
	textStyle?: any;
	buttonStyle?: any;
	iconStyle: any;
	value: time;
	onChange: (value: time) => void;
}> = ({
	containerStyle,
	textStyle,
	onChange,
	buttonStyle,
	iconStyle,
	value,
}) => {
	const [hour, setHour] = useState(value.hour);
	const [minute, setMinute] = useState(value.minute);
	// const [isAM, setIsAM] = useState(value.hour < 12);
	const isAM = value.hour < 12 || value.hour === 24;
	// console.log(value.hour < 12);
	console.log("hour", hour, "minute", minute, "isAM", isAM);

	const onChangeHour = (newValue: number) => {
		setHour(newValue);
		onChange({ hour: isAM ? newValue : newValue + 12, minute });
	};

	const onChangeMinute = (newValue: number) => {
		setMinute(newValue);
		onChange({ hour, minute: newValue });
	};

	// const handleChangeMinute = useCallback((newValue: number) => {
	// 	setMinute(newValue);
	// 	console.log("minute", newValue);
	// 	onChange({ hour: hour, minute: newValue });
	// }, []);

	return (
		<View style={[sharedStyles.timePickerContainer, containerStyle]}>
			<Selector
				value={hour}
				max={12}
				isVertical={true}
				min={1}
				buttonStyle={buttonStyle}
				iconStyle={iconStyle}
				textStyle={{
					...sharedStyles.timePickerText,
					...textStyle,
				}}
				setValue={onChangeHour}
			/>

			<Text
				style={{
					...sharedStyles.timePickerText,
					...textStyle,
				}}
			>
				:
			</Text>

			<Selector
				value={minute}
				isVertical={true}
				buttonStyle={buttonStyle}
				iconStyle={iconStyle}
				max={59}
				min={0}
				textStyle={{
					...sharedStyles.timePickerText,
					...textStyle,
				}}
				setValue={onChangeMinute}
			/>
			<Text
				style={{
					...sharedStyles.timePickerText,
					...textStyle,
				}}
			>
				{isAM ? "AM" : "PM"}
			</Text>
		</View>
	);
};

const sharedStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	wheelContainer: {
		flex: 1,
	},
	timePickerContainer: {
		gap: 8,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	timePickerText: {
		fontWeight: "bold",
	},
});

export default TimeSelector;
