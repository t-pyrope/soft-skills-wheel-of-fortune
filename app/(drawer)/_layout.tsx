import { Drawer } from "expo-router/drawer";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { i18n } from "@/i18n/config";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerType: "front",
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name={"(stack)"}
          options={{
            title: i18n.t("menu.home"),
          }}
        />

        <Drawer.Screen
          name="definitions"
          options={{
            title: i18n.t("menu.definitions"),
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
          name="privacy-policy"
          options={{
            title: i18n.t("menu.privacyPolicy"),
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
          name="terms-and-conditions"
          options={{
            title: i18n.t("menu.termsAndConditions"),
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
          name="propose-task"
          options={{
            title: i18n.t("menu.proposeTask"),
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
