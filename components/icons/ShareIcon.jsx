import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../settings/colors";
import iconsStyle from "./IconsStyle";

export default function ShareIcon() {
  return (
    <Ionicons
      name="share-outline"
      size={22}
      color={colors.reactionIconColor}
      style={iconsStyle.iconStyle}
    />
  );
}
