import { View, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { list, SearchDocument } from "../appwrite/database";
import { datacontext } from "../context/DataContext";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(``);
  const [isLoading, setisLoading] = useState(false);

  const { setData } = useContext(datacontext);

  async function searchMember(){
    setisLoading(true);
    const res = await SearchDocument(searchQuery);
    setData(res.documents);
    setisLoading(false);
  }

  async function cancelSearch(){
    const res = await list();
    setData(res.documents);
  }

  if(isLoading){
    return(
      <>
      <View style={styles.layout}>
        <ActivityIndicator animating={true} size={"large"} />
      </View>
      </>
    )
  }

  return (
    <View style={styles.searchLayout}>
      <Searchbar
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
        height: 50
    }
})

export default Search;
