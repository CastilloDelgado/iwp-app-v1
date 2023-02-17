import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import colors from "../settings/colors";

export default function CustomTextButton({ title, action }) {
  return (
    <Pressable onPress={action}>
      <Text style={styles.text}>{title || ""}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: colors.textButtonColor,
  },
});
