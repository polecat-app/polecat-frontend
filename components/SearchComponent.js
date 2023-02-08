import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
} from "react-native";

import SearchList from "./SearchList";
import SearchBar from "./SearchBar";
import textStyles from "../styles/TextStyles";
import { Offsets } from "../styles/Offsets";
import { Colors } from "../styles/Colors";

function SearchComponent() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const { height } = useWindowDimensions();
  const animatedvalue = React.useRef(
    new Animated.Value(height / 2)
  ).current;
  const animatedOpacity = React.useRef(new Animated.Value(0.0)).current;

  const slidedown = () => {
    Animated.parallel([
      Animated.timing(animatedvalue, {
        toValue: height / 2,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 0.0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const slideup = () => {
    Animated.parallel([
      Animated.timing(animatedvalue, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 1.0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Slide view based on clicked state
  useEffect(() => {
    if (clicked) {
      slideup();
    } else {
      slidedown();
      setSearchPhrase("");
    }
  }, [clicked]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/ladybug.png")}
        style={[styles.backgroundImage]}
      />
      <Animated.View
        style={[styles.backgroundView, { opacity: animatedOpacity }]}
      >
      </Animated.View>
      <View style={styles.onImage}>
        <Animated.View
          style={[
            styles.headerColor,
            { height: animatedvalue, opacity: animatedOpacity },
          ]}
        ></Animated.View>
        <Animated.View style={[styles.header, { height: animatedvalue }]}>
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
        {searchPhrase && clicked && (
          <SearchList searchPhrase={searchPhrase} setClicked={setClicked} />
        )}
      </View>
    </View>
  );
}

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: Colors.AccentPrimary
  },
  backgroundView: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.Secondary,
    position: "absolute",
    zIndex: 2,
  },
  backgroundImage: {
    padding: 20,
    alignSelf: "center",
    resizeMode: "center",
    zIndex: 1,
  },
  onImage: {
    height: "100%",
    alignItems: "center",
    position: "absolute",
    justifyContent: "flex-start",
    zIndex: 3,
    flex: 1,
  },
  header: {
    width: "100%",
    padding: Offsets.DefaultMargin,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 5
  },
  headerColor: {
    width: "100%",
    backgroundColor: Colors.AccentPrimary,
    zIndex: 4,
    position: "absolute",
  },
});
