import { View, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { list, SearchDocument } from "../appwrite/database";
import { datacontext } from "../context/DataContext";
import * as Updates from 'expo-updates';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(``);
  const [isLoading, setisLoading] = useState(false);

  const { setData } = useContext(datacontext);

  async function searchMember() {
    if (searchQuery.length > 0) {
      setisLoading(true);
      const res = await SearchDocument(searchQuery);
      setData(res.documents);
      setisLoading(false);
    } else {
      try {
        await Updates.reloadAsync();
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function cancelSearch() {
    const res = await list();
    setData(res);
  }

  if (isLoading) {
    return (
      <>
        <View style={styles.layout}>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      </>
    );
  }

  return (
    <View style={styles.searchLayout}>
      <Searchbar
      icon={searchQuery.length > 0 ? "" : "reload"}
        placeholder="Search..."
        style={styles.searchBar}
        inputStyle={{ minHeight: 0 }}
        onChangeText={setSearchQuery}
        value={searchQuery}
        onIconPress={searchMember}
        onClearIconPress={cancelSearch}
        onSubmitEditing={searchMember}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchLayout: {
    padding: 15,
  },
  layout: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 50,
  },
});

export default Search;
