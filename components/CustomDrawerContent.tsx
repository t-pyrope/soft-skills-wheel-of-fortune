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
import { Colors } from "@/constants/Colors";

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <ThemedSafeAreaView>
      <DrawerContentScrollView {...props}>
        <ThemedView style={styles.profileContainer}>
          <ThemedView style={styles.avatar}>
            <AntDesign name="smileo" size={24} color="black" />
          </ThemedView>
          <ThemedText>User4512</ThemedText>
        </ThemedView>
        <ThemedView style={styles.buttonsContainer}>
          {props.state.routes.map((route, i) => {
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
    marginTop: 20,
    overflow: "hidden",
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
