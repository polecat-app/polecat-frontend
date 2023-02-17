import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Tag from "../components/Tag";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import { AnimalCardSkeleton } from "../components/AnimalCard";

function AnimalScreen({ navigation, route }) {
  const props = route.params;

  return (
    <ScrollView style={styles.background}>
      {/* Background Image */}
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
      <View style={styles.scrollView}>
        <Text
          style={{ ...textStyles.basicItalic, marginVertical: gap / 2 }}
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
              <View key={item}>
                <Tag tag={item}></Tag>
              </View>
            );
          })}
        </View>
        <Text
          style={{
            ...textStyles.basic,
            marginVertical: gap / 2,
            textAlign: "left",
          }}
        >
          {props.summary}
        </Text>
      </View>

      <View style={styles.scrollViewContainer}>
      {[...Array(5).keys()].map((item) => (
        <AnimalCardSkeleton key={item} />
      ))}
    </View>
    </ScrollView>
  );
}

const gap = 25;

const styles = StyleSheet.create({
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
    aspectRatio: 1
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
  },
  scrollView: {
    marginVertical: 5,
    padding: 20,
    flexDirection: "column",
    flex: 1,
    paddingVertical: gap / -2,
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
  scrollViewContainer: {
    paddingHorizontal: Offsets.DefaultMargin,
    backgroundColor: Colors.Secondary
  },
});

export default AnimalScreen;
