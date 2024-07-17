import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import UserContext from "../context/UserContext";
import DataContext from "../context/DataContext";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const Layout = () => {

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ 
          backgroundColor: '#232528',
          borderLeftColor: '#7EE081',
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          color: 'white'
        }}
        text2Style={{
          fontSize: 10
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ 
          backgroundColor: '#232528',
          borderLeftColor: '#EF233C',
        }}
        text1Style={{
          fontSize: 17,
          color: 'white'
        }}
        text2Style={{
          fontSize: 10
        }}
      />
    ),
  };

  return (
    <UserContext>
      <DataContext>
        <Stack initialRouteName="index">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="Signup"
            options={{
              headerTitle: "Signup",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "Login",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
        <Toast config={toastConfig} />
      </DataContext>
    </UserContext>
  );
};

export default Layout;
