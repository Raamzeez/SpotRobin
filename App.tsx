import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CarButton from "./components/CarButton";
import * as Location from "expo-location";
import dummySpots from "./dummy";
import Spot from "./models/Spot";
import SearchingIndicator from "./components/SearchingIndicator";
import ToastManager, { Toast } from "toastify-react-native";
import SpotCard from "./components/SpotCard";

const App = () => {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [spots, setSpots] = useState<Spot[] | null>(dummySpots);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [parking, setParking] = useState<boolean>(false);
  const [looking, setLooking] = useState<boolean>(false);

  const mapViewRef = useRef<MapView>(null); // Added mapViewRef

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = location.coords;
      setMapRegion({
        longitude,
        latitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (mapRegion) {
    text = JSON.stringify(mapRegion);
  }

  const handleMapPress = (event: any) => {
    if (!event.nativeEvent.action) {
      // Check if the action is a tap on the map
      setSelectedSpot(null);
    }
  };

  const handlePark = () => {
    if (!parking) {
      setLooking(false);
      Toast.success("You are parked!", "top");
    } else {
      Toast.success("Have a good day!", "top");
    }
    setParking(!parking);
  };

  const handleSpotPress = (spot: Spot) => {
    if (mapViewRef.current) {
      setSelectedSpot(spot);
      const { coordinate } = spot;
      mapViewRef.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );
    }
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      {looking && <SearchingIndicator />}
      {mapRegion ? (
        <>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            region={mapRegion}
            showsUserLocation={true}
            zoomControlEnabled={true}
            showsMyLocationButton={true}
            mapType="hybrid"
            onPress={handleMapPress}
          >
            {dummySpots.map((spot) => {
              return (
                <Marker
                  key={spot.id}
                  coordinate={spot.coordinate}
                  title={spot.elapsed}
                  description="Test"
                  onPress={() => handleSpotPress(spot)}
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
        {/* <Text>{text}</Text> */}
        {!selectedSpot ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <CarButton
              icon={!parking ? "parking" : "car"}
              text={!parking ? "I'm parked" : "I'm leaving"}
              onPressHandler={handlePark}
            />
            <CarButton
              icon={!looking ? "search" : "stop"}
              text={!looking ? "I'm looking" : "Stop looking"}
              onPressHandler={() => setLooking(!looking)}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SpotCard spot={selectedSpot} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    flex: 0.25,
    width: "100%",
  },
  map: {
    width: "100%",
    flex: 0.75,
  },
});

export default App;
