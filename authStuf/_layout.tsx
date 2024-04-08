import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				title: "Auth",
			}}
		>
			<Stack.Screen name='onBoarding' options={{ headerShown: false }} />
			<Stack.Screen name='login' options={{ title: "Log in" }} />
			<Stack.Screen name='logup' options={{ title: "Log up" }} />
		</Stack>
	);
}
