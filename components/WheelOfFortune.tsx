import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, {G, Path, Text, TextPath, TSpan} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { DEFINITIONS } from "@/constants/softSkills";
import { ThemedText } from "@/components/ThemedText";
import { WheelBackground } from "@/components/WheelBackground";
import { WheelLights } from "@/components/WheelLights";
import { i18n } from "@/i18n/config";

const segmentAngle = 360 / DEFINITIONS.length; // Calculate angle for each segment

const WheelOfFortune = () => {
  const [prize, setPrize] = useState(""); // Store selected prize

  // Shared value to track the rotation state
  const rotation = useSharedValue(0);

  const spinWheel = () => {
    const randomRounds = 2; // Number of full rounds
    const extraAngle = Math.floor(Math.random() * 360); // Random angle within the circle

    // Determine which prize to stop at
    const finalAngle = randomRounds * 360 + extraAngle; // Total spin (5 rounds + random angle)

    const selectedSegmentIndex = Math.floor(
      ((360 - (finalAngle % 360)) / segmentAngle) % DEFINITIONS.length,
    );

    rotation.value = withTiming(
      finalAngle,
      {
        duration: 2600,
        easing: Easing.out(Easing.quad),
      },
      () => {
        // Reset rotation to within [0, 360] degrees after spinning
        rotation.value = rotation.value % 360;
      },
    );

    setTimeout(() => {
      setPrize(DEFINITIONS[selectedSegmentIndex].title); // Set the prize
    }, 2700);
  };

  // Animate the wheel's rotation using `useAnimatedStyle`
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` }, // Apply dynamic rotation
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <WheelBackground />
      </View>
      <Animated.View style={[styles.wheel, animatedStyle]}>
        <Svg height="300" width="300" viewBox="0 0 100 100">
          <G rotation="0" origin="50, 50">
            {DEFINITIONS.map(({ emoji }, index) => {
              const startAngle = index * segmentAngle; // Segment start angle
              const endAngle = (index + 1) * segmentAngle; // Segment end angle
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

              const pathData = `
                M 50 50
                L ${50 + 50 * Math.cos((startAngle * Math.PI) / 180)} ${
                  50 + 50 * Math.sin((startAngle * Math.PI) / 180)
                }
                A 50 50 0 ${largeArcFlag} 1 ${50 + 50 * Math.cos((endAngle * Math.PI) / 180)} ${
                  50 + 50 * Math.sin((endAngle * Math.PI) / 180)
                }
                Z
              `;
              return (
                <React.Fragment key={index}>
                  <Path
                    d={pathData}
                    fill={
                      index % 2 === 0
                        ? "rgba(246,153,239,0.68)"
                        : "rgba(165,64,223,0.89)"
                    } // Alternating colors
                    stroke="#FFFFFF"
                    strokeWidth="0.5"
                    id={`part-${index}`}
                  />
                  <Text>
                    <TextPath
                      href={`#part-${index}`}
                      startOffset="33"
                      text-anchor=""
                      // dominant-baseline="middle"
                      // font-size={10}
                      fillOpacity={0.8}
                    >
                      <TSpan x={0} dy={-9} fontSize={8}>
                        {emoji}
                      </TSpan>
                    </TextPath>
                  </Text>
                </React.Fragment>
              );
            })}
          </G>
        </Svg>
      </Animated.View>

      <View style={styles.innerShadow} />
      <WheelLights />
      <TouchableOpacity onPress={spinWheel} style={styles.button}>
        <ThemedText style={styles.buttonText} type="subtitle">
          {i18n.t("wheel.spin")}
        </ThemedText>
      </TouchableOpacity>
      {prize ? (
        <ThemedText style={styles.prizeText}>
          {i18n.t("wheel.youWon", { skill: prize })}
        </ThemedText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  wheelHolder: {
    position: "absolute",
    top: 150,
    height: 340,
    width: 340,
    borderRadius: "50%",
    backgroundImage: "linear-gradient(#9b45e2, #8445e2)",
    backgroundColor: "#8445e2",
  },
  wheel: {
    position: "absolute",
    top: 20,
    height: 300,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBlockStart: 20,
    marginBlockEnd: 15,
    height: 50,
    paddingInline: 20,
    backgroundColor: "#4b59ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
  prizeText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    height: 50,
    textAlign: "center",
  },
  innerShadow: {},
});

export default WheelOfFortune;
