import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Tag from "./Tag";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";

function Animal({ navigation, route }) {
  const [seen, setSeen] = useState(false);
  const [love, setlove] = useState(false);
  const props = route.params;

  function toggleSeen() {
    setSeen(!seen);
  }
  function toggleLove() {
    setlove(!love);
  }

  return (
    <View style={styles.background}>
      {/* Background Image */}
      <ImageBackground style={styles.image} source={{ uri: props.image }} />

      <View style={styles.container}>
        {/* Elements on Image */}
        <View style={styles.onImage}>
          <Pressable onPress={() => navigation.navigate("AnimalList")}>
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

        {/* Description Text */}
        <ScrollView>
          <View style={styles.scrollView}>
            <Text
              style={{ ...textStyles.basicItalic, marginVertical: gap / 2 }}
              numberOfLines={3}
            >
              {props.binomial}
            </Text>
            <ScrollView
              style={{ flexDirection: "row", paddingHorizontal: gap / -2 }}
              horizontal={true}
            >
              {props.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </ScrollView>
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
        </ScrollView>
      </View>
    </View>
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
  onImage: {
    height: 320,
    justifyContent: "space-between",
    flexDirection: "column",
    zIndex: 5,
    padding: Offsets.DefaultMargin,
  },
  onImageBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  image: {
    height: 320,
    width: "100%",
    justifyContent: "center",
  },
  scrollView: {
    marginVertical: 5,
    padding: 20,
    flexDirection: "column",
    flex: 1,
    paddingVertical: gap / -2,
  },
  container: {
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    height: "100%",
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
});

export default Animal;
