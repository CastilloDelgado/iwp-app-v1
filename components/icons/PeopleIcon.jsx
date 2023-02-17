import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import iconsStyle from "./IconsStyle";
import colors from "../../settings/colors";

export default function PeopleIcon() {
  return (
    <SimpleLineIcons
      name="people"
      size={22}
      color={colors.reactionIconColor}
      style={iconsStyle.iconStyle}
    />
  );
}
