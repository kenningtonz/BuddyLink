import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import { Pressable, useColorScheme } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useStore, loadFromLocal } from "@/classes/userStore";
import { registerForPushNotificationsAsync } from "@/utils/notifications";
import { Subscription } from "expo-notifications";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(onBoarding)/index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function RootLayout() {
	const router = useRouter();

	const [exists, setExists] = useState(false);
	const [isReady, setIsReady] = useState(false);

	const getUserFromStorage = async () => {
		try {
			console.log(exists);
			if (typeof window !== "undefined") {
				loadFromLocal().then((exists) => {
					setExists(exists);

					setIsReady(true);
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getUserFromDatabase = async () => {
		// try {
		// 	const { data, error, status } = await supabase
		// 		.from("profiles")
		// 		.select(`id, name, email, settings, friends, reminders`)
		// 		.eq("id", session?.user.id)
		// 		.single();
		// 	if (error && status !== 406) {
		// 		throw error;
		// 	}
		// 	if (data) {
		// 		const user = {
		// 			id: data.id,
		// 			email: data.email,
		// 			name: data.name,
		// 			settings: data.settings,
		// 			friends: data.friends,
		// 			reminders: data.reminders,
		// 		};
		// 		setUser(user);
		// 	}
		// } catch (error) {
		// 	if (error instanceof Error) {
		// 		console.error(error.message);
		// 	}
		// } finally {
		// 	setIsReady(true);
		// }
	};

	const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
	const [notification, setNotification] = useState<Notifications.Notification>();
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification: any) => {
				setNotification(notification);
			}
		);

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response: any) => {
				console.log(response);
				const {
					notification: {
						request: {
							content: {
								data: { id },
							},
						},
					},
				} = response;
				if (id) {
					router.push(`/reminder/${id}`);
				}
			});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	const [fontsLoaded, fontError] = useFonts({
		Fredoka: require("@/assets/fonts/Fredoka-Regular.ttf"),
		"Fredoka-Bold": require("@/assets/fonts/Fredoka-Bold.ttf"),
		"Fredoka-Light": require("@/assets/fonts/Fredoka-Light.ttf"),
		"Fredoka-Medium": require("@/assets/fonts/Fredoka-Medium.ttf"),
		"Fredoka-SemiBold": require("@/assets/fonts/Fredoka-SemiBold.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (fontError) throw fontError;
	}, [fontError]);

	useEffect(() => {
		getUserFromStorage();
		console.log(exists);
		if (fontsLoaded && isReady) {
			console.log(exists);
			SplashScreen.hideAsync();
			if (exists) {
				router.push("/(tabs)");
			} else {
				router.push("/(onBoarding)/");
			}
		}
	}, [isReady, fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	// console.log(expoPushToken);
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();
	console.log(colorScheme);

	const router = useRouter();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='(onBoarding)/index' options={{ headerShown: false }} />
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='friends/[id]' options={{}} />
				<Stack.Screen name='reminder/[id]' options={{}} />
				<Stack.Screen
					name='(modals)/newFriend'
					options={{
						presentation: "modal",
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
