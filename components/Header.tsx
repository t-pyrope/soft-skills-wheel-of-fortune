import { StyleSheet, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { ThemedText } from "@/components/ThemedText";

export const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.intro}>
      <DrawerToggleButton tintColor={"#7f4898"} />
      <ThemedText type="title" style={{ color: "#7f4898" }}>
        {title}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  intro: {
    width: "100%",
    padding: 6,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(221,145,145,0.09)",
    borderRadius: 30,
  },
});
