import { Image, StyleSheet, Text, View } from "react-native";
import Spot from "../models/Spot";
import globalStyles from "../globalStyles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface Props {
  spot: Spot;
}

const SpotCard = ({ spot }: Props) => {
  return (
    <View style={[styles.container, globalStyles.shadow]}>
      <View style={{ flex: spot.image ? 0.5 : 0, height: "100%" }}>
        <Image
          source={{ uri: spot.image }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>
      <View
        style={{
          flex: spot.image ? 0.5 : 1,
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name={"book"}
            size={16}
            style={{ paddingRight: 7 }}
            color="black"
          />
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
            {spot.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name={"car"}
            size={16}
            style={{ paddingRight: 7 }}
            color="black"
          />
          <Text style={{ color: "black" }}>Left {spot.elapsed}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name={"map-pin"}
            size={16}
            style={{ paddingRight: 7 }}
            color="black"
          />
          <Text style={{ color: "black" }}>
            {spot.coordinate.latitude}, {spot.coordinate.longitude}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "75%",
    width: "75%",
    marginLeft: "12.5%",
    marginTop: "5%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
});

export default SpotCard;
