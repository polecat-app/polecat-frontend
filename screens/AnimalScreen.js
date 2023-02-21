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
import { AnimalCardSkeleton } from "../components/AnimalCard";
import { useEffect, useRef, useState } from "react";
import AnimalFlatList from "../components/AnimalFlatList";
import AnimalList from "../components/AnimalList";

function AnimalScreen({ navigation, route }) {
  const props = route.params;
  const [headerShown, setHeaderShown] = useState(false);
  const translation = useRef(new Animated.Value(-100)).current;
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: headerShown ? 0 : -100,
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
  }, [])

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 25,
          padding: Offsets.DefaultMargin,
          backgroundColor: Colors.AccentPrimary,
          transform: [{ translateY: translation }],
        }}
      >
        <View style={styles.row}>
          <Text style={textStyles.basicAccentBold} numberOfLines={1}>
            {props.commonName}
          </Text>
        </View>
      </Animated.View>
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
        {/* Top Image */}
        <View style={styles.top}>
          <ImageBackground style={styles.image} source={{ uri: props.image }} />

          {/* Elements on Image */}
          <View style={styles.onImage}>
            <Pressable onPress={() => navigation.navigate("List")}>
              <Ionicons
                name={"arrow-back-outline"}
                size={32}
                style={styles.close}
              />
            </Pressable>
            <View style={styles.onImageBottom}>
              <Text
                style={[styles.commonName, textStyles.overlayBold]}
                numberOfLines={3}
              >
                {props.commonName}
              </Text>
            </View>
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
        <AnimalList filterProps={filterProps} timeOutValue={2000} listLength={5}></AnimalList>
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
    justifyContent: "center",
  },
  background: {
    backgroundColor: Colors.Primary,
    flex: 1,
    width: "100%",
  },
  commonName: {
    flex: 3,
  },
  top: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 500,
  },
  onImage: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    zIndex: 5,
    position: "absolute",
    padding: Offsets.DefaultMargin,
  },
  onImageBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
    marginRight: Offsets.DefaultMargin,
    marginTop: Offsets.DefaultMargin,
    color: Colors.AccentIcon,
    opacity: 0.8,
    alignSelf: "flex-start",
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
