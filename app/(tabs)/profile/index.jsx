import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { userContextData } from "../../../context/UserContext";
import { Avatar, Button, Card, IconButton } from "react-native-paper";
import { router } from "expo-router";
import { datacontext } from "../../../context/DataContext";

const Profile = () => {
  const { Logout, user } = useContext(userContextData);
  const { currentVersion, latestVersion } = useContext(datacontext);
  return (
    <View style={styles.layout}>
      <Avatar.Icon style={styles.icon} size={120} icon="account" />
      <Text style={styles.accountName}>{user?.name}</Text>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Email:" subtitle={user?.email} />
          <Card.Title
            title="Update:"
            subtitle={
              currentVersion != latestVersion
                ? `Update Available!`
                : `Version: ${currentVersion}`
            }
            right={(props) => (
              <IconButton
                {...props}
                icon="arrow-right"
                onPress={() => {
                  router.push(`profile/Update`);
                }}
              />
            )}
          />
          <Card.Title
            title="About:"
            right={(props) => (
              <IconButton
                {...props}
                icon="arrow-right"
                onPress={() => {
                  router.push(`profile/About`);
                }}
              />
            )}
          />
          <Card.Actions>
            <Button onPress={Logout}>Log out</Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  container: {
    height: "67%",
    width: "100%",
    padding: 20,
  },
  card: {
    padding: 10,
  },
  icon: {
    backgroundColor: "#93A3BC",
    marginTop: 30,
  },
  accountName: {
    padding: 20,
    fontSize: 30,
    fontWeight: "200",
  },
});

export default Profile;
