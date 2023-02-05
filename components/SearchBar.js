import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    onSearch(text);
    // Perform search logic here, such as making an API call
    // and updating the results in state
  };

  const closeSearch = () => {
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background-image.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.onImage}>
        <Text style={textStyles.overlayBold}>Search Animals</Text>
        <View style={styles.inputBar}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color={Colors.Inactive}
          />
          <TextInput
            style={[textStyles.basic, styles.input]}
            value={searchTerm}
            onChangeText={handleSearch}
            onFocus={() => setShowResults(true)}
            placeholder="Name, binominal..."
          />
          {showResults && (
            <TouchableOpacity onPress={closeSearch}>
              <Text style={textStyles.basic}>Close</Text>
            </TouchableOpacity>
          )}
        </View>
        {showResults && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text style={{ padding: 10 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  onImage: {
    padding: Offsets.DefaultMargin,
    paddingTop: 30,
    flex: 1,
    width: "100%",
    position: "absolute",
    zIndex: 6,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  inputBar: {
    width: "90%",
    marginTop: 10,
    zIndex: 6,
    backgroundColor: Colors.Primary,
    borderRadius: Offsets.BorderRadius,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: Offsets.DefaultMargin,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    margin: Offsets.DefaultMargin,
  },
  input: {
    margin: Offsets.DefaultMargin,
    width: "100%",
    flex: 1,
    textAlign: "Left",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
});

export default SearchBar;
