/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useLocalSearchParams } from "expo-router";

const ResultScreen = () => {
	const { totalDrawedTime, touchedCircles, totalLengthDrawn } = useLocalSearchParams();

	// Parse touchedCircles back to an array
	const touchedCirclesArray = JSON.parse(touchedCircles || "[]");

	return (
		<View>
			<Text>Total Drawn Time: {totalDrawedTime} seconds</Text>
			<Text>Touched Circles: {touchedCirclesArray.join(", ")}</Text>
			<Text>Total Length: {totalLengthDrawn} mm</Text>
		</View>
	);
};

export default ResultScreen;

const styles = StyleSheet.create({});
