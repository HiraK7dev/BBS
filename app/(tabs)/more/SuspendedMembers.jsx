import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { Card, Avatar } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import { datacontext } from "../../../context/DataContext";

const SuspendedMembers = () => {
  const { data } = useContext(datacontext);
  const [flag, setFlag] = useState(true);

  function checkEmpty() {
    for (let i of data) {
      if (i.accountStatus == false) {
        setFlag(false);
        break;
      }
    }
  }

  useEffect(() => {
    checkEmpty();
    console.log(data[0]);
  }, []);

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={data}
        renderItem={({ item }) =>
          item.accountStatus == false ? (
            <Card.Title
              title={item.name}
              titleStyle={styles.titleText}
              subtitle={item.location}
              subtitleStyle={item.subtitleText}
              subtitleVariant="bodySmall"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="alert-circle-outline"
                  style={styles.cardIcon}
                />
              )}
            />
          ) : <View></View>
        }
        keyExtractor={(item) => item.id}
      /> */}
      <ScrollView>
      {data.map((item) => {
        if (item.accountStatus == false) {
          return (
            <Card.Title
              title={item.name}
              titleStyle={styles.titleText}
              subtitle={item.location}
              subtitleStyle={item.subtitleText}
              subtitleVariant="bodySmall"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="alert-circle-outline"
                  style={styles.cardIcon}
                />
              )}
            />
          );
        }
      })}
      </ScrollView>
      {flag ? (
        <View style={styles.layout}>
          <Text style={styles.suspendedText}>NO SUSPENDED MEMBERS</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  suspendedText: {
    letterSpacing: 1.5,
    color: "#7A7D7D",
  },
  titleText: {
    fontWeight: "700",
  },
  subtitleText: {
    fontSize: 4,
  },
  cardIcon: {
    backgroundColor: "#FF2C55",
  },
});

export default SuspendedMembers;
