import {
	Animated,
	PanResponder,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle,
	Platform,
} from "react-native";
import React, { memo, useMemo, useRef } from "react";

const FACTORIAL_3 = 3 * 2;
const FACTORIAL_5 = 5 * 4 * FACTORIAL_3;
const FACTORIAL_7 = 7 * 6 * FACTORIAL_5;

function sin(animated: Animated.Animated) {
	const normalized = normalize(animated);
	const square = Animated.multiply(normalized, normalized);
	const pow3 = Animated.multiply(normalized, square);
	const pow5 = Animated.multiply(pow3, square);
	const pow7 = Animated.multiply(pow5, square);

	return Animated.add(
		Animated.add(normalized, Animated.multiply(pow3, -1 / FACTORIAL_3)),
		Animated.add(
			Animated.multiply(pow5, 1 / FACTORIAL_5),
			Animated.multiply(pow7, -1 / FACTORIAL_7)
		)
	);
}

function normalize(animated: Animated.Animated): Animated.Animated {
	return Animated.add(
		Animated.modulo(Animated.add(animated, Math.PI), Math.PI * 2),
		-Math.PI
	).interpolate({
		inputRange: [-Math.PI, -Math.PI / 2, Math.PI / 2, Math.PI],
		outputRange: [0, -Math.PI / 2, Math.PI / 2, 0],
	});
}

export interface WheelStyleProps {
	containerStyle?: ViewStyle;
	itemHeight?: number;
	selectedColor?: string;
	disabledColor?: string;
	textStyle?: TextStyle;
	wheelHeight?: number;
	displayCount?: number;
}

export interface WheelProps extends WheelStyleProps {
	value: number;
	setValue?: (value: number) => void;
	items: number[];
}

const WheelForm = ({
	value,
	setValue = () => {},
	items,
	containerStyle,
	textStyle,
	itemHeight,
	selectedColor = "black",
	disabledColor = "gray",
	wheelHeight,
	displayCount = 5,
}: WheelProps) => {
	const translateY = useRef(new Animated.Value(0)).current;
	const renderCount =
		displayCount * 2 < items.length ? displayCount * 8 : displayCount * 2 - 1;
	const circular = items.length >= displayCount;
	const height =
		typeof containerStyle?.height === "number" ? containerStyle.height : 130;
	const radius = wheelHeight != null ? wheelHeight / 2 : height / 2;

	const valueIndex = useMemo(() => items.indexOf(value), [items, value]);

	const panResponder = useMemo(() => {
		return PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
			onPanResponderGrant: () => {
				translateY.setValue(0);
			},
			onPanResponderMove: (evt, gestureState) => {
				translateY.setValue(gestureState.dy);
				evt.stopPropagation();
			},
			onPanResponderRelease: (_, gestureState) => {
				translateY.extractOffset();
				let newValueIndex =
					valueIndex - Math.round(gestureState.dy / ((radius * 2) / displayCount));
				if (circular) {
					newValueIndex = (newValueIndex + items.length) % items.length;
				} else {
					if (newValueIndex < 0) {
						newValueIndex = 0;
					} else if (newValueIndex >= items.length) {
						newValueIndex = items.length - 1;
					}
				}
				const newValue = items[newValueIndex] || 0;
				if (newValue === value) {
					translateY.setOffset(0);
					translateY.setValue(0);
				} else {
					setValue(newValue);
				}
			},
		});
	}, [
		circular,
		displayCount,
		radius,
		setValue,
		value,
		valueIndex,
		items,
		translateY,
	]);

	const displayValues = useMemo(() => {
		const centerIndex = Math.floor(renderCount / 2);

		return Array.from({ length: renderCount }, (_, index) => {
			let targetIndex = valueIndex + index - centerIndex;
			if (targetIndex < 0 || targetIndex >= items.length) {
				if (!circular) {
					return 0;
				}
				targetIndex = (targetIndex + items.length) % items.length;
			}
			return items[targetIndex] || 0;
		});
	}, [renderCount, valueIndex, items, circular]);

	const animatedAngles = useMemo(() => {
		//translateY.setValue(0);
		translateY.setOffset(0);
		const currentIndex = displayValues.indexOf(value);
		return displayValues && displayValues.length > 0
			? displayValues.map((_, index) =>
					translateY
						.interpolate({
							inputRange: [-radius, radius],
							outputRange: [
								-radius + ((radius * 2) / displayCount) * (index - currentIndex),
								radius + ((radius * 2) / displayCount) * (index - currentIndex),
							],
							extrapolate: "extend",
						})
						.interpolate({
							inputRange: [-radius, radius],
							outputRange: [-Math.PI / 2, Math.PI / 2],
							extrapolate: "clamp",
						})
			  )
			: [];
	}, [displayValues, radius, value, displayCount, translateY]);

	return (
		<View
			style={[styles.container, containerStyle]}
			{...panResponder.panHandlers}
		>
			{displayValues?.map((displayValue, index) => {
				const animatedAngle = animatedAngles[index];
				return (
					<Animated.Text
						key={`${displayValue}-${index}`}
						style={[
							textStyle,
							// eslint-disable-next-line react-native/no-inline-styles
							{
								position: "absolute",
								height: itemHeight,
								transform: animatedAngle
									? [
											{
												translateY: Animated.multiply(radius, sin(animatedAngle)),
											},
											{
												rotateX: animatedAngle.interpolate({
													inputRange: [-Math.PI / 2, Math.PI / 2],
													outputRange: ["-89deg", "89deg"],
													extrapolate: "clamp",
												}),
											},
									  ]
									: [],
								color: displayValue === value ? selectedColor : disabledColor,
							},
						]}
					>
						{typeof displayValue === "number" && displayValue < 10
							? `0${displayValue}`
							: `${displayValue}`}
					</Animated.Text>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		minWidth: 30,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		height: 100 / 2,
		...Platform.select({
			web: {
				cursor: "pointer",
				userSelect: "none",
			},
		}),
	},
	contentContainer: {
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default memo(WheelForm, (prevProps, nextProps) => {
	return (
		prevProps.value === nextProps.value &&
		prevProps.setValue === nextProps.setValue
	);
});
