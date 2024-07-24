import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { datacontext } from "../../../context/DataContext";

const About = () => {
  const { currentVersion } = useContext(datacontext);

  return (
    <View style={styles.container}>
      <View style={styles.appInfo}>
        <Text style={styles.appInfoTitle}>APP INFO</Text>
        <View style={styles.group}>
          <Text style={styles.titles}>App Name: </Text>
          <Text>BBS-Temple-App</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.titles}>Developer: </Text>
          <Text>Hirakjyoti Bhattacharjya</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.titles}>Version: </Text>
          <Text>{currentVersion}</Text>
        </View>
      </View>
      <View style={styles.shloka}>
        <Text style={styles.shlokaText}>
            জটাজুট সমাযুক্তাং অৰ্ধেন্দু কৃতশেখৰাম্ ।
            লোচনএয় সংযুক্তাং পূৰ্ণেন্দু সদৃশাননাম্ ।।
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  appInfo: {
    height: "32%",
    width: "86%",
    backgroundColor: "white",
    elevation: 5,
    padding: 30,
    borderRadius: 25,
  },
  appInfoTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  shloka: {
    height: "55%",
    width: "86%",
    backgroundColor: "white",
    elevation: 5,
    padding: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  shlokaText: {
    textAlign: "center",
    fontSize: 20,
  },
  group: {
    flexDirection: "row",
  },
  titles: {
    fontWeight: '600'
  }
});

export default About;
