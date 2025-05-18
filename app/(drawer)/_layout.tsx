import { Drawer } from "expo-router/drawer";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { i18n } from "@/i18n/config";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ drawerType: "front" }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
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
