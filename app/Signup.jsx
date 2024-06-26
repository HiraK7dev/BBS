import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
} from "react-native-paper";
import { Redirect, router } from "expo-router";
import { userContextData } from "../context/UserContext";

const SignUp = () => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);

    const { createAccount } = useContext(userContextData);
  
    const [checked, setChecked] = useState(true);
    
  return (
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
          icon="account-alert"
          onPress={() => {
            createAccount(email, pass, name);
          }}
          onLongPress={() => {
            setName(``);
            setEmail(``);
            setPass(``);
          }}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </Button>
        <View style={styles.signUpView}>
          <Text>Have have an account? </Text>
          <Text style={styles.signUpText} onPress={() => router.replace(`/`)}>Login here</Text>
        </View>
      </View>
    </View>
  )
}

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
    signUpView: {
      flexDirection: 'row',
      justifyContent: 'center',
      // backgroundColor: 'red'
    },
    signUpText: {
      color: 'blue'
    }
  });

export default SignUp