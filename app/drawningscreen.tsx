/** @format */

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useRouter, useLocalSearchParams } from "expo-router"; // Use expo-router for routing
import TreinoA from "@/components/drawning/TreinoA";
import TesteA from "@/components/drawning/TesteA";
import TesteB from "@/components/drawning/TesteB";
import TreinoB from "@/components/drawning/TreinoB";

const { height, width } = Dimensions.get("window");
const MM_PER_INCH = 25.4;

interface DrawingScreenProps {}

// Map your components here for dynamic loading
const trainingComponents: { [key: string]: React.ComponentType } = {
	TreinoA: () => <TreinoA />, // Replace with actual components
	TreinoB: () => <TreinoB />, // Replace with actual components
	TesteA: () => <TesteA />, // Replace with actual components
	TesteB: () => <TesteB />, // Replace with actual components
};

export const DrawingScreen: React.FC<DrawingScreenProps> = () => {
	const [paths, setPaths] = useState<string[][]>([]);
	const [currentPath, setCurrentPath] = useState<string[]>([]);
	const [isClearButtonClicked, setClearButtonClicked] = useState(false);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [ppi, setPpi] = useState<number | null>(null);
	const [totalPathLengthMM, setTotalPathLengthMM] = useState(0);
	const [elapsedTime, setElapsedTime] = useState(0); // State to hold elapsed time
	const router = useRouter();
	const { trainingKey } = useLocalSearchParams(); // Get trainingKey from route params

	const TrainingComponent = trainingComponents[trainingKey as string]; // Find the corresponding component

	useEffect(() => {
		const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
		const screenDiagonalPixels = Math.sqrt(screenWidth ** 2 + screenHeight ** 2);
		const SCREEN_DIAGONAL_INCHES = 10.5;
		const ppi = screenDiagonalPixels / SCREEN_DIAGONAL_INCHES;

		setPpi(ppi);
	}, []);

	const onTouchStart = () => {
		if (!startTime) {
			setStartTime(new Date());
		}
	};

	const onTouchEnd = () => {
		const endTime = new Date();
		const touchDuration = endTime.getTime() - (startTime ? startTime.getTime() : 0);
		setElapsedTime((prevElapsedTime) => prevElapsedTime + touchDuration);
		setPaths((prevPaths) => [...prevPaths, currentPath]);
		const pathLengthMM = convertPathToMillimeters(currentPath);
		setTotalPathLengthMM((prevTotal) => prevTotal + pathLengthMM);
		setCurrentPath([]);
		setClearButtonClicked(false);
		setStartTime(null);
	};

	const onTouchMove = (event: any) => {
		const locationX = event.nativeEvent.locationX;
		const locationY = event.nativeEvent.locationY;
		const newPoint = `${currentPath.length === 0 ? "M" : "L"}${locationX.toFixed(0)},${locationY.toFixed(0)} `;
		setCurrentPath((prevPath) => [...prevPath, newPoint]);
	};

	const handleClearButtonClick = () => {
		setPaths([]);
		setCurrentPath([]);
		setClearButtonClicked(true);
		setStartTime(null);
		setElapsedTime(0);
		setTotalPathLengthMM(0);
	};

	const handleVoltarButtonClick = () => {
		router.back(); // Use router.back() to navigate back
	};

	const convertPathToMillimeters = (path: string[]) => {
		if (!ppi) return 0;
		const PIXEL_TO_MM_CONVERSION_FACTOR = MM_PER_INCH / ppi;
		let totalLength = 0;

		for (let i = 1; i < path.length; i++) {
			const [prevX, prevY] = path[i - 1].slice(1).split(",").map(Number);
			const [currX, currY] = path[i].slice(1).split(",").map(Number);
			const deltaX = currX - prevX;
			const deltaY = currY - prevY;
			const segmentLength = Math.sqrt(deltaX ** 2 + deltaY ** 2);
			totalLength += segmentLength;
		}

		return totalLength * PIXEL_TO_MM_CONVERSION_FACTOR;
	};

	return (
		<View style={styles.container}>
			<View style={styles.svgContainer}>
				<View>{TrainingComponent ? <TrainingComponent /> : <Text>No Training Component Found</Text>}</View>
				<View
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					<Svg
						height={height * 0.9}
						width={width}
					>
						<Path
							key={`current-path`}
							d={currentPath.join("")}
							stroke={"red"}
							fill={"transparent"}
							strokeWidth={2}
							strokeLinejoin={"round"}
							strokeLinecap={"round"}
						/>
						{paths.map((item, index) => (
							<Path
								key={`path-${index}`}
								d={item.join("")}
								stroke={"red"}
								fill={"transparent"}
								strokeWidth={2}
								strokeLinejoin={"round"}
								strokeLinecap={"round"}
							/>
						))}
					</Svg>
				</View>
			</View>
			{/* <View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.button, styles.voltarButton]}
					onPress={handleVoltarButtonClick}
				>
					<Text style={styles.buttonText}>Voltar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.clearButton]}
					onPress={handleClearButtonClick}
				>
					<Text style={styles.buttonText}>Clear</Text>
				</TouchableOpacity>
			</View> */}
			<View style={styles.infoContainer}>
				<Text style={styles.infoText}>Tempo total: {elapsedTime} milisegundos</Text>
				<Text style={styles.infoText}>Distância total em milímetros: {totalPathLengthMM.toFixed(2)} mm</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	svgContainer: {
		height: height * 0.9,
		width,
		borderColor: "black",
		backgroundColor: "white",
		borderWidth: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 10,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		width: "30%",
	},
	clearButton: {
		backgroundColor: "black",
	},
	voltarButton: {
		backgroundColor: "green",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	infoContainer: {
		flexDirection: "row",
		justifyContent: "space-between", // Spacing between the two texts
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 10,
	},
	infoText: {
		fontSize: 16,
		fontWeight: "500",
	},
});

export default DrawingScreen;
