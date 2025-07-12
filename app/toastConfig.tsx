import { BaseToast } from "react-native-toast-message";
import { BaseToastProps } from "react-native-toast-message/lib/src/types";

import { Colors } from "@/constants/Colors";

export const toastConfig = {
  success: (
    props: Omit<
      BaseToastProps,
      "style" | "contentContainerStyle" | "text1Style"
    >,
  ) => (
    <BaseToast
      {...props}
      style={{ borderColor: Colors.light.drawerItemHovered }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
};
