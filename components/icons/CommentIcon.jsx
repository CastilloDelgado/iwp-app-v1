import React from "react";
import iconsStyle from "./IconsStyle";
import colors from "../../settings/colors";
import { EvilIcons } from "@expo/vector-icons";

export default function CommentIcon() {
  return (
    <EvilIcons
      name="comment"
      size={26}
      color={colors.reactionIconColor}
      style={iconsStyle.iconStyle}
    />
  );
}
