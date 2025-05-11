import { StyleSheet, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.intro}>
      <DrawerToggleButton tintColor={Colors.light.app} />
      <ThemedText type="title" style={{ color: Colors.light.app }}>
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
    backgroundColor: Colors.light.headerBg,
    borderRadius: 30,
  },
});
