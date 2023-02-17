import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { AuthService } from "../../services/AuthService";
import CustomTextButton from "../../components/CustomTextButton";
import colors from "../../settings/colors";

export default function RegisterScreen({ navigation }) {
  const goToLogin = () => navigation.navigate("Login Screen");

  const [name, setName] = useState("");
  const [usertag, setUsertag] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = () => {
    AuthService.register(name, usertag, email, password, password)
      .then((response) => {
        Alert.alert("Nice!", "Now please, log in.");
        navigation.navigate("Login Screen");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
      .then(() => {});
  };

  return (
    <View style={styles.centerContainer}>
      <KeyboardAvoidingView>
        <CustomTextInput
          title="Nombre de usuario"
          placeholder="Ingresa tu nombre de usuario"
          textContentType="text"
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
          width={260}
        />
        <CustomTextInput
          title="Tag"
          placeholder="Ingresa tu tag de usuario"
          textContentType="text"
          onChangeText={(text) => {
            setUsertag(text);
          }}
          value={usertag}
          width={260}
        />
        <CustomTextInput
          title="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          textContentType="emailAddress"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          width={260}
        />
        <CustomTextInput
          title="Contraseña"
          placeholder="Ingresa tu contraseña"
          textContentType="emailAddress"
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          width={260}
          secureTextEntry={true}
        />
        <CustomTextInput
          title="Repite tu contraseña"
          placeholder="Ingresa tu contraseña nuevamente"
          textContentType="emailAddress"
          onChangeText={(text) => {
            setPasswordConfirmation(text);
          }}
          value={passwordConfirmation}
          width={260}
          secureTextEntry={true}
        />
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <CustomButton title="Registrate" action={handleRegister} width={260} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomTextButton
          title="¿Ya tienes cuenta? Ingresa aquí"
          action={goToLogin}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.appBackgroundColor,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
