import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{}}>
        <Drawer.Screen
          name={"index"}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="definitions"
          options={{
            title: "Definitions",
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
