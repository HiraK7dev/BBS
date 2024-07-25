import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";

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
        marginBottom: 12,
        padding: 15
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
        fontSize: RFPercentage(1.8),
        textAlign: 'center',
        letterSpacing: 1,
      }
})

export default GradientButton