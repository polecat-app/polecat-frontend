import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MultipleSelectList from "./MultipleSelectList";
import { SpeciesTags, OccuranceTags } from "./Tag";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";
import { useEffect, useState } from "react";
import getAddressFromCoordinates from "../util/GetAddress";

function FilterBar(props) {
  const navigation = useNavigation();
  const [locationName, setLocationName] = useState("Loading location..")

  const allTags = Object.keys({ ...SpeciesTags, ...OccuranceTags });
  const data = allTags.map((tag) => ({ key: tag, value: tag }));

  // Navigate to the map location picker
  function pickOnMapHandler() {
    navigation.navigate("Map", {
      pickedLocation: props.pickedLocation,
    });
  }

  // Get location name by reverse geocoding
  useEffect(() => {
    if (props.pickedLocation) {
      getAddressFromCoordinates({
        latitude: props.pickedLocation.latitude, 
        longitude: props.pickedLocation.longitude, 
        setLocationName: setLocationName
        })
    }
    else {
      setLocationName("Loading location..")
    }
  }, [props.pickedLocation, setLocationName])

  return (
    <View style={styles.background}>
      <TouchableOpacity
        onPress={pickOnMapHandler}
        style={styles.inputfield}
      >
        <Ionicons
          style={{ marginRight: 5 }}
          name="location-outline"
          size={15}
          color={Colors.AccentIcon}
        />
        <Text style={textStyles.basicAccentBold}>{locationName}</Text>
      </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.AccentPrimary,
    justifyContent: "space-around",
    flexDirection: "column",
    paddingTop: 30,
    paddingBottom: Offsets.DefaultMargin,
    padding: Offsets.DefaultMargin,
  },
  inputfield: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: Colors.AccentSecondary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
});

export default FilterBar;
