import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, DataTable, Icon, IconButton } from "react-native-paper";
import { datacontext } from "../../../context/DataContext";
import CustomHeader from "../../../components/CustomHeader";
import { userContextData } from "../../../context/UserContext";
import { ID } from "react-native-appwrite";
import { deleteDocument, update } from "../../../appwrite/database";
import Toast from "react-native-toast-message";

const User = () => {
  const userId = useLocalSearchParams();

  const { user } = useContext(userContextData);

  const { data } = useContext(datacontext);
  const { name, location, yearPaid, familyDetails, $id } =
    data?.documents[userId.user];

  let tempYearPaid = [];
  let tempFamilyDetails = {};

  if (yearPaid != ``) {
    tempYearPaid = JSON.parse(yearPaid);
  }
  if (familyDetails != ``) {
    tempFamilyDetails = JSON.parse(familyDetails);
  }

  //adminView
  const [year, setYear] = useState(``);
  const [amount, setAmount] = useState(``);

  const [loading, setLoading] = useState(false);

  let tempObj = null;

  useEffect(() => {
    tempObj = {
      id: ID.unique(),
      y: year,
      p: amount,
    };
  }, [year, amount]);

  async function deleteData() {
    const res = await deleteDocument($id);
    if (res == `error`) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: "Try again later",
      });
    } else {
      router.back();
    }
  }

  async function updateData() {
    if (year.length > 3 && amount.length > 0) {
      setLoading(true);
      setYear(``);
      setAmount(``);
      const data = {
        yearPaid: `${JSON.stringify(tempYearPaid)}`,
      };
      const res = await update($id, data);
      if (res == `error`) {
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
          text2: "Try again later",
        });
      }
      setLoading(false);
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Input!",
      });
    }
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: (props) => <CustomHeader title={name} {...props} />,
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Location</Text>
        <Text style={styles.locationText}>{location}</Text>
        <View style={styles.divider} />
        <Text style={styles.headerText}>Family Details</Text>
        <View style={styles.tableContainer}>
          <DataTable>
            {/* Header */}
            <DataTable.Header>
              <DataTable.Title>Gender</DataTable.Title>
              <DataTable.Title numeric>No. of Members</DataTable.Title>
            </DataTable.Header>
            {/* Body */}
            <DataTable.Row>
              <DataTable.Cell>Male</DataTable.Cell>
              <DataTable.Cell numeric>3</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Female</DataTable.Cell>
              <DataTable.Cell numeric>1</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View style={styles.divider} />
        <Text style={styles.headerText}>Yearly Contribution</Text>
        <View style={styles.tableContainer}>
          <DataTable>
            {/* Header */}
            <DataTable.Header>
              <DataTable.Title>Year</DataTable.Title>
              <DataTable.Title numeric>Amount(₹)</DataTable.Title>
            </DataTable.Header>
            {/* Body */}
            {tempYearPaid.map((item) => {
              return (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.y}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.p}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
        <View style={styles.divider} />
        {user.labels[0] == `admin` ? (
          <>
            <Text style={styles.headerText}>Admin View</Text>
            <View style={styles.adminView}>
              <View style={styles.adminInput}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Year"
                  keyboardType="number-pad"
                  onChangeText={setYear}
                  value={year}
                />
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Amount"
                  keyboardType="number-pad"
                  onChangeText={setAmount}
                  value={amount}
                />
              </View>
              <Button
                // icon="update"
                mode="contained"
                loading={loading}
                style={styles.updateContributionButton}
                onPress={() => {
                  tempYearPaid.push(tempObj);
                  updateData();
                }}
              >
                {loading ? `Loading` : `Update Contribution`}
              </Button>
              <View style={styles.adminButtons}>
                <Button
                  icon="pencil"
                  mode="contained"
                  style={styles.editDetailsButton}
                  onPress={() => console.log("Pressed")}
                >
                  Edit Details
                </Button>
                <IconButton
                  icon="trash-can"
                  iconColor="white"
                  containerColor="#E43F6F"
                  mode="contained"
                  size={20}
                  onPress={deleteData}
                />
              </View>
            </View>
          </>
        ) : null}
        <View style={styles.safeArea} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  divider: {
    height: 20,
  },
  safeArea: {
    height: 40,
  },
  locationText: {
    borderRadius: 15,
    backgroundColor: "#C2BBF0",
    padding: 10,
  },
  tableContainer: {
    borderRadius: 15,
    backgroundColor: "#C2BBF0",
  },
  headerText: {
    fontWeight: "900",
    fontSize: 25,
    marginBottom: 15,
  },
  adminView: {
    borderRadius: 15,
    backgroundColor: "#C2BBF0",
    padding: 15,
    height: 220,
    justifyContent: "space-evenly",
  },
  adminInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputStyle: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#8C93A8",
    borderStyle: "solid",
    padding: 10,
    // backgroundColor: 'green'
  },
  adminButtons: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'green'
  },
  updateContributionButton: {
    width: "100%",
    height: 40,
  },
  editDetailsButton: {
    width: "87%",
    height: 40,
    backgroundColor: "#5E4955",
  },
});

export default User;
