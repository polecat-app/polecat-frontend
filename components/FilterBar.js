import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MultipleSelectList from "./MultipleSelectList";
import { SpeciesTags, OccuranceTags } from "./Tag";
import { Ionicons } from "@expo/vector-icons";

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

  function getLocationName() {
    return props.pickedLocation ? "some location" : "loading..";
  }

  return (
    <View
      style={{
        backgroundColor: "teal",
        justifyContent: "space-around",
        flexDirection: "column",
        paddingTop: 30,
        paddingBottom: 10,
        padding: 10,
      }}
    >
      <TouchableOpacity
        onPress={pickOnMapHandler}
        style={{
          margin: 10,
          borderRadius: 20,
          backgroundColor: "lightseagreen",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Ionicons style={{marginRight: 5}} name="location-outline" size={15} color={"white"} />
        <Text style={{color: 'white'}}>{getLocationName()}</Text>
      </TouchableOpacity>
      <MultipleSelectList
        badgeTextStyles={{
          color: "white",
        }}
        boxStyles={{
          borderRadius: 20,
          margin: 10,
          backgroundColor: "lightseagreen",
          borderWidth: 0,
          color: "white",
        }}
        dropdownStyles={{
          borderWidth: 0,
        }}
        dropdownTextStyles={{
          color: "white",
        }}
        checkBoxStyles={{
          borderColor: "white",
        }}
        labelStyles={{
          color: "white",
        }}
        setSelected={(val) => props.setSelected(val)}
        data={data}
        save="value"
        onSelect={() => {}}
        label="Filters"
        placeholder="Select filters"
        search={false}
        maxHeight={285}
        inputStyles={{ color: "white" }}
        selected={props.selected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputfield: {
    borderRadius: "50%",
    backgroundColor: "lightseagreen",
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
});

export default FilterBar;
