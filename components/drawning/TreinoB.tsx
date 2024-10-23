/** @format */

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Função para definir as posições dos círculos de forma fixa
export const defineCirclePositionsTreinoB = () => {
	return [
		{ left: width * 0.2, top: height * 0.3 }, // Posição 1
		{ left: width * 0.4, top: height * 0.5 }, // Posição 2
		{ left: width * 0.6, top: height * 0.1 }, // Posição 3
		{ left: width * 0.8, top: height * 0.5 }, // Posição 4
		{ left: width * 0.9, top: height * 0.3 }, // Posição 5
	];
};
