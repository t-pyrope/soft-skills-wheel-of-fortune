import { Formik } from "formik";
import { StyleSheet, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Header } from "@/components/Header";
import { CustomSelect } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { DEFINITIONS } from "@/constants/softSkills";
import { i18n } from "@/i18n/config";

interface FormikValues {
  skill: number;
  task: string;
}

export default function ProposeTask() {
  const onSendPress = async (values: FormikValues) => {
    try {
      const res = await fetch(
        "https://soft-skills.begaiym.dev/.netlify/functions/sendTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
      // const json = await res.json();
      const text = await res.text();

      console.log(text);
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values: FormikValues) => {
    const errors: { skill?: string; task?: string } = {};

    if (!Number.isFinite(values.skill)) {
      errors.skill = "Required";
    } else if (!values.task) {
      errors.task = "Required";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ skill: 1, task: "" }}
      onSubmit={onSendPress}
      validate={validate}
    >
      {({ handleSubmit, values, setFieldValue, errors }) => (
        <ThemedSafeAreaView style={styles.container}>
          <Header title={i18n.t("proposeTask.title")} />
          <CustomSelect
            options={DEFINITIONS.map((definition) => ({
              label: definition.title,
              value: definition.index,
            }))}
            label={i18n.t("proposeTask.skillLabel")}
            value={values.skill}
            onSelect={(val) => setFieldValue("skill", val)}
          />
          <TextArea
            value={values.task}
            setValue={(val) => setFieldValue("task", val)}
            label={i18n.t("proposeTask.taskDescription")}
            error={errors.task}
          />

          <View style={{ width: 200 }}>
            <Button onPress={handleSubmit} disabled={false} text="Send" />
          </View>
        </ThemedSafeAreaView>
      )}
    </Formik>
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
