import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../context/AuthProvider";
import CustomTextInput from "../components/CustomTextInput";
import { ProfileService } from "../services/ProfileService";
import * as ImagePicker from "expo-image-picker";
import axios from "../helpers/axiosConfig";
import { SERVER_URL, STORAGE_SERVER_URL } from "../constants";
import colors from "../settings/colors";

export default function SettingsScreen() {
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [name, setName] = useState(user.name || "");
  const [caption, setCaption] = useState(user.caption || "");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const pickBackgroundImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setBackgroundImage(result.assets[0]);
    }
  };

  const handleUpdateProfile = () => {
    ProfileService.updateProfile(name, caption)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message));
  };

  const chooseImageToShow = () => {
    if (image) {
      return image;
    }

    if (user.avatar) {
      return {
        uri: `${STORAGE_SERVER_URL}/${user.avatar}`,
      };
    }

    return "";
  };

  const chooseBackgroundImageToShow = () => {
    if (backgroundImage) {
      return backgroundImage;
    }

    if (user.backgroundImage) {
      return {
        uri: `${STORAGE_SERVER_URL}/${user.backgroundImage}`,
      };
    }

    return "";
  };

  const handleUpdateProfileImage = async () => {
    const uri =
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "");
    const filename = image.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: `image.${ext}`,
      type,
    });

    axios
      .post(`${SERVER_URL}/users/update_backgroun_image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log("Success", response.data))
      .catch((error) => console.log("Error", error.response.data.message));
  };

  const handleUpdateBackgrounImage = async () => {
    const uri =
      Platform.OS === "android"
        ? backgroundImage.uri
        : backgroundImage.uri.replace("file://", "");
    const filename = backgroundImage.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: `image.${ext}`,
      type,
    });

    axios
      .post(`${SERVER_URL}/users/update_image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log("Success", response.data))
      .catch((error) => console.log("Error", error.response.data.message));
  };

  return (
    <ScrollView style={{ backgroundColor: colors.appBackgroundColor }}>
      <View style={styles.centerContainer}>
        <View style={styles.imagePickerContainer}>
          {/* Background Image picker */}
          <Pressable onPress={pickBackgroundImage}>
            <View style={styles.imageContainer}>
              <Image
                source={{ ...chooseBackgroundImageToShow() }}
                style={styles.backgroundImage}
              />
            </View>
          </Pressable>
          <View style={styles.buttonContainer}>
            <Text style={styles.textMessage}>
              Presiona la imagen para cambiarla
            </Text>
            <CustomButton
              title="Actualizar imagen de fondo"
              action={handleUpdateBackgrounImage}
            />
          </View>
        </View>
        <View style={styles.imagePickerContainer}>
          {/* Image picker */}
          <Pressable onPress={pickImage}>
            <View style={styles.imageContainer}>
              <Image source={{ ...chooseImageToShow() }} style={styles.image} />
            </View>
          </Pressable>
          <View style={styles.buttonContainer}>
            <Text style={styles.textMessage}>
              Presiona la imagen para cambiarla
            </Text>
            <CustomButton
              title="Actualizar imagen de perfil"
              action={handleUpdateProfileImage}
            />
          </View>
        </View>
        {/* Update Profile Form */}
        <View style={styles.formContainer}>
          <CustomTextInput
            title="Name"
            placeholder="Update your current name"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <CustomTextInput
            title="Caption"
            placeholder="Update your current caption"
            value={caption}
            onChangeText={(text) => setCaption(text)}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Actualizar perfil"
              action={handleUpdateProfile}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton title="Cerrar sesión" action={logout} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: colors.appBackgroundColor,
  },

  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: "center",
  },

  backgroundImage: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  textMessage: {
    marginBottom: 10,
    textDecorationLine: "underline",
    textAlign: "center",
    color: colors.textMessageColor,
  },

  imageContainer: {
    alignContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "gray",
  },

  imagePickerContainer: {
    width: 300,
    alignItems: "center",
    marginBottom: 20,
  },

  formContainer: {
    width: 300,
  },

  buttonContainer: {
    marginTop: 20,
  },
});
