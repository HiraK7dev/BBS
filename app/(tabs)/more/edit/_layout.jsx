import { View, Text } from 'react-native'
import { Stack } from 'expo-router';
import React from 'react'

const _layout = () => {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='[edit]' options={{
            headerTitle: `Edit`
        }}/>
        <Stack.Screen name='index' options={{
            headerTitle: `Edit Member Details`
        }}/>
    </Stack>
  )
}

export default _layout