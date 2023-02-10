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
import TextStyles from "../styles/TextStyles";
import CloseButton from "./CloseButton";

const SearchBar = (props) => {
  return (
    <View style={styles.row}>
      <View style={styles.searchBar}>
        <Ionicons
          name="ios-search"
          size={18}
          color={Colors.Primary}
          style={{ marginLeft: 1, opacity: 0.5 }}
        />
        <TextInput
          style={[
            TextStyles.searchAccentBold,
            styles.input,
            { opacity: props.searchPhrase.length ? 1 : 0.5 },
          ]}
          placeholder="Search"
          placeholderTextColor={Colors.Primary}
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          autoFocus={true}
          returnKeyType={"search"}
          onFocus={() => {
            props.setClicked(true);
          }}
        />

        {props.clicked && (
          <Ionicons
            name="ios-close"
            size={18}
            color={Colors.Primary}
            style={{ opacity: 0.5 }}
            onPress={() => {
              props.setSearchPhrase("");
            }}
          />
        )}
      </View>
      <CloseButton closeFunction={() => {
        Keyboard.dismiss();
        props.setSelectedBar(Bars.FilterBar);
        props.setClicked(false);
      }}></CloseButton>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginLeft: Offsets.DefaultMargin,
    flex: 1,
    alignSelf: "center",
  },
});
