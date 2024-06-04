import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.controlsContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcyan",
  },
  controlsContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    flex: 0.7,
  },
});
