import { View, StyleSheet, ScrollView, Button, Platform } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import PostService from "../services/PostService";
import CustomActivityIndicator from "./CustomActivityIndicator";
import ImageSlider from "./ImageSlider";
import colors from "../settings/colors";
import * as ImagePicker from "expo-image-picker";

export default function PostForm({ form, setForm }) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
  };

  const handleTextChange = (id, text) => {
    setForm({
      ...form,
      [id]: text,
    });
  };

  const addImagesToFormData = () =>
    images.map((image) => {
      const uri =
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", "");
      const filename = image.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;
      return {
        uri,
        name: `image.${ext}`,
        type,
      };
    });

  const handleCreatePost = () => {
    setLoading(true);

    const formData = new FormData();

    const imagesToAdd = addImagesToFormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("date", form.date);

    imagesToAdd.forEach((imageToAdd) => {
      formData.append("images[]", imageToAdd);
    });

    PostService.createPost(formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        {loading ? (
          <CustomActivityIndicator alwaysOn />
        ) : (
          <>
            <View style={styles.imageSliderContainer}>
              <ImageSlider images={images} />
            </View>
            <View style={styles.inputsContainer}>
              <CustomButton title="Selecciona imagenes" action={pickImage} />
              <CustomTextInput
                title="Titulo"
                id="title"
                placeholder="Titulo de la fiesta"
                onChangeText={(text) => handleTextChange("title", text)}
                value={form["title"]}
              />
              <CustomTextInput
                title="Descripción"
                id="description"
                placeholder="Descripción de la fiesta"
                onChangeText={(text) => handleTextChange("description", text)}
                value={form["description"]}
              />
              <CustomTextInput
                title="Locación"
                id="location"
                placeholder="Lugar de la fiesta"
                onChangeText={(text) => handleTextChange("location", text)}
                value={form["location"]}
              />

              <CustomTextInput
                title="Fecha"
                id="date"
                placeholder="Ingresa la fecha de la fiesta"
                onChangeText={(text) => handleTextChange("date", text)}
                value={form["date"]}
              />

              <CustomButton
                title="Crear post"
                marginTop={30}
                action={handleCreatePost}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingBottom: 40,
    alignItems: "center",
    // paddingHorizontal: 10,
  },

  inputsContainer: {
    width: 300,
    alignContent: "center",
    alignItems: "center",
  },

  imageSliderContainer: {
    backgroundColor: colors.defaultImageColor,
    marginBottom: 20,
  },
});
