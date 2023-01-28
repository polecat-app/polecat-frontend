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

function MultipleSelectList({
  fontFamily,
  setSelected,
  placeholder,
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight,
  data,
  searchicon = false,
  closeicon = false,
  search = true,
  searchPlaceholder = "search",
  onSelect = () => {},
  label,
  notFoundText = "No data found",
  disabledItemStyles,
  disabledTextStyles,
  disabledCheckBoxStyles,
  labelStyles,
  checkBoxStyles,
  save = "key",
  dropdownShown = false,
}) {
  const [_firstRender, _setFirstRender] = useState(true);
  const [dropdown, setDropdown] = useState(dropdownShown);
  const [selectedval, setSelectedVal] = useState([]);
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
        <View style={[styles.wrapper, boxStyles]}>
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
              style={[
                { padding: 0, height: 20, flex: 1, fontFamily },
                inputStyles,
              ]}
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
          style={[styles.wrapper, boxStyles]}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <View>
            <Text style={[{ fontWeight: "600", fontFamily }, labelStyles]}>
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
                  >
                    <Tag key={index} tag={item}></Tag>
                  </View>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.wrapper, boxStyles]}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <Text style={[{ fontFamily }, inputStyles]}>
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
            color="white"
          ></Ionicons>
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View
          style={[
            { maxHeight: animatedvalue },
            styles.dropdown,
            dropdownStyles,
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
                        style={[styles.disabledoption, disabledItemStyles]}
                        key={index}
                      >
                        <View
                          style={[
                            {
                              width: 15,
                              height: 15,
                              marginRight: 10,
                              borderRadius: 3,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#c4c5c6",
                            },
                            disabledCheckBoxStyles,
                          ]}
                        >
                          {selectedval?.includes(value) ? (
                            <Ionicons
                              name="checkmark-outline"
                              color="white"
                            ></Ionicons>
                          ) : null}
                        </View>
                        <Text
                          style={[
                            { fontFamily, color: "#c4c5c6" },
                            disabledTextStyles,
                          ]}
                        >
                          {value}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={[styles.option, dropdownItemStyles]}
                        key={index}
                        onPress={() => {
                          let existing = selectedval?.indexOf(value);

                          // console.log(existing);

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
                          style={[
                            {
                              width: 15,
                              height: 15,
                              borderWidth: 1,
                              marginRight: 10,
                              borderColor: "gray",
                              borderRadius: 3,
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            checkBoxStyles,
                          ]}
                        >
                          {selectedval?.includes(value) ? (
                            <Ionicons
                              name="checkmark-outline"
                              color="white"
                            ></Ionicons>
                          ) : null}
                        </View>
                        <Text style={[{ fontFamily }, dropdownTextStyles]}>
                          {value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <TouchableOpacity
                  style={[styles.option, dropdownItemStyles]}
                  onPress={() => {
                    setSelected(undefined);
                    setSelectedVal("");
                    slideup();
                    setTimeout(() => setFilteredData(data), 800);
                  }}
                >
                  <Text style={dropdownTextStyles}>{notFoundText}</Text>
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
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
});
