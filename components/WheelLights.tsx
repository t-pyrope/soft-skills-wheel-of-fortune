import { StyleSheet, View } from "react-native";
import { Light } from "@/components/Light";
import React from "react";

export const WheelLights = () => {
  return (
    <>
      <View style={[styles.light, { top: 20 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 338 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 72, left: 46 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 72, left: 276 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 180, left: 2 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 180, left: 318 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 280, left: 40 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 280, left: 280 }]}>
        <Light />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  light: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: "absolute",
  },
});
