import { StyleSheet, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { ThemedText } from "@/components/ThemedText";

export const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.intro}>
      <DrawerToggleButton tintColor={"#000"} />
      <ThemedText type="title">{title}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  intro: {
    width: "100%",
    height: 40,
    padding: 6,
    alignItems: "center",
    flexDirection: "row",
  },
});
