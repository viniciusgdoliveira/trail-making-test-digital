/** @format */

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Função para definir as posições dos círculos de forma fixa e ajustada
export const defineCirclePositionsTesteA = () => {
	return [
		{ left: width * 0.1, top: height * 0.2 },
		{ left: width * 0.4, top: height * 0.4 },
		{ left: width * 0.7, top: height * 0.3 },
		{ left: width * 0.6, top: height * 0.7 },
		{ left: width * 0.2, top: height * 0.6 },

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

		{ left: width * 0.4, top: height * 0.2 },
		{ left: width * 0.8, top: height * 0.6 },
		{ left: width * 0.2, top: height * 0.5 },
		{ left: width * 0.6, top: height * 0.4 },
		{ left: width * 0.1, top: height * 0.7 },

		{ left: width * 0.7, top: height * 0.1 },
		{ left: width * 0.3, top: height * 0.7 },
		{ left: width * 0.5, top: height * 0.1 },
		{ left: width * 0.2, top: height * 0.3 },
		{ left: width * 0.6, top: height * 0.6 },
	];
};
