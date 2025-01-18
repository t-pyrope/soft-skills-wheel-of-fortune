import { StyleSheet, Text, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";

export const Header = () => {
  return (
    <View style={styles.intro}>
      <DrawerToggleButton tintColor={"#000"} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "white",
    marginLeft: 14,
  },
  intro: {
    width: "100%",
    height: 90,
    padding: 6,
    justifyContent: "space-between",
  },
});
