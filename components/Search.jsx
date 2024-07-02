import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(``);
  return (
    <View style={styles.searchLayout}>
      <Searchbar
        placeholder="Search..."
        style={styles.searchBar}
        inputStyle={{ minHeight: 0 }}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    searchLayout: {
        padding: 15,
    },
    searchBar: {
        height: 50
    }
})

export default Search;
