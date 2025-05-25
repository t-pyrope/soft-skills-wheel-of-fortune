import { AntDesign } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { i18n } from "@/i18n/config";
import { Colors } from "@/constants/Colors";

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const routes = props.state.routes.filter(
    (route) => route.name !== "propose-task",
  );

  return (
    <ThemedSafeAreaView>
      <DrawerContentScrollView {...props}>
        <View style={{ gap: 20 }}>
          <ThemedView style={styles.profileContainer}>
            <ThemedView style={styles.avatar}>
              <AntDesign name="smileo" size={24} color="black" />
            </ThemedView>
            <ThemedText>User4512</ThemedText>
          </ThemedView>
          <ThemedView style={styles.buttonsContainer}>
            {routes.map((route, i) => {
              const options = props.descriptors[route.key].options;

              return (
                <TouchableOpacity key={route.key}>
                  <DrawerItem
                    style={{ borderRadius: 0 }}
                    inactiveTintColor={Colors.light.drawerItemHovered}
                    label={
                      options.title
                        ? () => (
                            <View style={styles.drawerItem}>
                              <ThemedText>{options.title}</ThemedText>
                              <MaterialIcons
                                name="arrow-forward-ios"
                                size={16}
                                color="black"
                              />
                            </View>
                          )
                        : ""
                    }
                    onPress={() => props.navigation.navigate(route.name)}
                  />
                </TouchableOpacity>
              );
            })}
          </ThemedView>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity
              style={styles.proposeButton}
              onPress={() => props.navigation.navigate("propose-task")}
            >
              <ThemedText style={{ color: Colors.light.white }}>
                {i18n.t("menu.proposeTask")}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    gap: 12,
  },
  avatar: {
    borderColor: Colors.light.lightGray,
    borderWidth: 2,
    borderRadius: 24,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  proposeButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    flexDirection: "row",
    backgroundColor: Colors.light.app,
    color: "white",
  },
});
