import { ActivityIndicator } from "react-native";
import React from "react";
import colors from "../settings/colors";

export default function CustomActivityIndicator({ loading, alwaysOn }) {
  return alwaysOn || loading ? (
    <ActivityIndicator size="large" color={colors.activityIndicator} />
  ) : null;
}
