import { router } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { G, Path, Text, TextPath, TSpan } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

import { DEFINITIONS } from "@/constants/softSkills";
import { Button } from "@/components/ui/Button";
import { ThemedText } from "@/components/ThemedText";
import { WheelBackground } from "@/components/wheel/WheelBackground";
import { WheelLights } from "@/components/wheel/WheelLights";
import { i18n } from "@/i18n/config";
import { PrizePointer } from "@/components/wheel/PrizePointer";
import { useAppContext } from "@/contexts/AppContext";
import { Colors } from "@/constants/Colors";

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
        runOnJS(router.push)("/youwon");
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

              let color = Colors.light.wheelOdd;

              if (index % 2 === 0) {
                color = Colors.light.wheelEven;
              }

              return (
                <React.Fragment key={title}>
                  <Path
                    d={pathData}
                    fill={color}
                    stroke={Colors.light.white}
                    strokeWidth="0.5"
                    id={`part-${index}`}
                  />
                  <Text>
                    <TextPath href={`#part-${index}`} startOffset="33">
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
      <View style={styles.buttonContainer}>
        <Button
          onPress={spinWheel}
          disabled={limit === 0}
          text={i18n.t("wheel.spin")}
        />
      </View>
      <ThemedText style={{ opacity: 0.6, marginTop: 8 }}>
        {i18n.t("wheel.spinsLeft", { limit })}
      </ThemedText>
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
  buttonContainer: {
    marginBlockStart: 50,
    marginBlockEnd: 15,
  },
});

export default WheelOfFortune;
