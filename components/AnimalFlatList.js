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

function AnimalFlatList({ filterProps, timeOutValue }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersUpdating, setFiltersUpdating] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update results on change filterProps, after timeout
  useEffect(() => {
    !filtersUpdating && setFiltersUpdating(true);
    const delayDebounceFn = setTimeout(() => {
      setPage(0);
      setFiltersUpdating(false);
    }, timeOutValue);
    return () => clearTimeout(delayDebounceFn);
  }, [filterProps]);

  useEffect(() => {
    if (!filtersUpdating) {
      fetchData();
    }
  }, [page, filtersUpdating]);

  const fetchData = async () => {
    setIsLoading(true);
    const newAnimals = await getAnimals({
      filterProps: filterProps,
      page: page,
    });
    if (page === 0) {
      setData(newAnimals);
    } else {
      setData((data) => [...data, ...newAnimals]);
    }
    setIsLoading(false);
  };

  const fetchMoreData = () => {
    if (!isLoading) {
      setPage((page) => page + 1);
    }
  };

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onRefresh = async () => {
    setIsRefreshing(true);
    await timeout(timeOutValue);
    setPage(() => 0);
    setIsRefreshing(false);
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  };

  return filtersUpdating ? (
    <ScrollView style={styles.scrollViewContainer}>
      {[...Array(10).keys()].map((item) => (
        <AnimalCardSkeleton key={item} />
      ))}
    </ScrollView>
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.scrollViewContainer}
      renderItem={({ item }) => <AnimalCard key={item.id} {...item} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreData}
    />
  );
}

export default AnimalFlatList;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: Offsets.DefaultMargin,
    paddingBottom: Offsets.DefaultMargin
  },
});
