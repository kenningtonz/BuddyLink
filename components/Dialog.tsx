import React from "react";

import baseStyles from "./styles";
import { Pressable } from "react-native";
import { Modal, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
interface Props {
	children: React.ReactNode;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default React.forwardRef<any, Props>(
	(props, ref): React.ReactElement => {
		const { children, open, setOpen, ...otherProps } = props;
		return (
			<>
				{open ? (
					<View style={baseStyles.centeredView}>
						{" "}
						<Modal
							{...otherProps}
							transparent={true}
							visible={open}
							onRequestClose={() => {
								setOpen(false);
							}}
						>
							<Pressable
								onPressOut={() => setOpen(false)}
								style={baseStyles.modalOverlay}
							/>
							<View style={baseStyles.modal}>
								<FontAwesome
									name='close'
									size={25}
									color={Colors.light.primaryDark}
									style={baseStyles.closeIcon}
									onPress={() => setOpen(false)}
								/>
								{children}
							</View>
						</Modal>{" "}
					</View>
				) : null}
			</>
		);
	}
);
