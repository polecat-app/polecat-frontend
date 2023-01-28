import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Button,
  ImageBackground,
  ScrollView,
} from "react-native";
import cardStyle from "../styles/CardStyle";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Tag from "./Tag";

function Animal(props) {
  const [seen, setSeen] = useState(false);
  const [love, setlove] = useState(false);
  function toggleSeen() {
    setSeen(!seen);
  }
  function toggleLove() {
    setlove(!love);
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1, width: "100%" }}>
      {/* Background Image */}
      <ImageBackground style={modalStyle.image} source={{ uri: props.image }} />

      <View style={modalStyle.container}>
        {/* Elements on Image */}
        <View style={modalStyle.onImage}>
          <Pressable onPress={() => props.setShowAnimal(false)}>
            <Ionicons
              name={"ios-close-circle"}
              size={50}
              style={modalStyle.close}
            />
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={modalStyle.commonName} numberOfLines={3}>
              {props.commonName}
            </Text>

            {/* Buttons */}
            <View style={modalStyle.buttonSet}>
              <Pressable onPress={() => toggleSeen()}>
                <Ionicons
                  name={seen ? "eye" : "eye-outline"}
                  size={32}
                  style={
                    seen ? modalStyle.seenSelected : modalStyle.seenUnselected
                  }
                />
              </Pressable>
              <Pressable onPress={() => toggleLove()}>
                <Ionicons
                  name={love ? "heart" : "heart-outline"}
                  size={32}
                  style={
                    love ? modalStyle.loveSelected : modalStyle.loveUnselected
                  }
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Description Text */}
        <ScrollView>
          <View style={modalStyle.scrollView}>
            <Text
              style={{ ...cardStyle.binomial, marginVertical: gap / 2 }}
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
                ...cardStyle.summary,
                marginVertical: gap / 2,
                textAlign: "justify",
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

const gap = 20;

const modalStyle = StyleSheet.create({
  commonName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    flex: 3,
  },
  onImage: {
    height: 320,
    justifyContent: "space-between",
    flexDirection: "column",
    zIndex: 5,
    padding: 10,
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
  seenUnselected: {
    color: "white",
    opacity: 0.8,
  },
  seenSelected: {
    color: "teal",
  },
  loveUnselected: {
    color: "white",
    opacity: 0.8,
  },
  loveSelected: {
    color: "red",
  },
  close: {
    marginLeft: 10,
    marginTop: 10,
    color: "white",
    opacity: 0.8,
    alignSelf: "flex-end",
  },
});

export default Animal;
