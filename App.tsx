import React from "react";
import MapView from "react-native-maps";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CarButton from "./components/CarButton";

const App = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.controlsContainer}>
        <CarButton icon="parking" text="I'm parked" />
        <CarButton icon="search" text="I'm looking" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
  },
  controlsContainer: {
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  map: {
    width: "100%",
    flex: 0.75,
  },
});

export default App;
