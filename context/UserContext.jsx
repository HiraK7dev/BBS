import React, { createContext, useEffect, useState } from 'react'
import { account } from '../appwrite/config';
import { View, Text } from 'react-native';
import { ID } from 'react-native-appwrite';
import { ActivityIndicator } from 'react-native-paper';

export const userContextData = createContext();

function UserContext({ children }) {

    const [user, setUser] = useState(null);

    const [isLoading, setisLoading] = useState(0);

    //Get the currently logged in user
    async function getUserStatus() {
        try {
            setisLoading(1);
            const result = await account.get();
            setUser(result);
            console.log(`Account Found`);
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
            // Login(email, password);
            (async () => {
                const session = await account.createEmailPasswordSession(
                    email, // email
                    password // password
                );
                setUser(session);
            })();
            console.log(`Account Created Succcessuly`);
        } catch (error) {
            console.log(`Account creation failed: ` + error);
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
            setUser(session);
            console.log(`Login Successful`);
        } catch (error) {
            console.log(`error`);
        }
        setisLoading(0);
    }

    useEffect(() => { 
        getUserStatus();
        console.log(`Hello`);
    }, [])

    if(isLoading){
        return(
            <View style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator animating={true} size={'large'}/>
            </View>
        )
    }

  return (
    <userContextData.Provider value={{user, setUser, createAccount, Login}}>
        {
            children
        }
    </userContextData.Provider>
  )
}

export default UserContext