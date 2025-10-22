import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
      
    <View style={styles.container}>
      <Text style={styles.heading}>Edit app/index.tsx to edit this screen.</Text>
      <Text style={styles.helloWorldText}>Hello World!</Text>
      
      <Link href={"/about"}>About</Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lavender"
  },
  heading: {
    color: "blue",
  },
  helloWorldText: {
    fontFamily: "Courier New",
    fontWeight: "bold"
  }
});