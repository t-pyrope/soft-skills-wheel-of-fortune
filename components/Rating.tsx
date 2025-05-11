import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

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
            color={
              index < rating ? Colors.light.rating : Colors.light.lightGray
            }
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
