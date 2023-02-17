import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../settings/colors";
import iconsStyle from "./IconsStyle";

export default function AssistIcon() {
  return (
    <MaterialCommunityIcons
      name="account-check-outline"
      size={24}
      color={colors.reactionIconColor}
      style={iconsStyle.iconStyle}
    />
  );
}
