import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import {
    Card,
    Avatar,
  } from "react-native-paper";
import { datacontext } from '../../../../context/DataContext'
import { router } from 'expo-router';

const index = () => {
    const { data } = useContext(datacontext);
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.documents}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => router.push(`/more/edit/${index}`)}>
            <Card.Title
              title={item.name}
              titleStyle={styles.titleText}
              subtitle={item.location}
              subtitleStyle={item.subtitleText}
              subtitleVariant="bodySmall"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="account-edit"
                  style={styles.cardIcon}
                />
              )}
            />
            </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

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

export default index