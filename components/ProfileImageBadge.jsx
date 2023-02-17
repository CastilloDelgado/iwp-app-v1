import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import colors from "../settings/colors";
import { SERVER_URL, STORAGE_SERVER_URL } from "../constants";

export default function ProfileImageBadge({ image, big }) {
  return (
    <Image
      style={[
        styles.avatar,
        {
          height: big ? 80 : 42,
          width: big ? 80 : 42,
          borderRadius: big ? 40 : 21,
          borderColor: big ? colors.profileImageBadgeBorder : null,
          borderWidth: big ? 3 : null,
        },
      ]}
      source={{
        uri:
          `${STORAGE_SERVER_URL}/${image}` ||
          "https://reactnative.dev/img/tiny_logo.png",
      }}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginRight: 8,
  },
});
