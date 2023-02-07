import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Offsets } from "../styles/Offsets";
import AnimalCardSmall from "./AnimalCardSmall";


// the filter
function SearchList(props) {
  const [fakeData, setFakeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If empty searchphrase, return
    if (props.searchPhrase === "") {
      setFakeData(null);
      setLoading(false);
      return;
    }

    // Get filtered list of matching animal names from server
    async function getData() {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();

      // filter the data (will eventually be done server side)
      const result = data.filter((data) =>
        data.name
          .toUpperCase()
          .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      );
      setLoading(false);
      setFakeData(result);
    }

    setLoading(true);

    // Timeout to only send request after delay
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [props.searchPhrase]);

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      {loading && <ActivityIndicator size="large" style={styles.ActivityIndicator} />}
      <ScrollView style={styles.scrollView}>
        {fakeData &&
          fakeData.map((data) => (
            <AnimalCardSmall
              key={data.name}
              commonName={data.name}
              binomial={data.details}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchList;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    paddingLeft: Offsets.DefaultMargin,
    paddingRight: Offsets.DefaultMargin,
  },
  ActivityIndicator: {
    marginTop: Offsets.DefaultMargin
  },
});
