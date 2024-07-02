import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { list } from "../../../appwrite/database";
import {
  ActivityIndicator,
  Card,
  Avatar,
  IconButton,
} from "react-native-paper";
import Search from "../../../components/Search";

//Home Page

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(0);

  async function fetchingData() {
    setisLoading(1);
    let tempData = await list();
    setData(tempData);
    // console.log(tempData); //Viewing the data
    setisLoading(0);
  }

  useEffect(() => {
    fetchingData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.layout}>
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Search />
      <FlatList
        data={data?.documents}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {console.log(`Hello!`)}}>
            <Card.Title
              title={item.name}
              titleStyle={styles.titleText}
              subtitle={item.location}
              subtitleStyle={item.subtitleText}
              subtitleVariant="bodySmall"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="account"
                  style={styles.cardIcon}
                />
              )}
            />
            </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
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
  titleText: {
    fontWeight: "700",
  },
  subtitleText: {
    fontSize: 4,
  },
  cardIcon: {
    backgroundColor: "#D8D8D8",
  },
});

export default Home;
