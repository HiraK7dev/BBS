import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { list } from "../../../appwrite/database";
import {
  ActivityIndicator,
  Card,
  Avatar,
  IconButton,
  Icon,
} from "react-native-paper";
import Search from "../../../components/Search";
import { datacontext } from "../../../context/DataContext";
import { router } from "expo-router";
import client from "../../../appwrite/config";
import { VITE_COLLECTION_ID, VITE_DATABASE_ID, VITE_TOTAL_ID } from "@env";
import { checkVersion } from "../../../appwrite/app_updates";
import Toast from "react-native-toast-message";
import { checkTotal } from "../../../appwrite/total_collection";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Divider } from "react-native-paper";

//Home Page

const Home = () => {
  const {
    data,
    setData,
    currentVersion,
    setLatestVersion,
    setDownloadUrl,
    setTotCollection,
    setFamilyDetails,
  } = useContext(datacontext);
  const [isLoading, setisLoading] = useState(0);

  async function checkUpdate() {
    const ver = await checkVersion();
    setLatestVersion(ver.documents[0].version);
    setDownloadUrl(ver.documents[0].downloadUrl);
    // console.log(ver.documents[0].version); //Viewing Data
    if (currentVersion != ver.documents[0].version) {
      Toast.show({
        type: "success",
        text1: "New Update Available!",
        text2: `Version ${ver.documents[0].version} is here exciting improvements, and bug fixes!`,
      });
    }
  }

  async function fetchingTotalCollection() {
    const tot = await checkTotal();
    // console.log(tot); //Viewing Data
    setTotCollection(tot);
  }

  async function fetchingData() {
    setisLoading(1);
    let tempData = await list();
    console.log(tempData);
    setData(tempData);
    setFamilyDetails(
      tempData.map((val) => {
        return JSON.parse(val.familyDetails);
      })
    );
    setisLoading(0);
  }

  async function fetchingDataWithoutReload(id) {
    let tempData = await list();
    let newData = tempData.documents.filter((val) => {
      return val.$id == id;
    });
    setData((data) =>
      data?.map((val) => {
        if (val.$id == id) {
          return newData[0];
        } else {
          return val;
        }
      })
    );
    // console.log(tempData); //Viewing the data
  }

  useEffect(() => {
    fetchingData();
    checkUpdate();
    fetchingTotalCollection();
    client.subscribe(
      `databases.${VITE_DATABASE_ID}.collections.${VITE_COLLECTION_ID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.read"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          fetchingDataWithoutReload(response.payload.$id);
        } else {
          fetchingData();
        }
      }
    );
    //Total Collection
    client.subscribe(
      `databases.${VITE_DATABASE_ID}.collections.${VITE_TOTAL_ID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.read"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          ) ||
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          fetchingTotalCollection();
        }
      }
    );
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
        data={data}
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
              right={(props) =>
                item.accountStatus == false ? (
                  <IconButton
                    {...props}
                    icon="alert-circle-outline"
                    iconColor="#FF2C55"
                    onPress={() => {
                      Toast.show({
                        type: "error",
                        text1: "Member Suspended",
                      });
                    }}
                  />
                ) : null
              }
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <>
            <Divider />
            <View style={styles.totalMemberView}>
              <Text style={styles.totalMemberText}>
                Total Members: {data.length}
              </Text>
            </View>
          </>
        )}
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
  totalMemberView: {
    width: "100%",
    alignItems: "center",
    padding: 15,
  },
  totalMemberText: {
    fontSize: RFPercentage(1.4),
  },
});

export default Home;
