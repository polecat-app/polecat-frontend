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
});

export default textStyles;
