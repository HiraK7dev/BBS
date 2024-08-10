import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import UserContext from "../context/UserContext";
import DataContext from "../context/DataContext";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const Layout = () => {

  const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#B744B8',
      }
    };

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
    <PaperProvider theme={theme}>
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
          />
        </Stack>
        <Toast config={toastConfig} />
      </DataContext>
    </UserContext>
    </PaperProvider>
  );
};

export default Layout;
