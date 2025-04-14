import { StyleSheet, View } from "react-native";
import Svg, { Defs, G, Path, RadialGradient, Stop } from "react-native-svg";
import React from "react";

export const PrizePointer = () => {
  return (
    <View style={styles.wheelPointer}>
      <Svg
        height="300"
        width="300"
        viewBox="0 0 100 100"
        style={styles.wheelPointerSvg}
      >
        <Defs>
          <RadialGradient id="prizePointerGradient">
            <Stop offset="0" stopColor={`#fbf6cb`} />
            <Stop offset="1" stopColor={`#fad9a8`} />
          </RadialGradient>
        </Defs>
        <G rotation="0" origin="50, 50">
          <Path
            d={`
                M 50 50
                L ${50 + 50 * Math.cos((324 * Math.PI) / 180)} ${
                  50 + 50 * Math.sin((324 * Math.PI) / 180)
                }
                A 50 50 0 0 1 ${50 + 50 * Math.cos((360 * Math.PI) / 180)} ${
                  50 + 50 * Math.sin((360 * Math.PI) / 180)
                }
                Z`}
            fill="transparent"
            stroke={`url(#prizePointerGradient)`}
            strokeWidth="1.5"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  wheelPointer: {
    position: "absolute",
    top: 40,
    height: 300,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(1.1) translate(2px, 0px) ",
  },
  wheelPointerSvg: {
    overflow: "visible",
  },
});
