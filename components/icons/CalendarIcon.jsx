import React from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../settings/colors";
import iconsStyle from "./IconsStyle";

export default function CalendarIcon() {
  return (
    <AntDesign
      name="calendar"
      size={24}
      color={colors.reactionIconColor}
      style={iconsStyle.iconStyle}
    />
  );
}
