import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const RadioGroup = ({
  options,
  selectedValue,
  onSelect,
  label,
}: {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (val: string) => void;
  label?: string;
}) => {
  return (
    <View style={styles.container}>
      {label && <ThemedText>{label}</ThemedText>}
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={styles.button}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: selectedValue === option.value ? "#6200ea" : "#aaa",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 8,
            }}
          >
            {selectedValue === option.value && <View style={styles.doneIcon} />}
          </View>
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  doneIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6200ea",
  },
});
