/** @format */

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Função para definir as posições dos círculos de forma fixa
const defineCirclePositions = () => {
	return [
		{ left: width * 0.2, top: height * 0.3 }, // Posição 1
		{ left: width * 0.4, top: height * 0.5 }, // Posição 2
		{ left: width * 0.6, top: height * 0.1 }, // Posição 3
		{ left: width * 0.8, top: height * 0.5 }, // Posição 4
		{ left: width * 0.9, top: height * 0.3 }, // Posição 5
	];
};

const TreinoB = () => {
	// Array de posições dos círculos
	const circlePositions = defineCirclePositions();

	// Array de números seguidos das letras correspondentes
	const characters = ["1", "A", "2", "B", "3"];

	return (
		<View style={styles.container}>
			{circlePositions.map((position, index) => (
				<View
					key={index}
					style={[styles.circle, position]}
				>
					<Text style={styles.circleText}>{characters[index]}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute", // Posicionamento absoluto para sobrepor o desenho
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "lightblue",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
	},
	circleText: {
		color: "black",
		fontSize: 16,
	},
});

export default TreinoB;
