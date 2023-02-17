import React from "react";
import { AntDesign } from "@expo/vector-icons";
import iconsStyle from "./IconsStyle";
import colors from "../../settings/colors";

export default function TrashcanIcon() {
  return (
    <AntDesign
      name="delete"
      size={24}
      color="red"
      style={iconsStyle.iconStyle}
    />
  );
}
