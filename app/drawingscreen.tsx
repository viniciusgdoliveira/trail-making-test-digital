/** @format */

import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback } from "react-native";
import { Svg, Circle, Path, Text as SvgText } from "react-native-svg";
import { useLocalSearchParams } from "expo-router";
import { defineCirclePositionsTesteA } from "@/components/drawing/bases/TesteA";
import { defineCirclePositionsTesteB } from "@/components/drawing/bases/TesteB";
import { defineCirclePositionsTreinoA } from "@/components/drawing/bases/TreinoA";
import { defineCirclePositionsTreinoB } from "@/components/drawing/bases/TreinoB";

const { height, width } = Dimensions.get("window");
const DISTANCE_THRESHOLD = 5; // Minimum distance between points in pixels

const circlePositionsMap = {
	TreinoA: defineCirclePositionsTreinoA,
	TreinoB: defineCirclePositionsTreinoB,
	TesteA: defineCirclePositionsTesteA,
	TesteB: defineCirclePositionsTesteB,
};

const getCircleContent = (index: number, trainingKey?: string) => {
	if (trainingKey === "TreinoB" || trainingKey === "TesteB") {
		const sequence = [];
		let numCount = 1;
		let letterCount = 1;
		for (let i = 0; i <= index; i++) {
			if (i % 2 === 0) {
				sequence.push(numCount++); // Add the number
			} else {
				sequence.push(String.fromCharCode(64 + letterCount++)); // Add the letter (A=65 in ASCII)
			}
		}
		return sequence[index];
	}
	return index + 1; // For TreinoA and TesteA
};

