import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import useLocation from "../../hooks/useLocation";
import { Offsets } from "../../styles/Offsets";
import AnimalCard from "../../components/AnimalCard";
import FilterBar from "../../components/FilterBar";
import { Bars } from "../../util/Constants";
import SearchBar from "../../components/SearchBar";
import getAddressFromCoordinates from "../../util/GetAddress";
import SavedBar from "../../components/SavedBar";
import { Colors } from "../../styles/Colors";
import { getAnimals } from "../../util/AnimalAPI";

function ListScreen({ navigation, route }) {
  // Filter states
  const [selected, setSelected] = useState([]);
  const isFocused = useIsFocused();
  const [selectedBar, setSelectedBar] = useState(Bars.FilterBar);
  const [filterProps, setFilterProps] = useState({
    commonName: null,
    tags: null,
    liked: null,
    seen: null,
    location: null,
  });

  // Location states
  const location = useLocation();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationName, setLocationName] = useState("Loading location..");

  // Search states
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  // Saved states
  const [savedFilterState, setSavedFilterState] = useState(null);

  // List states
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        latitude: route.params.selectedLocation.latitude,
        longitude: route.params.selectedLocation.longitude,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  // Set initial location to current location
  useEffect(() => {
    if (location && !pickedLocation) {
      setPickedLocation(location);
    }
  }, [location, pickedLocation]);

  // Get location name by reverse geocoding
  useEffect(() => {
    if (pickedLocation) {
      getAddressFromCoordinates({
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude,
        setLocationName: setLocationName,
      });
    } else {
      setLocationName("Loading location..");
    }
  }, [pickedLocation]);

  // Update search query
  useEffect(() => {
    setFilterProps({
      commonName: null,
      tags: selected,
      liked: null,
      seen: null,
      location: pickedLocation,
    });
  }, [selected, pickedLocation]);
  useEffect(() => {
    setFilterProps({
      commonName: searchPhrase,
      tags: null,
      liked: null,
      seen: null,
      location: null,
    });
  }, [searchPhrase]);
  useEffect(() => {
    setFilterProps({
      commonName: null,
      tags: null,
      liked: savedFilterState === "Liked" ? true : null,
      seen: savedFilterState === "Seen" ? true : null,
      location: null,
    });
  }, [savedFilterState]);

  // Timeout and send request for animal list after delay
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAnimals({
        setLoading: setLoading,
        setAnimals: setAnimals,
        filterProps: filterProps,
      });
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [filterProps]);

  return (
    <View style={{ flexDirection: "column", width: "100%", flex: 1 }}>
      <View style={styles.barContainer}>
        {selectedBar === Bars.SearchBar && (
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            setSelectedBar={setSelectedBar}
          ></SearchBar>
        )}
        {selectedBar === Bars.SavedBar && (
          <SavedBar
            setSelectedBar={setSelectedBar}
            setSavedFilterState={setSavedFilterState}
          ></SavedBar>
        )}
        {selectedBar === Bars.FilterBar && (
          <FilterBar
            selected={selected}
            setSelected={setSelected}
            pickedLocation={pickedLocation}
            setSelectedBar={setSelectedBar}
            locationName={locationName}
          />
        )}
      </View>
      <Text>{loading && "loading.."}</Text>
      <ScrollView style={styles.scrollViewContainer}>
        {animals.map((animal) => (
          <AnimalCard key={animal.key} {...animal} />
        ))}
      </ScrollView>
    </View>
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: Colors.AccentPrimary,
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%",
    padding: Offsets.LargeMargin,
    paddingTOp: Offsets.LargeMargin * 2,
  },
  scrollViewContainer: {
    marginHorizontal: Offsets.DefaultMargin,
    flex: 10,
  },
});
