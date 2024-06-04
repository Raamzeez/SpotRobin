import { StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyles from "../globalStyles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface Props {
  icon: string;
  text: string;
}

const CarButton = ({ icon, text }: Props) => {
  return (
    <TouchableOpacity style={[styles.container, globalStyles.shadow]}>
      <FontAwesome5 name={icon} size={25} color="white" />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 120,
    borderRadius: 10,
    backgroundColor: "#425af5",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    color: "white",
    fontWeight: "semibold",
  },
});

export default CarButton;
