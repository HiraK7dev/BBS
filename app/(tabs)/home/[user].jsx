import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { DataTable, Icon } from "react-native-paper";
import { datacontext } from "../../../context/DataContext";
import CustomHeader from "../../../components/CustomHeader";

const User = () => {
  const userId = useLocalSearchParams();

  const { data } = useContext(datacontext);
  const { name, location, yearPaid } = data.documents[userId.user];

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: (props) => (
            <CustomHeader
              title={name}
              {...props}
            />
          ),
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Location</Text>
        <Text style={styles.locationText}>
          {location}
        </Text>
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
            {JSON.parse(yearPaid).map((item) => {
              return (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.y}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.p}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
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
});

export default User;
