import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

export const Light = () => {
  return (
    <Svg height="20" width="20">
      <Defs>
        <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor="#fff9e3" stopOpacity="1" />
          <Stop offset="90%" stopColor="#ffffff" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="20" height="20" fill="url(#grad)" />
    </Svg>
  );
};
