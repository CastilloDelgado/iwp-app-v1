import React from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../../settings/colors";
import iconsStyle from "./IconsStyle";

export default function DotsIcons() {
  return (
    <Entypo
      name="dots-three-vertical"
      size={24}
      color={colors.reactionIconColor}
      style={iconsStyle.iconStyle}
    />
  );
}
