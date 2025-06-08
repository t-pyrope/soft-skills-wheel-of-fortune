import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const List = ({ items }: { items: Array<string | ReactNode> }) => {
  return (
    <View style={styles.listContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bulletPoint}>•</Text>
          {typeof item === "string" ? (
            <ThemedText style={styles.itemText}>{item}</ThemedText>
          ) : (
            item
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 8,
    lineHeight: 22,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
});
