import { StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const TextField = ({
  label,
  value,
  setValue,
  maxLength = 300,
  error,
  multiline = false,
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  maxLength?: number;
  multiline?: boolean;
  error?: string;
}) => {
  return (
    <View>
      <ThemedText>{label}:</ThemedText>
      <TextInput
        editable
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        maxLength={maxLength}
        onChangeText={(text) => setValue(text)}
        value={value}
        style={[styles.textInput, error ? styles.textInputError : undefined]}
      />
      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
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
  textInputError: {
    borderColor: Colors.light.error,
  },
  errorText: {
    color: Colors.light.error,
  },
});
