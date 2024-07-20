import { View, Text, Image, StyleSheet } from "react-native";
import { datacontext } from "../../../context/DataContext";
import React, { useContext, useEffect, useState } from "react";
import { checkVersion } from "../../../appwrite/app_updates";
import { Button } from "react-native-paper";

const Update = () => {
  const { currentVersion, latestVersion } = useContext(datacontext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require("../../../assets/icon-bgless.png")}
      />
      {currentVersion != latestVersion ? (
        <>
          <View style={styles.layout}>
            <Text style={styles.updateHeader}>New update is available</Text>
            <Text style={styles.updateText}>
              A new version ({latestVersion}) of the app is available with
              exciting improvements, and bug fixes. Update now to enjoy the
              latest enhancements!
            </Text>
            <Button style={styles.updateButton} mode="contained">
              <Text style={styles.buttonText}>Download</Text>
            </Button>
          </View>
        </>
      ) : (
        <>
          <View style={styles.layout2}>
            <Text style={styles.updateHeader}>No Updates Available</Text>
            <Text style={styles.updateText}>
              You're using the latest version of the app. Thank you for keeping
              your app up-to-date!
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  layout: {
    width: "100%",
    height: "44%",
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  layout2: {
    width: "100%",
    height: "30%",
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  Image: {
    height: 280,
    aspectRatio: 1,
  },
  updateHeader: {
    fontSize: 25,
    fontWeight: "700",
  },
  updateText: {
    textAlign: "center",
    color: "#4D5061",
  },
  updateButton: {
    width: "70%",
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default Update;
