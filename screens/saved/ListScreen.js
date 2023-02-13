import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Offsets } from "../../styles/Offsets";
import AnimalCard from "../../components/AnimalCard";
import SavedBar from "../../components/SavedBar";
import { Colors } from "../../styles/Colors";
import { getAnimals } from "../../util/AnimalAPI";

function ListScreen({ navigation, route }) {

  // Filter states
  const [filterProps, setFilterProps] = useState({
    commonName: null,
    tags: null,
    liked: null,
    seen: null,
    location: null,
  });
  
  // Saved states
  const [savedFilterState, setSavedFilterState] = useState(null);

  // List states
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);

  // Update search query
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
          <SavedBar
            setSavedFilterState={setSavedFilterState}
          ></SavedBar>
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
