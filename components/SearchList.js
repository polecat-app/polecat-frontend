import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

// the filter
function SearchList(props) {
  const [fakeData, setFakeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // If empty searchphrase, return
    if (props.searchPhrase === "") {
      setFakeData(null)
      setLoading(false)
      return
    }
    
    // Get filtered list of matching animal names from server 
    async function getData() {

      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();

      // filter the data (will eventually be done server side)
      const result = data.filter(data => (
        data.name
          .toUpperCase()
          .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      ));
      setLoading(false)
      setFakeData(result);
    }

    setLoading(true)

    // Timeout to only send request after delay
    const delayDebounceFn = setTimeout(() => {
      getData()
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [props.searchPhrase])


  return (
    <SafeAreaView style={styles.list__container}>
      {loading && <ActivityIndicator size="large" />}
      <View>
        <ScrollView style={styles.list__container}>
        {fakeData && fakeData.map((data) => (
          <Item key={data.name} name={data.name} details={data.details} />
        ))}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
