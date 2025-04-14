import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { i18n } from "@/i18n/config";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ drawerType: "front" }}>
        <Drawer.Screen
          name={"(stack)"}
          options={{
            headerShown: false,
            title: i18n.t("menu.home"),
          }}
        />

        <Drawer.Screen
          name="definitions"
          options={{
            title: i18n.t("menu.definitions"),
            headerShown: false,
            sceneStyle:
              Platform.OS === "web"
                ? {
                    flexGrow: 1,
                    overflow: "scroll",
                  }
                : {},
          }}
        />
        <Drawer.Screen
          name="opened-tasks"
          options={{
            title: i18n.t("menu.openedTasks"),
            headerShown: false,
            sceneStyle:
              Platform.OS === "web"
                ? {
                    flexGrow: 1,
                    overflow: "scroll",
                  }
                : {},
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
