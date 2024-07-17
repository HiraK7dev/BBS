import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ color, text, fun }) => {
  return (
    <LinearGradient
        colors={color}
        style={styles.button}
      >
        <TouchableOpacity onPress={fun} style={styles.touchable}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
    button: {
        height: 100,
        width: '48%',
        borderRadius: 15,
        marginBottom: 12
      },
      touchable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 1
      }
})

export default GradientButton