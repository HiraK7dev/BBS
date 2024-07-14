import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const Add = () => {
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <TextInput
          label="Name"
          mode="outlined"
          //   value={text}
          //   onChangeText={(text) => setText(text)}
        />
        <TextInput
          label="Location"
          mode="outlined"
          //   value={text}
          //   onChangeText={(text) => setText(text)}
        />
        {/* Family Details */}
        <View>
          <Text>Family Details</Text>
          <View>
            <TextInput
              label="Male"
              mode="outlined"
              //   value={text}
              //   onChangeText={(text) => setText(text)}
            />
            <TextInput
              label="Female"
              mode="outlined"
              //   value={text}
              //   onChangeText={(text) => setText(text)}
            />
          </View>
        </View>
        {/* Yearly Subscription */}
        <View>
          <Text>Yearly Subscription</Text>
          <View>
            <TextInput
              label="Year"
              mode="outlined"
              //   value={text}
              //   onChangeText={(text) => setText(text)}
            />
            <TextInput
              label="Amount"
              mode="outlined"
              //   value={text}
              //   onChangeText={(text) => setText(text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  layout: {
    backgroundColor: "green",
    height: 500,
    width: "100%",
    padding: 20,
  },
});

export default Add;
