import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
} from "react-native-paper";
import { Redirect, router } from "expo-router";

const Login = () => {
  const [user, setUser] = useState(0);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const [checked, setChecked] = useState(true);

  return user ? (
    <Redirect href="(tabs)/home" />
  ) : (
    <View style={styles.body}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          value={name}
          onChangeText={setName}
          placeholder="Name"
          keyboardType="email-address"
        />
        <TextInput
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          mode="outlined"
          right={
            <TextInput.Icon
              onPress={() => {
                setChecked(!checked);
              }}
              icon={checked ? `eye-off-outline` : `eye-outline`}
            />
          }
          value={pass}
          onChangeText={setPass}
          placeholder="Password"
          secureTextEntry={checked}
        />
        <Button
          style={styles.loginButton}
          mode="contained"
          icon="account"
          onLongPress={() => {
            setName(``);
            setEmail(``);
            setPass(``);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    // backgroundColor: 'grey'
  },
  container: {
    // backgroundColor: 'blue',
    width: "100%",
    height: 300,
    justifyContent: "space-around",
  },
  loginButton: {
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default Login;
