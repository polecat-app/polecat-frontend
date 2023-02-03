import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Tag from "./Tag";
import { Colors } from "../styles/Colors";
import textStyles from "../styles/TextStyles";
import { Offsets } from "../styles/Offsets";

function MultipleSelectList({
  setSelected,
  placeholder,
  maxHeight,
  data,
  searchicon = false,
  closeicon = false,
  search = true,
  searchPlaceholder = "search",
  onSelect = () => {},
  label,
  notFoundText = "No data found",
  save = "key",
  dropdownShown = false,
  selected
}) {
  const [_firstRender, _setFirstRender] = useState(true);
  const [dropdown, setDropdown] = useState(dropdownShown);
  const [selectedval, setSelectedVal] = useState(selected);
  const [height, setHeight] = useState(350);
  const animatedvalue = React.useRef(new Animated.Value(0)).current;
  const [filtereddata, setFilteredData] = useState(data);

  const slidedown = () => {
    setDropdown(true);

    Animated.timing(animatedvalue, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  };

  React.useEffect(() => {
    if (maxHeight) setHeight(maxHeight);
  }, [maxHeight]);

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  React.useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false);
      return;
    }
    onSelect();
  }, [selectedval]);

  React.useEffect(() => {
    if (!_firstRender) {
      if (dropdownShown) slidedown();
      else slideup();
    }
  }, [dropdownShown]);

  return (
    <View>
      {dropdown && search ? (
        <View style={styles.wrapper}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            {searchicon}
            <TextInput
              placeholder={searchPlaceholder}
              onChangeText={(val) => {
                let result = data.filter((item) => {
                  val.toLowerCase();
                  let row = item.value.toLowerCase();
                  return row.search(val.toLowerCase()) > -1;
                });
                setFilteredData(result);
              }}
              style={
                { padding: 0, height: 20, flex: 1, color: Colors.AccentText }
              }
            />
            <TouchableOpacity
              onPress={() => {
                slideup();
                // setTimeout(() => setFilteredData(data), 800)
              }}
            >
              {closeicon}
            </TouchableOpacity>
          </View>
        </View>
      ) : selectedval?.length > 0 ? (
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <View>
            <Text style={textStyles.basicAccentBold}>
              {label}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              {selectedval?.map((item, index) => {
                return (
                  <View
                    style={{
                      marginTop: 10,
                    }}
                    key={item}
                  >
                    <Tag tag={item}></Tag>
                  </View>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <Text style={textStyles.basicAccentBold}>
            {selectedval == ""
              ? placeholder
                ? placeholder
                : "Select option"
              : selectedval}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            style={{ alignSelf: "center" }}
            size={15}
            color={Colors.AccentIcon}
          ></Ionicons>
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View
          style={[
            { maxHeight: animatedvalue },
            styles.dropdown
          ]}
        >
          <View style={[{ maxHeight: height }]}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 10 }}
              nestedScrollEnabled={true}
            >
              {filtereddata.length >= 1 ? (
                filtereddata.map((item, index) => {
                  let key = item.key ?? item.value ?? item;
                  let value = item.value ?? item;
                  let disabled = item.disabled ?? false;
                  if (disabled) {
                    return (
                      <TouchableOpacity
                        style={styles.disabledoption}
                        key={index}
                      >
                        <View
                          style={
                            {
                              width: 15,
                              height: 15,
                              marginRight: 10,
                              borderRadius: 3,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#c4c5c6",
                            }}
                        >
                          {selectedval?.includes(value) ? (
                            <Ionicons
                              name="checkmark-outline"
                              color={Colors.AccentIcon}
                            ></Ionicons>
                          ) : null}
                        </View>
                        <Text
                          style={
                            { color: "#c4c5c6" }
                          }
                        >
                          {value}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={styles.option}
                        key={index}
                        onPress={() => {
                          let existing = selectedval?.indexOf(value);
                          if (existing != -1 && existing != undefined) {
                            let sv = [...selectedval];
                            sv.splice(existing, 1);
                            setSelectedVal(sv);

                            setSelected((val) => {
                              let temp = [...val];
                              temp.splice(existing, 1);
                              return temp;
                            });

                            // onSelect()
                          } else {
                            if (save === "value") {
                              setSelected((val) => {
                                let temp = [...new Set([...val, value])];
                                return temp;
                              });
                            } else {
                              setSelected((val) => {
                                let temp = [...new Set([...val, key])];
                                return temp;
                              });
                            }

                            setSelectedVal((val) => {
                              let temp = [...new Set([...val, value])];
                              return temp;
                            });

                            // onSelect()
                          }
                        }}
                      >
                        <View
                          style={styles.checkmark}
                        >
                          {selectedval?.includes(value) ? (
                            <Ionicons
                              name="checkmark-outline"
                              color={Colors.AccentIcon}
                            ></Ionicons>
                          ) : null}
                        </View>
                        <Text style={textStyles.basicAccent}>
                          {value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelected(undefined);
                    setSelectedVal("");
                    slideup();
                    setTimeout(() => setFilteredData(data), 800);
                  }}
                >
                  <Text style={textStyles.basicAccent}>{notFoundText}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            {selectedval?.length > 0 ? (
              <Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 20,
                  }}
                ></View>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
}

export default MultipleSelectList;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: Offsets.DefaultMargin,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Offsets.DefaultMargin,
    borderRadius: 20,
    margin: Offsets.DefaultMargin,
    backgroundColor: Colors.AccentSecondary,
    borderWidth: 0,
    color: Colors.AccentText,
  },
  dropdown: {
    borderWidth: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  checkmark: {
    width: 15,
    height: 15,
    borderWidth: 1,
    marginRight: Offsets.DefaultMargin,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.AccentIcon
  }
});
