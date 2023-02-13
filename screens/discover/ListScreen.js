import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import useLocation from "../../hooks/useLocation";
import { Offsets } from "../../styles/Offsets";
import AnimalCard from "../../components/AnimalCard";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import getAddressFromCoordinates from "../../util/GetAddress";
import { getAnimals } from "../../util/AnimalAPI";
import TopBarContainer from "../../components/TopBarContainer";

function ListScreen({ navigation, route }) {
  // Filter states
  const [selected, setSelected] = useState([]);
  const isFocused = useIsFocused();
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
      <TopBarContainer>
        {clicked && (
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            setClicked={setClicked}
          ></SearchBar>
        )}
        {!clicked && (
          <FilterBar
            selected={selected}
            setSelected={setSelected}
            pickedLocation={pickedLocation}
            locationName={locationName}
            setClicked={setClicked}
          />
        )}
      </TopBarContainer>
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
  scrollViewContainer: {
    marginHorizontal: Offsets.DefaultMargin,
    flex: 10,
  },
});
