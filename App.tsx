import React, { useEffect, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CarButton from "./components/CarButton";
import * as Location from "expo-location";
import dummySpots from "./dummy";
import Spot from "./models/Spot";

const App = () => {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [spots, setSpots] = useState<Spot[] | null>(dummySpots);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [parking, setParking] = useState<boolean>(false);
  const [looking, setLooking] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = location.coords;
      console.log(location.coords);
      setMapRegion({
        longitude,
        latitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (mapRegion) {
    text = JSON.stringify(mapRegion);
  }

  return (
    <View style={styles.container}>
      {mapRegion ? (
        <>
          <MapView
            style={styles.map}
            region={mapRegion}
            showsUserLocation={true}
            zoomControlEnabled={true}
          >
            {dummySpots.map((spot) => {
              return (
                <Marker
                  key={spot.id}
                  coordinate={spot.coordinate}
                  title={spot.elapsed}
                  description="Test"
                  onPress={() => setSelectedSpot(spot)}
                />
              );
            })}
          </MapView>
        </>
      ) : (
        <>
          <MapView style={styles.map} />
        </>
      )}
      <View style={styles.controlsContainer}>
        <Text>{text}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <CarButton
            icon={!parking ? "parking" : "car"}
            text={!parking ? "I'm parked" : "I'm leaving"}
            onPressHandler={() => setParking(!parking)}
          />
          <CarButton
            icon={!looking ? "search" : "stop"}
            text={!looking ? "I'm looking" : "Stop looking"}
            onPressHandler={() => setLooking(!looking)}
          />
        </View>
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
  },
  map: {
    width: "100%",
    flex: 0.75,
  },
});

export default App;
