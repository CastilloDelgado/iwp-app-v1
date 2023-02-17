import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import colors from "../settings/colors";
import PostForm from "../components/PostForm";
import { emptyPostForm } from "../constants";

export default function NewPost() {
  const [form, setForm] = useState({ ...emptyPostForm });

  return (
    <View style={styles.container}>
      <PostForm form={form} setForm={setForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
});
