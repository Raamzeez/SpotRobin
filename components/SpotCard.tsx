import { StyleSheet, Text, View } from "react-native";
import Spot from "../models/Spot";
import globalStyles from "../globalStyles";

interface Props {
  spot: Spot;
}

const SpotCard = ({ spot }: Props) => {
  return (
    <View style={[styles.container, globalStyles.shadow]}>
      <Text>{spot.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "75%",
    width: "75%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
});

export default SpotCard;
