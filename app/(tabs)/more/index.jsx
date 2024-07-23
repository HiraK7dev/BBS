import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import GradientButton from "../../../components/GradientButton";
import { router } from "expo-router";
import { userContextData } from "../../../context/UserContext";
import Toast from "react-native-toast-message";

const More = () => {
  const { user } = useContext(userContextData);

  return (
    <View style={styles.container}>
      <GradientButton
        color={["#2af598", "#009efd"]}
        text="ADD MEMBER"
        fun={() => {
          user?.labels[0] == `admin`
            ? router.push(`more/Add`)
            : Toast.show({
                type: "error",
                text1: "Access Denied: Admins Only",
                text2: "You do not have the admin privileges to access this page",
              });
        }}
      />
      <GradientButton
        color={["#f093fb", "#f68084"]}
        text="EDIT MEMBER DETAILS"
        fun={() => {
          user?.labels[0] == `admin`
            ? router.push(`more/edit`)
            : Toast.show({
                type: "error",
                text1: "Access Denied: Admins Only",
                text2: "You do not have the admin privileges to access this page",
              });
        }}
      />
      <GradientButton
        color={["#f6d365", "#fda085"]}
        text="POPULATION OVERVIEW"
        fun={() => {
          router.push(`more/PopulationOverview`);
        }}
      />
      <GradientButton
        color={["#4facfe", "#00f2fe"]}
        text="TOTAL COLLECTION"
        fun={() => {
          router.push(`more/TotalCollection`);
        }}
      />
      <GradientButton
        color={["#38f9d7", "#43e97b"]}
        text="HISTORY"
        fun={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});

export default More;
