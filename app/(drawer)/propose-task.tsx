import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Header } from "@/components/Header";
import { CustomSelect } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { DEFINITIONS } from "@/constants/softSkills";
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
        label={i18n.t("proposeTask.skillLabel")}
      />
      <TextArea
        value={taskValue}
        setValue={setTaskValue}
        label={i18n.t("proposeTask.taskDescription")}
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
});
