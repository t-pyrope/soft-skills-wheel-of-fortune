import { Stack } from "expo-router";

import { i18n } from "@/i18n/config";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: i18n.t("menu.home"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="youWonModal"
        options={{
          title: i18n.t("menu.youWon"),
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
