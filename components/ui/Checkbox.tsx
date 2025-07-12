import { Checkbox as ExpoCheckbox } from "expo-checkbox";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";

export const Checkbox = ({
  isChecked,
  setIsChecked,
  label,
}: {
  isChecked: boolean;
  setIsChecked: (val: boolean) => void;
  label: ReactNode;
}) => {
  return (
    <View style={styles.section}>
      <ExpoCheckbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? Colors.light.app : undefined}
      />
      <Text style={styles.paragraph}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
