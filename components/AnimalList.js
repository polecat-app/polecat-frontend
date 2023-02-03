import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import useLocation from "../hooks/useLocation";
import AnimalCard from "./Card";
import FilterBar from "./FilterBar";

// Get animals
const animals = [
  {
    key: 0,
    binomial: "Mustela Putorius",
    commonName: "European Polecat",
    summary: `The European polecat (Mustela putorius), also known as the common polecat, 
black polecat, or forest polecat, is a species of mustelid native to western Eurasia and North 
Africa. It is of a generally dark brown colour, with a pale underbelly and a dark mask across 
the face. Occasionally, colour mutations including albinos, leucists, isabellinists, 
xanthochromists, amelanists and erythrists occur.[2] It has a shorter, more compact body 
than other Mustela species,[3] a more powerfully built skull and dentition,[4] is less agile,[5] 
and is well known for having the characteristic ability to secrete a 
particularly foul-smelling liquid to mark its territory.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Storm_the_polecat.jpg",
    tags: ["mammal", "endangered"],
  },
  {
    key: 1,
    binomial: "Alcedo atthis",
    commonName: "Common Kingfisher",
    summary: `The common kingfisher (Alcedo atthis), also known as the Eurasian kingfisher and river kingfisher, 
is a small kingfisher with seven subspecies recognized within its wide distribution across Eurasia and North Africa. It is resident in much of its range, but migrates from areas where rivers freeze in winter.
This sparrow-sized bird has the typical short-tailed, large-headed kingfisher profile; it has blue upperparts, orange underparts and a long bill. It feeds mainly on fish, caught by diving, and has special visual adaptations to enable it to see prey under water. The glossy white eggs are laid in a nest at the end of a burrow in a riverbank.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/92/%E2%99%82_Common_Kingfisher_%28Alcedo_atthis%29_Photograph_By_Shantanu_Kuveskar%2C_Mangaon%2C_Maharashtra%2C_India.jpg",
    tags: ["bird", "rare"],
  },
];

function AnimalList({ navigation, route }) {

  // Filter states
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const [pickedLocation, setPickedLocation] = useState(null);
  const isFocused = useIsFocused()

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

  return (
    <View style={{ flexDirection: "column", width: "100%", flex: 1 }}>
      <FilterBar
        selected={selected}
        setSelected={setSelected}
        pickedLocation={pickedLocation}
        setPickedLocation={setPickedLocation}
      />
      <ScrollView style={styles.scrollViewContainer}>
        {animals.map((animal) => (
          <AnimalCard key={animal.key} {...animal} />
        ))}
      </ScrollView>
    </View>
  );
}

export default AnimalList;

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginHorizontal: 10,
    flex: 10,
  },
});
