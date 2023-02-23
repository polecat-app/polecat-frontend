import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Tag from "../components/Tag";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import { useEffect, useRef, useState } from "react";
import AnimalList from "../components/AnimalList";

function AnimalScreen({ navigation, route }) {
  const props = route.params;
  const [headerShown, setHeaderShown] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: headerShown ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [headerShown]);

  const [filterProps, setFilterProps] = useState({
    commonName: null,
    tags: null,
    liked: null,
    seen: null,
    location: null,
  });

  useEffect(() => {
    setFilterProps({
      commonName: null,
      tags: [props.tags[0]],
      liked: null,
      seen: null,
      location: null,
    });
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>

      {/* Animated top bar */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 5,
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 25,
          padding: Offsets.DefaultMargin,
          backgroundColor: Colors.AccentPrimary,
          opacity: opacity,
        }}
      >
        <View style={{ height: 28 }}></View>
      </Animated.View>

      {/* Top bar content */}
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate("List")}>
          <Ionicons
            name={"arrow-back-outline"}
            size={28}
            style={styles.close}
          />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => navigation.navigate("List")}>
            <Ionicons name={"heart-outline"} size={28} style={styles.heart} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("List")}>
            <Ionicons
              name={"checkmark-outline"}
              size={28}
              style={styles.check}
            />
          </Pressable>
        </View>
      </View>

      {/* Animal content */}
      <ScrollView
        style={styles.background}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const scrolling = event.nativeEvent.contentOffset.y;

          if (scrolling > Math.min(500, windowWidth) - 50) {
            setHeaderShown(true);
          } else {
            setHeaderShown(false);
          }
        }}
      >
        {/* Top Image and name*/}
        <View style={styles.top}>
          <ImageBackground style={styles.image} source={{ uri: props.image }} />
          <View style={styles.onImage}>
              <Text
                style={[styles.commonName, textStyles.overlayBold]}
                numberOfLines={3}
              >
                {props.commonName}
              </Text>
          </View>
        </View>

        {/* Description Text */}
        <View style={styles.description}>
          <Text
            style={[textStyles.basicItalic, styles.descriptionItem]}
            numberOfLines={3}
          >
            {props.binomial}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {props.tags?.map((item, index) => {
              return (
                <View style={styles.descriptionItem} key={item}>
                  <Tag tag={item}></Tag>
                </View>
              );
            })}
          </View>
          <Text style={styles.header}>Summary</Text>
          <Text style={[textStyles.basic, styles.descriptionItem]}>
            {props.summary}
          </Text>
          <Text style={styles.header}>Range</Text>

          <Image
            resizeMode={"contain"}
            style={styles.rangeImage}
            source={{ uri: props.rangeImage }}
          />

          <Text style={styles.header}>Similar animals</Text>
        </View>
        <AnimalList
          filterProps={filterProps}
          timeOutValue={2000}
          listLength={5}
        ></AnimalList>
      </ScrollView>
    </View>
  );
}

const gap = 25;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 8,
    paddingTop: 25,
    paddingBottom: Offsets.DefaultMargin,
  },
  background: {
    flex: 1,
    width: "100%",
  },
  top: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 500,
  },
  onImage: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "column",
    zIndex: 5,
    position: "absolute",
    padding: Offsets.DefaultMargin,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "#e6e6e6",
  },
  rangeImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    backgroundColor: Colors.Primary,
  },
  description: {
    marginVertical: 5,
    padding: 20,
    flexDirection: "column",
    flex: 1,
    paddingVertical: gap / -2,
  },
  descriptionItem: {
    marginTop: Offsets.DefaultMargin,
  },
  header: {
    ...textStyles.header,
    marginTop: Offsets.LargeMargin,
  },
  buttonSet: {
    width: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1,
  },
  close: {
    marginLeft: Offsets.DefaultMargin,
    color: Colors.AccentIcon,
  },
  heart: {
    marginRight: Offsets.DefaultMargin,
    color: Colors.AccentIcon,
  },
  check: {
    marginRight: Offsets.DefaultMargin,
    color: Colors.AccentIcon,
  },
  closeFade: {
    color: Colors.Primary,
  },
  scrollViewContainer: {
    paddingHorizontal: Offsets.DefaultMargin,
    paddingBottom: Offsets.DefaultMargin,
    backgroundColor: Colors.Secondary,
  },
});

export default AnimalScreen;
