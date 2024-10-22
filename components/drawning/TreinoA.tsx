/** @format */

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Função para definir as posições dos círculos de forma fixa
const defineCirclePositions = () => {
	return [
		{ left: width * 0.13, top: height * 0.38 }, // Ajuste as posições conforme necessário
		{ left: width * 0.54, top: height * 0.59 },
		{ left: width * 0.81, top: height * 0.32 },
		{ left: width * 0.7, top: height * 0.4 },
		{ left: width * 0.8, top: height * 0.6 },

		// Adicione mais posições conforme necessário
	];
};

const TreinoA = () => {
	// Array de posições dos círculos
	const circlePositions = defineCirclePositions();

	return (
		<View style={styles.container}>
			{circlePositions.map((position, index) => (
				<TouchableOpacity
					key={index}
					style={[styles.circle, position]}
				>
					<Text style={styles.circleText}>{index + 1}</Text>
				</TouchableOpacity>
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

export default TreinoA;
