import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { Header } from "@/components/Header";
import { CustomSelect } from "@/components/ui/Select";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { DEFINITIONS } from "@/constants/softSkills";
import { Colors } from "@/constants/Colors";
import { i18n } from "@/i18n/config";

export default function ProposeTask() {
  const [taskValue, setTaskValue] = useState("");

  const onSendPress = async () => {
    try {
      const res = await fetch(
        "https://soft-skills.begaiym.dev/.netlify/functions/hello",
      );
      const json = await res.json();

      console.log(json);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <Header title={i18n.t("proposeTask.title")} />
      <CustomSelect
        options={DEFINITIONS.map((definition) => ({
          label: definition.title,
          value: definition.index,
        }))}
      />
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={(text) => setTaskValue(text)}
        value={taskValue}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={onSendPress}>
        <ThemedText>Send</ThemedText>
      </TouchableOpacity>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    position: "static",
    padding: 20,
    paddingBottom: 40,
  },
  textInput: {
    padding: 10,
    borderRadius: 8,
    borderColor: Colors.light.lightGray,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
});
