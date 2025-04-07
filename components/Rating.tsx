import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (newRating: number) => void;
}) => {
  const handlePress = (index: number) => {
    setRating(index + 1);
  };

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(index)}>
          <FontAwesome
            name={index < rating ? "star" : "star-o"}
            size={30}
            color={index < rating ? "#FFD700" : "#ccc"}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  star: {
    marginHorizontal: 5,
  },
});
