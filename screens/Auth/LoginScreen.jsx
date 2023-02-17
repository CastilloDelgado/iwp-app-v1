import { View, StyleSheet, Image } from "react-native";
import React, { useContext, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../context/AuthProvider";
import CustomTextButton from "../../components/CustomTextButton";
import colors from "../../settings/colors";
import loginLogo from "../../assets/main-logo.png";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToRegister = () => navigation.navigate("Register Screen");

  return (
    <View style={styles.centerContainer}>
      <View style={{ marginBottom: 20 }}>
        <Image source={loginLogo} style={{ width: 200, height: 120 }}></Image>
      </View>
      <View>
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
          textContentType="password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          width={260}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Iniciar sesión"
            action={() => login(email, password)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomTextButton title="Registrate aquí" action={goToRegister} />
        </View>
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
    justifyContent: "center",
    alignContent: "center",
  },
});
