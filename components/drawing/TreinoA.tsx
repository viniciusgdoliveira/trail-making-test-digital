/** @format */

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Função para definir as posições dos círculos de forma fixa
export const defineCirclePositionsTreinoA = () => {
	return [
		{ left: width * 0.13, top: height * 0.38 }, // Ajuste as posições conforme necessário
		{ left: width * 0.54, top: height * 0.59 },
		{ left: width * 0.81, top: height * 0.32 },
		{ left: width * 0.7, top: height * 0.4 },
		{ left: width * 0.8, top: height * 0.6 },

		// Adicione mais posições conforme necessário
	];
};
