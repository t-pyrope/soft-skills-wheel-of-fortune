import { Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { Button } from "@/components/ui/Button";
import { Header } from "@/components/Header";
import { CustomSelect } from "@/components/ui/Select";
import { TextField } from "@/components/ui/TextField";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { DEFINITIONS } from "@/constants/softSkills";
import { i18n } from "@/i18n/config";
import { isEmail } from "@/utils";
import { Checkbox } from "@/components/ui/Checkbox";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

interface FormikValues {
  skill: number;
  task: string;
  email: string;
}

export default function ProposeTask() {
  const [isAgree, setIsAgree] = useState(false);
  const onSendPress = async (
    values: FormikValues,
    { resetForm }: FormikHelpers<FormikValues>,
  ) => {
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
      Toast.show({
        type: "success",
        text1: "Task sent successfully",
        position: "bottom",
      });
      resetForm();
    } catch (e) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        position: "bottom",
      });
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

          <Checkbox
            isChecked={isAgree}
            setIsChecked={setIsAgree}
            label={
              <>
                <Text>{i18n.t("proposeTask.agreeWith")} </Text>
                <Link href="/privacy-policy">
                  <ThemedText type="link">
                    {i18n.t("proposeTask.privacyPolicy")}
                  </ThemedText>
                </Link>{" "}
                <Text>{i18n.t("proposeTask.and")}</Text>{" "}
                <Link href="/terms-and-conditions">
                  <ThemedText type="link">
                    {i18n.t("proposeTask.termsAndConditions")}
                  </ThemedText>
                </Link>
              </>
            }
          />

          <View style={{ width: 200 }}>
            <Button
              onPress={handleSubmit}
              disabled={!isAgree}
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
