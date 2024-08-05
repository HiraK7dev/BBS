import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Icon,
  Text,
  TextInput,
} from "react-native-paper";
import { Redirect, router, Stack } from "expo-router";
import { userContextData } from "../context/UserContext";
import * as Network from 'expo-network';
import * as Updates from 'expo-updates';
import { RFPercentage } from "react-native-responsive-fontsize";

const Login = () => {

  const { user, Login } = useContext(userContextData);

  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const [checked, setChecked] = useState(true);

  const [isValid, setIsValid] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);

  const [internet, setInternet] = useState(false);

  const validateEmail = (email) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValid(validateEmail(text));
  };

  const handlePassChange = (text) => {
    setPass(text);
    if (text.length < 8) {
      setIsValidPass(false);
    } else {
      setIsValidPass(true);
    }
  };

  async function checkInternetConnectivity() {
    const connection = await Network.getNetworkStateAsync();
    setInternet(connection.isConnected);
  }

  const reloadApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkInternetConnectivity();
  }, [])

  if (!internet) {
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: "BBS",
            headerTitleAlign: "left",
          }}
        />
        <View style={subStyles.container}>
          <View style={subStyles.layout}>
            <Icon
              source="wifi-alert"
              size={110}
              color="red"
            />
            <Text style={subStyles.titleText}>Whoops!</Text>
            <Text style={subStyles.subText}>No Internet Connection Found, Please check your Internet Settings.</Text>
            <Button mode="elevated" onPress={reloadApp}>Reload</Button>
          </View>
        </View>
      </>
    )
  }

  return user ? (
    <Redirect href="(tabs)/home" />
  ) : (
    <View style={styles.body}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email"
          keyboardType="email-address"
          error={!isValid}
          label={!isValid ? `Please enter a valid email` : ``}
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
          onChangeText={handlePassChange}
          placeholder="Password"
          secureTextEntry={checked}
          error={!isValidPass}
          label={!isValidPass ? `Must be at least 8 characters` : ``}
        />
        <Button
          style={styles.loginButton}
          mode="contained"
          icon="account"
          onPress={() => {
            if (isValid && isValidPass && email != null && pass != null) {
              Login(email, pass);
            }
          }}
          onLongPress={() => {
            setEmail(``);
            setPass(``);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <View style={styles.signUpView}>
          <Text>Don't have an account? </Text>
          <Text style={styles.signUpText} onPress={() => router.push(`/Signup`)}>Sign up here</Text>
        </View>
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
    height: 250,
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

const subStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  layout: {
    width: "100%",
    height: 310,
    justifyContent: "space-around",
    alignItems: 'center'
  },
  titleText: {
    fontSize: RFPercentage(4.5),
    fontWeight: '800',
    textAlign: 'center',
    color: '#7E2E84'
  },
  subText: {
    fontSize: RFPercentage(2.4),
    textAlign: 'center',
    color: '#736F72'
  }
});

export default Login;
