import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";

const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        <Ionicons
          name="ios-search"
          size={20}
          color={Colors.Inactive}
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />

        {props.clicked && (
          <Ionicons
            name="ios-close"
            size={20}
            color={Colors.Inactive}
            style={{ padding: 1 }}
            onPress={() => {
              props.setSearchPhrase("");
            }}
          />
        )}
      </View>
      {props.clicked && (
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            Keyboard.dismiss();
            props.setClicked(false);
          }}
        >
          <Text style={textStyles.basicAccentBold}>Cancel</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop: Offsets.DefaultMargin,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
  },
  searchBar__unclicked: {
    padding: Offsets.DefaultMargin,
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.Primary,
    opacity: 0.7,
    borderRadius: Offsets.BorderRadius,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: Offsets.DefaultMargin,
    flexDirection: "row",
    width: "80%",
    backgroundColor: Colors.Primary,
    borderRadius: Offsets.BorderRadius,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: Offsets.DefaultMargin,
    flex: 1,
  },
  closeButton: {
    marginLeft: Offsets.DefaultMargin,
    marginRight: Offsets.DefaultMargin
  }
});
