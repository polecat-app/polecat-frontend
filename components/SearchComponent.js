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
    new Animated.Value(height / 2 - 55)
  ).current;
  const animatedOpacity = React.useRef(new Animated.Value(1.0)).current;

  const slidedown = () => {
    Animated.timing(animatedvalue, {
      toValue: height / 2 - 55,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedOpacity, {
      toValue: 1.0,
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
      toValue: 0.0,
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
      setSearchPhrase("")
    }
  }, [clicked]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.backgroundView, { opacity: animatedOpacity }]}
      >
        <ImageBackground
          source={require("../images/background-image.jpg")}
          style={[styles.backgroundImage]}
        />
      </Animated.View>
      <View style={styles.onImage}>
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
    flex: 1,
    width: "100%",
    backgroundColor: Colors.Secondary,
  },
  backgroundView: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
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
