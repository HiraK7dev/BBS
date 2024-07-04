import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { userContextData } from '../../../context/UserContext'
import { Avatar, Button } from 'react-native-paper';

const Profile = () => {
  const { Logout, user } = useContext(userContextData);
  return (
    <View style={styles.layout}>
      {/* <TouchableOpacity onPress={Logout}>
        <Text>Sign Out</Text>
      </TouchableOpacity> */}
      <Avatar.Icon style={styles.icon} size={130} icon="account"/>
      <Text style={styles.accountName}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Button mode='outlined' onPress={Logout}>Log out</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: '#93A3BC'
  },
  accountName: {
    padding: 20,
    fontSize: 30,
    fontWeight: '200'
  },
  email: {
    fontWeight: '200',
    fontSize: 15,
    paddingBottom: 40
  }
})

export default Profile