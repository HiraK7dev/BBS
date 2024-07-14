import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { list } from "../../../appwrite/database";
import {
  ActivityIndicator,
  Card,
  Avatar,
  IconButton,
} from "react-native-paper";
import Search from "../../../components/Search";
import { datacontext } from "../../../context/DataContext"; 
import { router } from "expo-router";
import client from "../../../appwrite/config";
import { VITE_COLLECTION_ID, VITE_DATABASE_ID } from '@env';

//Home Page

const Home = () => {
  const {data, setData} = useContext(datacontext);
  const [isLoading, setisLoading] = useState(0);

  async function fetchingData() {
    setisLoading(1);
    let tempData = await list();
    setData(tempData);
    // console.log(tempData); //Viewing the data
    setisLoading(0);
  }

  async function fetchingDataWithoutReload() {
    let tempData = await list();
    setData(tempData);
    // console.log(tempData); //Viewing the data
  }

  useEffect(() => {
    fetchingData();
    client.subscribe(`databases.${VITE_DATABASE_ID}.collections.${VITE_COLLECTION_ID}.documents`, response => {
      // Callback will be executed on changes for documents A and all files.
      // console.log(response); //Viewing Data
      if(response.events.includes("databases.*.collections.*.documents.*.create") || response.events.includes("databases.*.collections.*.documents.*.read") || response.events.includes("databases.*.collections.*.documents.*.update") || response.events.includes("databases.*.collections.*.documents.*.delete")){
        fetchingDataWithoutReload();
      }
  });
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
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => router.push(`/home/${index}`)}>
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
