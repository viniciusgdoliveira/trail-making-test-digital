/** @format */
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface ButtonProps {
	title: string;
	backgroundColor: string;
	trainingKey?: string;
}

const Button: React.FC<ButtonProps> = ({ title, backgroundColor, trainingKey }) => {
	const router = useRouter();

	const handlePress = () => {
		router.push({
			pathname: "/drawningscreen",
			params: { trainingKey },
		});
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={[styles.button, { backgroundColor }]}
		>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		padding: 10,
		width: "45%",
		alignItems: "center",
	},
	buttonText: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
	},
});
