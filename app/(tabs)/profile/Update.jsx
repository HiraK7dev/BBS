import { View, Text, Image, StyleSheet, Linking } from "react-native";
import { datacontext } from "../../../context/DataContext";
import React, { useContext, useEffect, useState } from "react";
import { checkVersion } from "../../../appwrite/app_updates";
import { Button } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";

const Update = () => {
  const { currentVersion, latestVersion, downloadUrl } = useContext(datacontext);

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
            <Button
              style={styles.updateButton}
              mode="contained"
              onPress={() => {
                Linking.openURL(downloadUrl);
              }}
            >
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
    height: '44%',
    aspectRatio: 1,
  },
  updateHeader: {
    fontSize: RFPercentage(3),
    fontWeight: "700",
    textAlign: 'center'
  },
  updateText: {
    fontSize: RFPercentage(2),
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