export const DrawingScreen: React.FC = () => {
	const [paths, setPaths] = useState<string[][]>([]); // Store all paths
	const [currentPath, setCurrentPath] = useState<string[]>([]); // Current path being drawn
	const [totalDrawingTime, setTotalDrawingTime] = useState(0);
	const [isDrawing, setIsDrawing] = useState(false);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [totalLengthDrawn, setTotalLengthDrawn] = useState(0); // New state for total length
	const [currentSequence, setCurrentSequence] = useState<number[]>([]); // Track the user's current sequence
	const [circleColors, setCircleColors] = useState<string[]>([]); // Track circle colors
	const ppi = useRef<number | null>(null);
	const { trainingKey } = useLocalSearchParams() as { trainingKey?: string };
	const [touchedCircles, setTouchedCircles] = useState<number[]>([]);
	const [isSelectingCircle, setIsSelectingCircle] = useState(false);
	// Initialize circle colors
	useEffect(() => {
		const initialColors = Array(circlePositionsMap[trainingKey]?.().length).fill("lightgrey");
		setCircleColors(initialColors);
	}, [trainingKey]);

	// Set up the PPI once
	useEffect(() => {
		const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
		const screenDiagonalPixels = Math.sqrt(screenWidth ** 2 + screenHeight ** 2);
		const SCREEN_DIAGONAL_INCHES = 10.5; // Adjust as needed
		ppi.current = screenDiagonalPixels / SCREEN_DIAGONAL_INCHES;
	}, []);

	// Start drawing
	const onTouchStart = (event: any) => {
		setIsDrawing(true);
		if (!startTime) {
			setStartTime(new Date());
		}

		const locationX = event.nativeEvent.locationX;
		const locationY = event.nativeEvent.locationY;
		const newPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)} `;
		setCurrentPath([newPoint]); // Start a new path
	};

	// End drawing
	const onTouchEnd = () => {
		if (currentPath.length > 0) {
			setPaths((prevPaths) => {
				const newPaths = [...prevPaths, currentPath]; // Store completed path
				updateTotalLength(newPaths); // Update total length
				return newPaths;
			});
			setCurrentPath([]); // Clear current path for next drawing
		}
		setIsDrawing(false);
	};

	// Function to check if a point is near a circle
	const isPointNearCircle = (pointX: number, pointY: number, circleIndex: number) => {
		const { left, top } = circlePositions[circleIndex];
		const centerX = left + 25; // Circle center X
		const centerY = top + 25; // Circle center Y
		const distance = Math.sqrt((pointX - centerX) ** 2 + (pointY - centerY) ** 2);
		return distance <= 25; // Circle radius
	};

	// Handle drawing movements
	const onTouchMove = (event: any) => {
		if (!isDrawing) return;

		const locationX = event.nativeEvent.locationX;
		const locationY = event.nativeEvent.locationY;
		const newPoint = `L${locationX.toFixed(0)},${locationY.toFixed(0)} `;

		if (shouldAddPoint(currentPath, newPoint)) {
			setCurrentPath((prevPath) => [...prevPath, newPoint]);

			// Check for touched circles
			circlePositions.forEach((_, index) => {
				if (isPointNearCircle(locationX, locationY, index) && !touchedCircles.includes(index)) {
					setTouchedCircles((prev) => [...prev, index]); // Add circle index to touchedCircles
				}
			});
		}
	};

	// Determine if the new point should be added based on distance threshold
	const shouldAddPoint = (path: string[], newPoint: string) => {
		if (path.length === 0) return true;

		const lastPoint = path[path.length - 1];
		const [prevX, prevY] = lastPoint.slice(1).split(",").map(Number);
		const [currX, currY] = newPoint.slice(1).split(",").map(Number);
		const distance = Math.sqrt((currX - prevX) ** 2 + (currY - prevY) ** 2);

		return distance > DISTANCE_THRESHOLD;
	};

	// Calculate total length drawn in millimeters
	const updateTotalLength = (newPaths: string[][]) => {
		let totalLength = 0;

		newPaths.forEach((path) => {
			for (let i = 0; i < path.length - 1; i++) {
				const [x1, y1] = path[i].slice(1).split(",").map(Number);
				const [x2, y2] = path[i + 1].slice(1).split(",").map(Number);
				const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
				totalLength += distance;
			}
		});

		// Convert pixels to millimeters
		if (ppi.current) {
			const totalLengthInMM = (totalLength / ppi.current) * 25.4; // Convert to mm
			setTotalLengthDrawn(totalLengthInMM);
		}
	};

	// Update total drawing time
	useEffect(() => {
		if (isDrawing && startTime) {
			const interval = setInterval(() => {
				const currentTime = new Date();
				setTotalDrawingTime(currentTime.getTime() - startTime.getTime());
			}, 100);

			return () => clearInterval(interval); // Clear interval on unmount
		}
	}, [isDrawing, startTime]);

	// Get circle positions for the current training
	const circlePositions = circlePositionsMap[trainingKey || "TreinoA"]?.() || [];

	// Function to handle circle selection

	const handleCircleSelect = (index: number) => {
		const expectedValue = currentSequence.length; // The expected next index

		const newColors = [...circleColors]; // Copy current colors

		// Add the touched circle to the touchedCircles state
		setTouchedCircles((prev) => [...prev, index]);

		// Check if the selection is correct
		if (expectedValue === index) {
			// Correct selection: Mark it light green
			newColors[index] = "lightgreen";

			// Mark the previously selected circle if any
			if (currentSequence.length > 0) {
				newColors[currentSequence[currentSequence.length - 1]] = "lightgreen"; // Keep last correct circle green
			}

			// Update the user's sequence
			setCurrentSequence([...currentSequence, index]);
		} else {
			// Wrong selection: Mark it red
			newColors[index] = "red";

			// Reset the last correct circle to its color
			const lastCorrectIndex = currentSequence.length > 0 ? currentSequence[currentSequence.length - 1] : -1;
			if (lastCorrectIndex !== -1) {
				newColors[lastCorrectIndex] = "lightgreen"; // Ensure the last correct selection remains green
			}
		}

		setCircleColors(newColors); // Update colors state
	};

	return (
		<View style={styles.container}>
			<View style={styles.svgContainer}>
				<Svg
					height={height * 0.9}
					width={width}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					{/* Render circles based on defined positions */}
					{circlePositions.map((position: any, index: number) => (
						<React.Fragment key={`circle-${index}`}>
							<TouchableWithoutFeedback>
								<Circle
									cx={position.left + 25}
									cy={position.top + 25}
									r={25}
									stroke="blue"
									fill={circleColors[index]}
									strokeWidth={2}
									onPressIn={() => handleCircleSelect(index)} // Fires immediately when the user touches the circle
									onPressOut={() => console.log("Released")} // Optional: Fires when the user lifts their finger
								/>
							</TouchableWithoutFeedback>
							<SvgText
								x={position.left + 25}
								y={position.top + 30}
								fontSize={20}
								fill="black"
								textAnchor="middle"
								alignmentBaseline="middle"
							>
								{getCircleContent(index, trainingKey)}
							</SvgText>
						</React.Fragment>
					))}

					{/* Render completed paths */}
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

					{/* Render current path being drawn */}
					{currentPath.length > 0 && (
						<Path
							d={currentPath.join("")}
							stroke={"green"}
							fill={"transparent"}
							strokeWidth={2}
							strokeLinejoin={"round"}
							strokeLinecap={"round"}
						/>
					)}
				</Svg>
			</View>
			<View style={styles.infoContainer}>
				<Text>Total Time: {(totalDrawingTime / 1000).toFixed(2)} seconds</Text>
				<Text>Total Length Drawn: {totalLengthDrawn.toFixed(2)} mm</Text>
				<Text>Touched Circles: {touchedCircles.join(", ")}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	svgContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	infoContainer: {
		padding: 16,
	},
});

export default DrawingScreen;
