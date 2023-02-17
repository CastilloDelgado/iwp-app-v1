import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../settings/colors";
import iconsStyle from "./IconsStyle";

export default function PartyIcon() {
  return (
    <MaterialCommunityIcons
      name="party-popper"
      size={24}
      color={colors.reactionIconColor}
      style={iconsStyle.iconStyle}
    />
  );
}
