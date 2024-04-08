import { useColorScheme } from "react-native";

import { useStore } from "@/classes/userStore";

// but can be achieved using a styling library like Nativewind.
export default () => {
	const user = useStore((state) => state.user);
	if (user.settings) {
		const theme = useStore((state) => state.user.settings.theme);
		if (theme) {
			return theme;
		}
	}
	const colorScheme = useColorScheme();
	if (colorScheme) {
		return colorScheme;
	}
	return "light";
};
