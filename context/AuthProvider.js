import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthService } from "../services/AuthService";
import { Alert } from "react-native";
import axios from "../helpers/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email, password) => {
          // Login service
          AuthService.login(email, password)
            .then((response) => {
              const userResponse = {
                id: response.data.user.id,
                name: response.data.user.name,
                usertag: response.data.user.usertag,
                email: response.data.user.email,
                avatar: response.data.user.avatar,
                token: response.data.token,
                caption: response.data.user.caption,
                backgroundImage: response.data.user.background_image,
              };

              // Adding token to axios header
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response.data.token}`;

              // Adding user to context
              setUser(userResponse);

              // Adding user to SecureStore
              SecureStore.setItemAsync("user", JSON.stringify(userResponse));
            })
            .catch((error) => {
              Alert.alert("Error", error.response.data.message);
            })
            .then(() => {});
        },
        logout: () => {
          // Delete user from context
          setUser(null);
          // Logout service to delete the current token
          AuthService.logout()
            .then(() => {
              // Delete  current user from Secure Store
              SecureStore.deleteItemAsync("user");
            })
            .catch((error) => {
              Alert.alert("Error", error.response.data.message);
            })
            .then(() => {});
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
