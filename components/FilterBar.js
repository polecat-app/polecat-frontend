import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MultipleSelectList from "./MultipleSelectList";
import { SpeciesTags, OccuranceTags } from "./Tag";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";
import { Bars } from "../util/Constants";

function FilterBar(props) {
  const navigation = useNavigation();

  const allTags = Object.keys({ ...SpeciesTags, ...OccuranceTags });
  const data = allTags.map((tag) => ({ key: tag, value: tag }));

  // Navigate to the map location picker
  function pickOnMapHandler() {
    navigation.navigate("Map", {
      pickedLocation: props.pickedLocation,
    });
  }

  return (
    <View>
      <Text style={[styles.row, textStyles.overlayBold]}>Discover animals</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={pickOnMapHandler} style={styles.inputfield}>
          <Ionicons
            style={{ marginRight: 5 }}
            name="location"
            size={15}
            color={Colors.AccentIcon}
          />
          <Text style={textStyles.basicAccentBold}>{props.locationName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.setSelectedBar(Bars.SearchBar);
          }}
        >
          <Ionicons
            style={styles.searchIcon}
            name="ios-search-outline"
            size={25}
            color={Colors.AccentIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.setSelectedBar(Bars.SavedBar);
          }}
        >
          <Ionicons
            style={styles.bookmarkIcon}
            name="ios-bookmark-outline"
            size={25}
            color={Colors.AccentIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <MultipleSelectList
          setSelected={(val) => props.setSelected(val)}
          data={data}
          save="value"
          onSelect={() => {}}
          label="Filters"
          placeholder="Select filters"
          maxHeight={285}
          selected={props.selected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputfield: {
    flex: 1,
    borderRadius: Offsets.BorderRadius,
    backgroundColor: Colors.AccentSecondary,
    flexDirection: "row",
    alignItems: "center",
    padding: Offsets.DefaultMargin,
  },
  searchIcon: {
    color: Colors.Secondary,
    marginLeft: Offsets.LargeMargin,
  },
  bookmarkIcon: {
    color: Colors.Secondary,
    marginLeft: Offsets.LargeMargin,
  },
});

export default FilterBar;
