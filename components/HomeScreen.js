import { View, StyleSheet } from "react-native";
import CardList from "./CardList";
import * as React from "react";
import { useState } from "react";
import Animal from "./Animal";

export function HomeScreen() {

  // Animal detail page states
  const [showAnimal, setShowAnimal] = useState(false);
  const [animalProps, setAnimalProps] = useState({});

  // Filter settings
  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.cardListContainer}>
      {showAnimal ? (
        <Animal {...animalProps} setShowAnimal={setShowAnimal} />
      ) : (
        <CardList
          setAnimalProps={setAnimalProps}
          setShowAnimal={setShowAnimal}
          selected={selected}
          setSelected={setSelected}
          />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  cardListContainer: {
    flex: 1,
  },
});

