import React from "react";
import { StyleSheet, View } from "react-native";

import { Light } from "@/components/wheel/Light";

export const WheelLights = () => {
  return (
    <>
      <View style={[styles.light, { top: 24 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 335 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 74, left: 48 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 74, left: 274 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 180, left: 4 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 180, left: 316 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 278, left: 42 }]}>
        <Light />
      </View>
      <View style={[styles.light, { top: 278, left: 278 }]}>
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
