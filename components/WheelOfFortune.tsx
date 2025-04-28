import { router } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { G, Path, Text, TextPath, TSpan } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

import { DEFINITIONS } from "@/constants/softSkills";
import { ThemedText } from "@/components/ThemedText";
import { WheelBackground } from "@/components/WheelBackground";
import { WheelLights } from "@/components/WheelLights";
import { i18n } from "@/i18n/config";
import { PrizePointer } from "@/components/PrizePointer";
import { useAppContext } from "@/contexts/AppContext";

const segmentAngle = 360 / DEFINITIONS.length;

const WheelOfFortune = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { limit, setPrize } = useAppContext();

  const rotation = useSharedValue(0);

  const spinWheel = () => {
    if (isSpinning) {
      return;
    }

    const extraAngle =
      Math.floor(Math.random() * DEFINITIONS.length) * segmentAngle;

    const finalAngle = 2 * 360 + extraAngle + 270 + segmentAngle / 2;

    const selectedSegmentIndex = Math.floor(
      ((360 - extraAngle) / segmentAngle) % DEFINITIONS.length,
    );

    setIsSpinning(true);

    rotation.value = withTiming(
      finalAngle,
      {
        duration: 2600,
        easing: Easing.out(Easing.quad),
      },
      () => {
        runOnJS(setIsSpinning)(false);
        runOnJS(setPrize)(selectedSegmentIndex + 1);
        rotation.value = rotation.value % 360;
        runOnJS(router.push)("/youWonModal");
      },
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, { marginBlockStart: 60 }]}>
      <View style={styles.container}>
        <WheelBackground />
      </View>
      <Animated.View style={[styles.wheel, animatedStyle]}>
        <Svg height="290" width="290" viewBox="0 0 100 100">
          <G rotation="0" origin="50, 50">
            {DEFINITIONS.map(({ emoji, title }, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = (index + 1) * segmentAngle;
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

              let color = "rgba(158,75,207,0.89)";

              if (index % 2 === 0) {
                color = "rgba(234,168,223,0.68)";
              }

              return (
                <React.Fragment key={title}>
                  <Path
                    d={pathData}
                    fill={color}
                    stroke="#FFFFFF"
                    strokeWidth="0.5"
                    id={`part-${index}`}
                  />
                  <Text>
                    <TextPath
                      href={`#part-${index}`}
                      startOffset="33"
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

      <PrizePointer />

      <WheelLights />
      <TouchableOpacity
        onPress={spinWheel}
        style={[styles.button, limit === 0 ? styles.disabledButton : undefined]}
        disabled={limit === 0}
      >
        <ThemedText style={styles.buttonText} type="subtitle">
          {i18n.t("wheel.spin")}
        </ThemedText>
      </TouchableOpacity>
      <ThemedText style={{ opacity: 0.6, marginTop: 8 }}>{i18n.t("wheel.spinsLeft", { limit })}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBlockStart: 20,
  },
  wheel: {
    position: "absolute",
    top: 40,
    height: 300,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBlockStart: 50,
    marginBlockEnd: 15,
    height: 56,
    paddingInline: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "#7f4898",
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: 500,
  },
});

export default WheelOfFortune;
