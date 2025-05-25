import { StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const TextArea = ({
  label,
  value,
  setValue,
  maxLength = 300,
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  maxLength?: number;
}) => {
  return (
    <View>
      <ThemedText>{label}:</ThemedText>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={maxLength}
        onChangeText={(text) => setValue(text)}
        value={value}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
  },
  textInput: {
    padding: 10,
    borderRadius: 8,
    borderColor: Colors.light.lightGray,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
});
