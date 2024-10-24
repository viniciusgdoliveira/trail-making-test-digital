/** @format */

import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ title: "Pagina Inicial", headerShown: false }} // Change to your desired title
			/>
			<Stack.Screen
				name="drawingscreen"
				options={{ title: "Trail Making Test" }} // Capitalized title
			/>
			<Stack.Screen
				name="resultscreen"
				options={{ title: "Resultados" }} // Capitalized title
			/>
		</Stack>
	);
}
