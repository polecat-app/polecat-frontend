import { useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LocationContext } from "../store/locationContext";
import MultipleSelectList from "./MultipleSelectList";
import { SpeciesTags, OccuranceTags } from "./Tag";

function FilterBar() {
  // Get location and loading state from from context
  const theme = useContext(LocationContext);

  // Label select dropdown state
  const [selected, setSelected] = useState("");

  const allTags = Object.keys({ ...SpeciesTags, ...OccuranceTags });
  const data = allTags.map((tag) => ({ key: tag, value: tag }));

  return (
    <View
      style={{
        backgroundColor: "teal",
        justifyContent: "space-around",
        flexDirection: "column",
        paddingTop: 30,
        paddingBottom: 10,
        padding: 10,
      }}
    >
      <Pressable
        style={{
          margin: 10,
          borderRadius: 20,
          backgroundColor: "lightseagreen",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: "white", flex: 1 }} numberOfLines={1}>
          {theme.loading ? "loading location..." : theme.location.coords.latitude}
        </Text>
      </Pressable>
      <MultipleSelectList
        badgeTextStyles={{
          color: "white",
        }}
        boxStyles={{
          borderRadius: 20,
          margin: 10,
          backgroundColor: "lightseagreen",
          borderWidth: 0,
          color: "white",
        }}
        dropdownStyles={{
          borderWidth: 0,
        }}
        dropdownTextStyles={{
          color: "white",
        }}
        checkBoxStyles={{
          borderColor: "white",
        }}
        labelStyles={{
          color: "white",
        }}
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        onSelect={() => {}}
        label="Filters"
        placeholder="Select filters"
        search={false}
        maxHeight={285}
        inputStyles={{ color: "white" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputfield: {
    borderRadius: "50%",
    backgroundColor: "lightseagreen",
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
});

export default FilterBar;
