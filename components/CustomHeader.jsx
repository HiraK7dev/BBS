import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
        <Icon source='account-circle' size={32} color='grey'/>
        <View style={styles.divider}/>
        <Text style={styles.headerText}>{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: 10
    },
    headerText: {
      fontWeight: '600',
      fontSize: 16
    }
})

export default CustomHeader