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
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { Platform, Pressable, useColorScheme } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useStore, loadFromLocal, saveToLocal } from "@/classes/userStore";
import { registerForPushNotificationsAsync } from "@/utils/notifications";
import { Subscription } from "expo-notifications";
import { checkReminders } from "@/classes/reminder";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(onBoarding)/home",
};

//https://docs.expo.dev/versions/latest/sdk/background-fetch/#configuration
const BACKGROUND_REMINDER = "background-reminder";
// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_REMINDER, async () => {
	const now = Date.now();
	const friendsList = useStore((state) => state.friends);
	const futureReminders = useStore((state) => state.remindersFuture);
	const addReminder = useStore((state) => state.addReminder);
	const moveReminder = useStore((state) => state.moveReminder);
	const user = useStore((state) => state.user);
	const editFriend = useStore((state) => state.editFriend);
	if (futureReminders.length > 0) {
		checkReminders(
			futureReminders,
			user.settings.reminderTime,
			addReminder,
			moveReminder,
			user.settings.pushNotifications,
			friendsList,
			editFriend
		);
		saveToLocal();
	}
	console.log(
		`Got background fetch call at date: ${new Date(now).toISOString()}`
	);

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function registerBackgroundFetchAsync() {
	return BackgroundFetch.registerTaskAsync(BACKGROUND_REMINDER, {
		minimumInterval: 60 * 1, // 15 minutes
		stopOnTerminate: false, // android only,
		startOnBoot: true, // android only
	});
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function unregisterBackgroundFetchAsync() {
	return BackgroundFetch.unregisterTaskAsync(BACKGROUND_REMINDER);
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default function RootLayout() {
	const router = useRouter();

	const [exists, setExists] = useState(false);
	const [isReady, setIsReady] = useState(false);

	const getUserFromStorage = async () => {
		try {
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
	const [isRegistered, setIsRegistered] = useState(false);
	const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus>();

	const checkStatusAsync = async () => {
		const status = await BackgroundFetch.getStatusAsync();
		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			BACKGROUND_REMINDER
		);
		if (status != null) setStatus(status);
		setIsRegistered(isRegistered);
		console.log(status, isRegistered);
	};

	useEffect(() => {
		if (Platform.OS === "web") return;
		checkStatusAsync();
		// unregisterBackgroundFetchAsync();

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
			SplashScreen.hideAsync();
			if (exists) {
				router.replace("/(tabs)");
			} else {
				router.replace("/(onBoarding)/home");
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

	const router = useRouter();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='(onBoarding)/home' options={{ headerShown: false }} />
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
