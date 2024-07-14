import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ color, text, fun }) => {
  return (
    <LinearGradient
        colors={color}
        style={styles.button}
      >
        <TouchableOpacity onPress={fun}>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
      },
      buttonText: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 1
      }
})

export default GradientButton