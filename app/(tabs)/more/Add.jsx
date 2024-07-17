import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  IconButton,
  TextInput,
  Avatar,
} from "react-native-paper";
import { ID } from "react-native-appwrite";
import { create } from "../../../appwrite/database";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const Add = () => {
  //variables
  const [year, setYear] = useState(``);
  const [amount, setAmount] = useState(``);

  const [male, setMale] = useState(``);
  const [female, setFemale] = useState(``);

  const [name, setName] = useState(``);
  const [location, setLocation] = useState(``);

  const [finalSubscription, setFinalSubscription] = useState([]);

  //Logic
  let tempSubscription = ``;
  let familyDetails = ``;

  useEffect(() => {
    tempSubscription = {
      id: ID.unique(),
      y: year,
      p: amount,
    };
  }, [year, amount]);

  useEffect(() => {
    familyDetails = {
      male: `${male}`,
      female: `${female}`,
    };
  }, [male, female]);

  function finalizeSubscription() {
    if (year.length > 3 && amount.length > 0) {
      setFinalSubscription((finalSubscription) => [
        ...finalSubscription,
        tempSubscription,
      ]);
      setYear(``);
      setAmount(``);
    } else {
      // alert(`Invalid Input!`);
      Toast.show({
        type: "error",
        text1: "Invalid Input!",
      });
    }
  }

  function cancelSubscription(id) {
    const res = finalSubscription.filter((item) => {
      if (id != item.id) {
        return item;
      }
    });
    setFinalSubscription(res);
  }

  function formSubmission() {
    if ((name != `` && location != `` && male != ``) || female != ``) {
      const result = create(
        name,
        location,
        JSON.stringify(finalSubscription),
        JSON.stringify(familyDetails)
      );
      if (result == `error`) {
        // alert(`Something went wrong!`);
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
          text2: "Try again later",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Added successfully",
        });
        setName(``);
        setLocation(``);
        setMale(``);
        setFemale(``);
        setYear(``);
        setAmount(``);
        setFinalSubscription([]);
      }
    } else {
      // alert(`Invalid Input!`);
      Toast.show({
        type: "error",
        text1: "Invalid Input!",
      });
    }
  }

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.layout}>
          <TextInput
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="Location"
            mode="outlined"
            value={location}
            onChangeText={setLocation}
          />
          {/* Family Details */}
          <View>
            <Text style={styles.titleText}>Family Details:</Text>
            <View style={styles.subLayout}>
              <TextInput
                label="Male"
                mode="outlined"
                keyboardType="number-pad"
                style={styles.InputFields}
                value={male}
                onChangeText={setMale}
              />
              <TextInput
                label="Female"
                mode="outlined"
                keyboardType="number-pad"
                style={styles.InputFields}
                value={female}
                onChangeText={setFemale}
              />
            </View>
          </View>
          {/* Yearly Subscription */}
          <View>
            <Text style={styles.titleText}>Yearly Subscription:</Text>
            <View style={styles.subLayout}>
              <TextInput
                label="Year"
                mode="outlined"
                keyboardType="number-pad"
                style={styles.InputFields2}
                value={year}
                onChangeText={setYear}
              />
              <TextInput
                label="Amount"
                mode="outlined"
                keyboardType="number-pad"
                style={styles.InputFields2}
                value={amount}
                onChangeText={setAmount}
              />
              <TouchableOpacity
                style={styles.subscriptionButton}
                onPress={finalizeSubscription}
              >
                <Text style={styles.subscriptionButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Add member button */}
          <Button
            style={styles.addButton}
            mode="contained"
            onPress={formSubmission}
          >
            ADD MEMBER
          </Button>
        </View>
        <View style={styles.container}>
          {finalSubscription.map((item) => {
            return (
              <View style={styles.cardContainer}>
                <View style={styles.cardSubContainer}>
                  <Text style={styles.cardText}>{item.y}</Text>
                </View>
                <View style={styles.cardSubContainer}>
                  <Text style={styles.cardText}>{item.p}</Text>
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  key={item.id}
                  onPress={() => {
                    cancelSubscription(item.id);
                  }}
                >
                  <Text style={styles.cancelButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "grey",
    height: 100,
  },
  container: {
    // backgroundColor: "pink",
    padding: 20,
  },
  layout: {
    // backgroundColor: "green",
    height: 450,
    width: "100%",
    padding: 20,
    justifyContent: "space-evenly",
  },
  subLayout: {
    width: "100%",
    // backgroundColor: "pink",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  InputFields: {
    width: "48.5%",
  },
  InputFields2: {
    width: "38%",
  },
  titleText: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 5,
  },
  subscriptionButton: {
    borderRadius: 5,
    backgroundColor: "#758BFD",
    height: 50,
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  subscriptionButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "600",
  },
  addButton: {
    borderRadius: 5,
  },
  cardContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'red',
    marginBottom: 15,
  },
  cardSubContainer: {
    backgroundColor: "#2F4858",
    height: "100%",
    width: "37%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  cancelButton: {
    borderRadius: 5,
    backgroundColor: "#F15156",
    height: 50,
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Add;
