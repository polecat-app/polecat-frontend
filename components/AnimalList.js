import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Offsets } from "../styles/Offsets";
import { getAnimals } from "../util/AnimalAPI";
import AnimalCard from "./AnimalCard";

function AnimalList({ filterProps }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setIsLoading(true);
    const newAnimals = await getAnimals({
      filterProps: filterProps,
      page: page,
    });
    if (page === 0) {
      setData(newAnimals)
    }
    else {
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
    return new Promise(resolve => setTimeout(resolve, ms));
}

  const onRefresh = async () => {
    setIsRefreshing(true)
    await timeout(1000)
    setPage(() => 0)
    setIsRefreshing(false)
  };

  // Timeout and send request for animal list after delay
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     getAnimals({
  //       setLoading: setIsLoading,
  //       setAnimals: setData,
  //       filterProps: filterProps,
  //     });
  //   }, 500);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [filterProps]);

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key.toString()}
      contentContainerStyle={styles.scrollViewContainer}
      renderItem={({ item }) => <AnimalCard key={item.key} {...item} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      // ListFooterComponent={renderFooter}
      onEndReachedThreshold={0}
      onEndReached={fetchMoreData}
    />
  );
}

export default AnimalList;

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginHorizontal: Offsets.DefaultMargin,
  },
});
