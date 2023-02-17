import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../settings/colors";

export default function CustomButton({
  title,
  color = colors.followButton,
  fontColor = colors.followButtonText,
  width = "100%",
  marginTop = 0,
  marginBottom = 0,
  action = () =>
    console.log(`You need to add an action for the "${title}" button`),
}) {
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.followButton,
        {
          width: width,
          marginTop: marginTop,
          marginBottom: marginBottom,
        },
      ]}
    >
      <Text style={styles.followButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  followButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: colors.buttonBackgroundColor,
  },

  followButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.buttonTextColor,
  },
});
