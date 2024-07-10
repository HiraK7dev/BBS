import React, { createContext, useEffect, useState } from 'react'
import { account } from '../appwrite/config';
import { View, Text, StyleSheet } from 'react-native';
import { ID } from 'react-native-appwrite';
import { ActivityIndicator, Icon } from 'react-native-paper';

export const userContextData = createContext();

function UserContext({ children }) {

    const [user, setUser] = useState(null);

    const [isLoading, setisLoading] = useState(0);
    const [error, setError] = useState({
        value: 0,
        errorType: null
    });

    //Get the currently logged in user
    async function getUserStatus() {
        try {
            setisLoading(1);
            const result = await account.get();
            setUser(result);
            // console.log(result.labels[0]); //account label
            console.log(`Account found`);
        } catch (error) {
            console.log(`Account not found!`);
        }
        setisLoading(0);
    }
    //Createing an account
    async function createAccount(email, password, name){
        try {
            setisLoading(1);
            const result = await account.create(
                ID.unique(), // userId
                email, // email
                password, // password
                name // name (optional)
            );
            Login(email, password);
            console.log(`Account Created Succcessuly`);
        } catch (error) {
            setError({
                value: 1,
                errorType: `signup`
            })
            console.log(`Account creation failed: ` + error);
            setisLoading(0);
        }
    }
    //Login
    async function Login(email, password) {
        try {
            setisLoading(1);
            const session = await account.createEmailPasswordSession(
                email, // email
                password // password
            );
            getUserStatus();
            console.log(`Login Successful`);
        } catch (error) {
            setError({
                value: 1,
                errorType: `login`
            })
            console.log(error);
            setisLoading(0);
        }
    }

    async function Logout(){
        try {
            setisLoading(1);
            const result = await account.deleteSession(
                'current' // sessionId
            );
            setUser(null);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        setisLoading(0);
    }

    useEffect(() => { 
        getUserStatus();
    }, [])

    if(error.value){
        return(
            <View style={styles.layout}>
                <Icon source='alert-circle-outline' size={78} color='red' />
                <Text style={styles.errorText}>{error.errorType == `login` ? `Login failed` : `Account creation failed`}</Text>
                <Text style={styles.errorMsg}>{error.errorType == `login` ? `Try again with another email or password.` : `Something went wrong`}</Text>
                <Text style={styles.refreshText} onPress={() => setError({ value: 0, errorType: null})}>Try again</Text>
            </View>
        )
    }

    if(isLoading){
        return(
            <View style={styles.layout}>
                <ActivityIndicator animating={true} size={'large'}/>
            </View>
        )
    }

  return (
    <userContextData.Provider value={{user, setUser, createAccount, Login, Logout}}>
        {
            children
        }
    </userContextData.Provider>
  )
}

const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 21,
        fontWeight: '700',
        color: 'red',
        padding: 10
    },
    errorMsg: {
        paddingBottom: 6
    },
    refreshText: {
        color: 'blue'
    }
});

export default UserContext