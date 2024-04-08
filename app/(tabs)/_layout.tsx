import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import useColorScheme from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome6>["name"];
	color: string;
}) {
	return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor:
					colorScheme === "light" ? Colors.light.secondary : Colors.dark.secondary,
				tabBarInactiveTintColor:
					colorScheme === "light"
						? Colors.light.secondaryContainer
						: Colors.dark.secondaryContainer,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				headerTitleAlign: "center",
				headerStyle: {
					backgroundColor:
						colorScheme === "light"
							? Colors.light.background
							: Colors.dark.background,
					borderWidth: 0,
				},
				headerTintColor:
					colorScheme === "light" ? Colors.light.secondary : Colors.dark.secondary,
				headerTitleStyle: {
					fontSize: 20,
					fontFamily: "Fredoka-Medium",
				},

				tabBarStyle: {
					height: 70,
					borderWidth: 0,
					backgroundColor:
						colorScheme === "light"
							? Colors.light.background
							: Colors.dark.background,
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: "Welcome",
					tabBarIcon: ({ color }) => <TabBarIcon name='users' color={color} />,
					tabBarLabel: "Home",

					tabBarShowLabel: false,
					// headerLeft: () => (
					// 	<Link href='/(onBoarding)/onBoarding' asChild>
					// 		<Pressable>
					// 			{({ pressed }) => (
					// 				<FontAwesome6
					// 					name='bell'
					// 					size={25}
					// 					color={Colors[colorScheme ?? "light"].primaryText}
					// 					style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
					// 				/>
					// 			)}
					// 		</Pressable>
					// 	</Link>
					// ),
				}}
			/>
			<Tabs.Screen
				name='reminders'
				options={{
					title: "Reminders",
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <TabBarIcon name='bell' color={color} />,
				}}
			/>

			<Tabs.Screen
				name='settings'
				options={{
					title: "Settings",
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <TabBarIcon name='gear' color={color} />,
				}}
			/>
		</Tabs>
	);
}
