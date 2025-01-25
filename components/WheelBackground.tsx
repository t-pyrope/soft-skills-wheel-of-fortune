import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import React from "react";

export const WheelBackground = () => {
  return (
    <View style={styles.container}>
      <Svg width={338} height={338}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0" stopColor={`#b278e1`} />
            <Stop offset="1" stopColor={`#8445e2`} />
          </LinearGradient>
        </Defs>
        <Circle
          stroke={`url(#gradient)`}
          strokeWidth={20}
          r={155}
          fill="none"
          cx={170}
          cy={170}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
