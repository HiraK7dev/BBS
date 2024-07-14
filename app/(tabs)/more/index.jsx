import { View, StyleSheet } from "react-native";
import React from "react";
import GradientButton from "../../../components/GradientButton";
import { router } from "expo-router";

const More = () => {
  return (
    <View style={styles.container}>
      <GradientButton color={["#2af598", "#009efd"]} text="ADD MEMBER" fun={() => { router.push(`more/Add`)}}/>
      <GradientButton color={["#f093fb", "#f68084"]} text="DONATIONS" fun={() => {}}/>
      <GradientButton color={["#f6d365", "#fda085"]} text="MEMBERS" fun={() => {}}/>
      <GradientButton color={["#4facfe", "#00f2fe"]} text="COLLECTIONS" fun={() => {}}/>
      <GradientButton color={["#38f9d7", "#43e97b"]} text="HISTORY" fun={() => {}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
});

export default More;
