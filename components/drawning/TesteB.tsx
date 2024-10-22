/** @format */

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Função para definir as posições dos círculos de forma fixa e ajustada
const defineCirclePositions = () => {
	return [
		{ left: width * 0.7, top: height * 0.1 },
		{ left: width * 0.3, top: height * 0.7 },
		{ left: width * 0.5, top: height * 0.1 },
		{ left: width * 0.2, top: height * 0.3 },
		{ left: width * 0.6, top: height * 0.6 },

		{ left: width * 0.3, top: height * 0.3 },
		{ left: width * 0.5, top: height * 0.5 },
		{ left: width * 0.8, top: height * 0.2 },
		{ left: width * 0.2, top: height * 0.8 },
		{ left: width * 0.6, top: height * 0.2 },

		{ left: width * 0.4, top: height * 0.6 },
		{ left: width * 0.1, top: height * 0.4 },
		{ left: width * 0.7, top: height * 0.5 },
		{ left: width * 0.3, top: height * 0.1 },
		{ left: width * 0.5, top: height * 0.8 },

		{ left: width * 0.1, top: height * 0.2 },
		{ left: width * 0.4, top: height * 0.4 },
		{ left: width * 0.7, top: height * 0.3 },
		{ left: width * 0.6, top: height * 0.7 },
		{ left: width * 0.2, top: height * 0.6 },

		{ left: width * 0.4, top: height * 0.2 },
		{ left: width * 0.8, top: height * 0.6 },
		{ left: width * 0.2, top: height * 0.5 },
		{ left: width * 0.6, top: height * 0.4 },
		{ left: width * 0.1, top: height * 0.7 },
	];
};

const TesteB = () => {
	// Array de posições dos círculos
	const circlePositions = defineCirclePositions();

	// Array de letras correspondentes aos números de 1 a 13
	const letters = "ABCDEFGHIJKLM".split("");

	return (
		<View style={styles.container}>
			{circlePositions.map((position, index) => (
				<TouchableOpacity
					key={index}
					style={[styles.circle, position]}
				>
					<Text style={styles.circleText}>{index < 13 ? index + 1 : letters[index - 13]}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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

export default TesteB;
