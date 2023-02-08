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
import { Bars } from "../util/Constants";

const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.searchBar}
      >
        <Ionicons
          name="ios-search"
          size={20}
          color={Colors.Primary}
          style={{ marginLeft: 1, opacity: 0.5 }}
        />
        <TextInput
          style={[styles.input, {opacity: props.searchPhrase.length ? 1 : 0.5 }]}
          placeholder="Search"
          placeholderTextColor={Colors.Primary}
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
            color={Colors.Primary}
            style={{ padding: 1, opacity: 0.5 }}
            onPress={() => {
              props.setSearchPhrase("");
            }}
          />
        )}
      </View>
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            Keyboard.dismiss();
            props.setSelectedBar(Bars.FilterBar)
            props.setClicked(false);
          }}
        >
          <Text style={textStyles.basicAccentBold}>Cancel</Text>
        </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.AccentPrimary,
    width: "100%",
    padding: Offsets.DefaultMargin,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar: {
    padding: Offsets.DefaultMargin,
    flexDirection: "row",
    width: "80%",
    backgroundColor: Colors.AccentSecondary,
    borderRadius: Offsets.BorderRadius,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: Offsets.DefaultMargin,
    flex: 1,
    color: Colors.Primary
  },
  closeButton: {
    flexDirection: "column",
    alignItems: "center",
    width: "20%",
  }
});
