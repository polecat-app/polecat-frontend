import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

const textStyles = StyleSheet.create({
  // Basic
  basic: {
    color: Colors.Text,
    lineHeight: 20,
  },
  basicBold: {
    fontWeight: "bold",
    color: Colors.Text,
  },
  basicItalic: {
    fontStyle: "italic",
    color: Colors.TextSecondary,
  },

  // Accent
  basicAccent: {
    color: Colors.AccentText,
    fontWeight: "300",
  },
  basicAccentBold: {
    fontWeight: "bold",
    color: Colors.AccentText,
    lineHeight: 20,
    flexShrink: 1,
    height: 20,
    ellipsizeMode: "tail",
  },
  basicAccentItalic: {
    fontStyle: "italic",
    color: Colors.AccentText,
  },

  // Overlay
  overlayBold: {
    fontWeight: "bold",
    color: Colors.AccentText,
    fontSize: 25,
  },

  // Search
  searchAccentBold: {
    fontWeight: "bold",
    color: Colors.AccentText,
    height: 20,
  },
});

export default textStyles;
