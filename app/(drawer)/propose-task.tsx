import { Formik } from "formik";
import { StyleSheet, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Header } from "@/components/Header";
import { CustomSelect } from "@/components/ui/Select";
import { TextField } from "@/components/ui/TextField";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { DEFINITIONS } from "@/constants/softSkills";
import { i18n } from "@/i18n/config";
import {isEmail} from "@/utils";

interface FormikValues {
  skill: number;
  task: string;
  email: string;
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
      const json = await res.json();

      console.log(json);
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values: FormikValues) => {
    const errors: { skill?: string; task?: string; email?: string } = {};

    if (!Number.isFinite(values.skill)) {
      errors.skill = i18n.t("proposeTask.errors.required");
    }

    if (!values.task) {
      errors.task = i18n.t("proposeTask.errors.required");
    }

    if (!values.email) {
      errors.email = i18n.t("proposeTask.errors.required");
    } else if (!isEmail(values.email)) {
      errors.email = i18n.t("proposeTask.errors.notEmail");
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ skill: 1, task: "", email: "" }}
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
          <TextField
            value={values.task}
            setValue={(val) => setFieldValue("task", val)}
            label={i18n.t("proposeTask.taskDescription")}
            error={errors.task}
            multiline
          />

          <TextField
            value={values.email}
            setValue={(val) => setFieldValue("email", val)}
            label={i18n.t("proposeTask.email")}
            error={errors.email}
          />

          <View style={{ width: 200 }}>
            <Button
              onPress={handleSubmit}
              disabled={false}
              text={i18n.t("proposeTask.send")}
            />
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
