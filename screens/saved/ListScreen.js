import { useEffect, useState } from "react";
import { View } from "react-native";
import SavedBar from "../../components/SavedBar";
import TopBarContainer from "../../components/TopBarContainer";
import AnimalFlatList from "../../components/AnimalFlatList";

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

  return (
    <View style={{ flexDirection: "column", width: "100%", flex: 1 }}>
      <TopBarContainer>
        <SavedBar setSavedFilterState={setSavedFilterState}></SavedBar>
      </TopBarContainer>
      <AnimalFlatList filterProps={filterProps} timeOutValue={500}></AnimalFlatList>
    </View>
  );
}

export default ListScreen;
