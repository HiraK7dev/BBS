import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { datacontext } from "../../../context/DataContext";
import { userContextData } from "../../../context/UserContext";
import { Button } from "react-native-paper";
import { updateTotal } from "../../../appwrite/total_collection";
import Toast from "react-native-toast-message";

const TotalCollection = () => {
  const { totCollection } = useContext(datacontext);
  const { user } = useContext(userContextData);

  async function submitTotal() {
      const res = await updateTotal(totCollection.documents[0].$id, {
        total: 0
      });
      if (res == `error`) {
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
          text2: "Try again later",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Collection Cleared Successfully",
        });
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={styles.collectionText}>
          {totCollection.documents[0].total}
        </Text>
        <Text style={styles.subText}>TOTAL COLLECTION(₹)</Text>
        {user?.labels[0] == `admin` ? (
          <Button icon="notification-clear-all" mode="contained" onPress={submitTotal}>CLEAR</Button>
        ) : (
          null
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  layout: {
    height: "50%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 15,
    padding: 20,
    borderRadius: 25
  },
  collectionText: {
    fontSize: 80,
    fontWeight: "500",
  },
  subText: {
    fontSize: 10,
    marginBottom: 25
  },
});

export default TotalCollection;
