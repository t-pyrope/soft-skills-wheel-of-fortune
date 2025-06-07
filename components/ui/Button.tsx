import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const Button = ({
  onPress,
  disabled,
  text,
}: {
  onPress: () => void;
  disabled: boolean;
  text: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled ? styles.disabledButton : undefined]}
      disabled={disabled}
    >
      <ThemedText style={styles.buttonText} type="defaultSemiBold">
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    paddingInline: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    flexDirection: "row",
    backgroundColor: Colors.light.app,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.light.white,
    fontWeight: 500,
  },
});
