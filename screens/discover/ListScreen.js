import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import useLocation from "../../hooks/useLocation";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import getAddressFromCoordinates from "../../util/GetAddress";
import TopBarContainer from "../../components/TopBarContainer";
import AnimalFlatList from "../../components/AnimalFlatList";

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
      commonName: searchPhrase,
      tags: selected,
      liked: null,
      seen: null,
      location: pickedLocation,
    });
  }, [selected, pickedLocation, searchPhrase]);

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
      <AnimalFlatList filterProps={filterProps} timeOutValue={1500}></AnimalFlatList>
    </View>
  );
}

export default ListScreen;
