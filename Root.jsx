import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import NewPost from "./screens/NewPost";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "./screens/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "./context/AuthProvider";
import CustomActivityIndicator from "./components/CustomActivityIndicator";
import { Image, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import ChangePasswordScreen from "./screens/Auth/ChangePasswordScreen";
import * as SecureStore from "expo-secure-store";
import axios from "./helpers/axiosConfig";
import colors from "./settings/colors";
import headerLogo from "./assets/header-logo.png";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.tabBarActiveIconColor,
      tabBarActiveBackgroundColor: colors.tabBarBackgroundColor,
      tabBarInactiveBackgroundColor: colors.tabBarBackgroundColor,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AuthStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.appBackgroundColor,
      },
      headerTitleStyle: {
        color: colors.lightTextColor,
      },
    }}
  >
    <Stack.Screen
      options={{ title: "Iniciar sesión" }}
      name="Login Screen"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{ title: "Registrate" }}
      name="Register Screen"
      component={RegisterScreen}
    />
    <Stack.Screen
      name="Change Password Screen"
      component={ChangePasswordScreen}
    />
  </Stack.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerBackBTitleVisible: false,
      headerStyle: {
        backgroundColor: colors.appBackgroundColor,
      },
      headerTitleStyle: {
        color: colors.lightTextColor,
      },
    }}
  >
    <Stack.Screen
      name="Tab"
      component={TabNavigator}
      options={{ headerShown: false, title: "" }}
    />
    <Stack.Screen name="New Post" component={NewPost} options={{ title: "" }} />
    <Stack.Screen
      name="Post Screen"
      component={PostScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name="Profile Screen"
      component={ProfileScreen}
      options={{ title: "" }}
    />
  </Stack.Navigator>
);

export default function Root() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    SecureStore.getItemAsync("user")
      .then((userString) => {
        if (userString) {
          const userJson = JSON.parse(userString);
          setUser(userJson);

          // Adding token to axios header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${userJson.token}`;
        }
      })
      .catch((error) => console.log(error))
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <CustomActivityIndicator alwaysOn />
      </View>
    );
  }

  return (
    <>
      {user ? (
        <NavigationContainer
          options={{
            Drawer,
          }}
        >
          <Drawer.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: colors.appBackgroundColor,
              },
              headerTitleStyle: {
                color: colors.lightTextColor,
              },
            }}
          >
            <Drawer.Screen
              name="HomeStack"
              component={HomeStackNavigator}
              // options={{ title: "Feed" }}
              options={{
                headerTitle: () => (
                  <Image
                    source={headerLogo}
                    style={{ width: 70, height: 40 }}
                  ></Image>
                ),
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Configuración" }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStackNavigator />
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
