import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Android shadow
  },
});

export default globalStyles;
