import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import UserContext from '../context/UserContext'
import DataContext from '../context/DataContext'

const Layout = () => {
  return (
    <UserContext>
      <DataContext>
    <Stack initialRouteName='index'>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='Signup' options={{
            headerTitle: 'Signup',
            headerTitleAlign: 'center'
        }} />
        <Stack.Screen name='index' options={{
            headerTitle: 'Login',
            headerTitleAlign: 'center'
        }} />
    </Stack>
    </DataContext>
    </UserContext>
  )
}

export default Layout