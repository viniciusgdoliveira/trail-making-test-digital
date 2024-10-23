/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

const Index: React.FC = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Seja bem vindo ao Trail Making Test Digital</Text>
				<Text style={styles.subtitle}>desenvolvido por UpperMinds</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Treino A"
					backgroundColor="red"
					trainingKey="TreinoA"
				/>

				<Button
					title="Treino B"
					backgroundColor="#FE81FE"
					trainingKey="TreinoB"
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Teste A"
					backgroundColor="#FFFF67"
					trainingKey="TesteA"
				/>
				<Button
					title="Teste B"
					backgroundColor="#68F3F3"
					trainingKey="TesteB"
				/>
			</View>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	header: {
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 30,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 20,
		marginTop: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 50,
		justifyContent: "space-between",
		width: "100%",
	},
});
