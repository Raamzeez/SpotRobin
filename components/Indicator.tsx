import { StyleSheet, Text, View } from "react-native";

const SearchingIndicator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Searching...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "8%",
    padding: 16,
    minWidth: "50%",
    borderRadius: 10,
    zIndex: 1,
  },
  text: {
    fontWeight: "medium",
    fontSize: 18,
    color: "white",
  },
});

export default SearchingIndicator;
