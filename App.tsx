import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CarButton from "./components/CarButton";
import * as Location from "expo-location";
import dummySpots from "./dummy";
import Spot from "./models/Spot";
import Indicator from "./components/Indicator";
import ToastManager, { Toast } from "toastify-react-native";
import SpotCard from "./components/SpotCard";
import Carousel from "react-native-reanimated-carousel";

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
      {looking && <Indicator />}
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
                  description={spot.name}
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
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: "0%",
          width: "100%",
          height: Dimensions.get("screen").height / 4,
          // backgroundColor: "azure",
        }}
      >
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
            {spots && (
              <Carousel
                loop
                width={400}
                data={spots}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => handleSpotPress(spots[index])}
                renderItem={({ item, index }) => (
                  <SpotCard spot={item} key={index} />
                )}
              />
            )}
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
    flex: 1,
    width: "100%",
    backgroundColor: "blue",
  },
  map: {
    width: "100%",
    flex: 1,
  },
});

export default App;
