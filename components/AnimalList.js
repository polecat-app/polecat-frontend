import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Offsets } from "../styles/Offsets";
import { getAnimals } from "../util/AnimalAPI";
import { AnimalCard, AnimalCardSkeleton } from "./AnimalCard";

function AnimalList({ filterProps, timeOutValue, listLength }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersUpdating, setFiltersUpdating] = useState(true);

  // Update results on change filterProps, after timeout
  useEffect(() => {
    !filtersUpdating && setFiltersUpdating(true);
    const delayDebounceFn = setTimeout(() => {
      setFiltersUpdating(false);
    }, timeOutValue);
    return () => clearTimeout(delayDebounceFn);
  }, [filterProps]);

  useEffect(() => {
    if (!filtersUpdating) {
      fetchData();
    }
  }, [filtersUpdating]);

  const fetchData = async () => {
    setIsLoading(true);
    const newAnimals = await getAnimals({
      filterProps: filterProps,
      page: 0,
    });
    setData(newAnimals.slice(0, listLength));
    setIsLoading(false);
  };

  return (filtersUpdating || isLoading)? (
    <ScrollView style={styles.scrollViewContainer}>
      {[...Array(listLength).keys()].map((item) => (
        <AnimalCardSkeleton key={item} />
      ))}
    </ScrollView>
  ) : (
    <ScrollView style={styles.scrollViewContainer}>
      {data.map(item => <AnimalCard key={item.key} {...item} />)}
    </ScrollView>
  );
}

export default AnimalList;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: Offsets.DefaultMargin,
    paddingBottom: Offsets.DefaultMargin
  },
});
