import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { SOFT_SKILLS } from "@/constants/softSkills";
import { ThemedText } from "@/components/ThemedText";

const segmentAngle = 360 / SOFT_SKILLS.length; // Calculate angle for each segment

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
      ((360 - (finalAngle % 360)) / segmentAngle) % SOFT_SKILLS.length,
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
      setPrize(SOFT_SKILLS[selectedSegmentIndex]); // Set the prize
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
      <Animated.View style={[styles.wheelContainer, animatedStyle]}>
        <Svg height="300" width="300" viewBox="0 0 100 100">
          <G rotation="0" origin="50, 50">
            {SOFT_SKILLS.map((item, index) => {
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
                <Path
                  key={index}
                  d={pathData}
                  fill={index % 2 === 0 ? "#FF9F1C" : "#2EC4B6"} // Alternating colors
                  stroke="#FFF"
                  strokeWidth="0.5"
                />
              );
            })}
          </G>
        </Svg>
      </Animated.View>

      <TouchableOpacity onPress={spinWheel} style={styles.button}>
        <ThemedText style={styles.buttonText} type="subtitle">
          Spin
        </ThemedText>
      </TouchableOpacity>
      {prize ? (
        <ThemedText style={styles.prizeText}>🎉 You Won: {prize}</ThemedText>
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
  wheelContainer: {
    position: "absolute",
    top: 170,
    height: 300,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBlockStart: 20,
    marginBlockEnd: 15,
    width: 100,
    height: 50,
    backgroundColor: "#e245cc",
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
});

export default WheelOfFortune;
