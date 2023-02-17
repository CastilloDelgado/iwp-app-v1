import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import CommentService from "../services/CommentService";
import colors from "../settings/colors";

export default function CommentForm({ postId }) {
  const [text, setText] = useState("");

  const handleCreateComment = () => {
    CommentService.createComment(postId, text)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message));
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.formContainer}>
        <CustomTextInput
          placeholder="Agrega un comentario :)"
          onChangeText={(newText) => setText(newText)}
          value={text}
          width={"80%"}
        />
        <View style={styles.buttonContainer}>
          <CustomButton title=">" width={"100%"} action={handleCreateComment} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 60,
    justifyContent: "center",
    backgroundColor: colors.commentFormBackground,
  },
  buttonContainer: {
    marginLeft: 10,
    justifyContent: "flex-end",
  },
});
