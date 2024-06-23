import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon source='home' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more/index"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <Icon source='cards' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Icon source='account' size={28} color={color} />,
        }}
      />
      </Tabs>
  )
}

export default TabLayout