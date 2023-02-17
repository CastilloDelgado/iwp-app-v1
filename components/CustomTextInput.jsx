import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import colors from "../settings/colors";

export default function CustomTextInput({
  id = "",
  title = "",
  placeholder = "",
  value = "",
  textContentType = "text",
  autoCapitalize = "none",
  secureTextEntry = false,
  width = "100%",
  onChangeText = () =>
    console.log(`You need to add an action for the "${title}" text input`),
}) {
  return (
    <View style={[styles.inputContainer, { width }]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        textContentType={textContentType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        id={id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 14,
  },
  title: {
    fontWeight: "bold",
    color: colors.inputTitleColor,
  },
  textInput: {
    marginTop: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.inputBackgroundColor,
    borderColor: colors.inputBorderColor,
    borderWidth: 2,
    borderRadius: 6,
  },
});
