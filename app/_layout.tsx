import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { Pressable, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Fredoka: require("@/assets/fonts/Fredoka-Regular.ttf"),
		"Fredoka-Bold": require("@/assets/fonts/Fredoka-Bold.ttf"),
		"Fredoka-Light": require("@/assets/fonts/Fredoka-Light.ttf"),
		"Fredoka-Medium": require("@/assets/fonts/Fredoka-Medium.ttf"),
		"Fredoka-SemiBold": require("@/assets/fonts/Fredoka-SemiBold.ttf"),

		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();
	const router = useRouter();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='modal' options={{ presentation: "modal" }} />
				<Stack.Screen name='friends/[id]' options={{}} />
				<Stack.Screen
					name='(modals)/login'
					options={{
						presentation: "modal",
						title: "Log in",
						headerTitleStyle: { fontFamily: "Fredoka" },
						headerLeft: () => (
							<Pressable onPress={() => router.back()}>
								<FontAwesome name='close' size={25} />
							</Pressable>
						),
					}}
				/>
				<Stack.Screen
					name='(modals)/newFriend'
					options={{
						presentation: "modal",
						title: "Add New Friend",
						headerTitleStyle: { fontFamily: "Fredoka" },
						headerLeft: () => (
							<Pressable onPress={() => router.back()}>
								<FontAwesome name='close' size={25} />
							</Pressable>
						),
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
