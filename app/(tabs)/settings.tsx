import { Text, Layout } from "@/components/Themed";
import { Link } from "expo-router";
import baseStyles from "@/components/styles";

export default function Settings() {
	return (
		<Layout>
			<Text style={baseStyles.title}>Settings</Text>
			<Link href={"/(modals)/login"}>Login</Link>
		</Layout>
	);
}
