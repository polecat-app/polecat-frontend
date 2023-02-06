import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
} from "react-native";

import SearchList from "../components/SearchList";
import SearchBar from "../components/SearchBar";
import textStyles from "../styles/TextStyles";
import { Offsets } from "../styles/Offsets";
import { Colors } from "../styles/Colors";

function SearchScreen() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const { height } = useWindowDimensions();
  const animatedvalue = React.useRef(
    new Animated.Value(height / 2 - 55)
  ).current;
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;

  const slidedown = () => {
    Animated.timing(animatedvalue, {
      toValue: height / 2 - 55,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 30,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Slide view based on clicked state
  useEffect(() => {
    if (clicked) {
      slideup();
    } else {
      slidedown();
    }
  }, [clicked]);

  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background-image.jpg")}
        style={styles.backgroundImage}
      />
      <View style={{ ...styles.onImage }}>
        <Animated.View style={[styles.header, { paddingTop: animatedvalue }]}>
          {!clicked && (
            <Text style={textStyles.overlayBold}>Search Animals</Text>
          )}

          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </Animated.View>
        {!fakeData && <ActivityIndicator size="large" />}
        {fakeData && clicked && (
          <SearchList
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
        )}
      </View>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    backgroundColor: Colors.AccentPrimary
  },
  onImage: {
    height: "100%",
    alignItems: "center",
    position: "absolute",
    justifyContent: "flex-start",
    zIndex: 5,
    flex: 1,
  },
  header: {
    width: "100%",
    padding: Offsets.DefaultMargin,
    backgroundColor: Colors.AccentPrimary,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
