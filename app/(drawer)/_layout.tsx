import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { i18n } from "@/i18n/config";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{}}>
        <Drawer.Screen
          name={"index"}
          options={{
            title: i18n.t("menu.home"),
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="definitions"
          options={{
            title: i18n.t("menu.definitions"),
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
