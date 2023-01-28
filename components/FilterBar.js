import { useContext, useEffect, useState } from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import { LocationContext } from "../store/locationContext"


function FilterBar() {

  // Get location and loading state from from context
  const theme = useContext(LocationContext)

  return (
    <View style={{
      padding: 20, 
      height: 150, 
      backgroundColor: 'teal', 
      justifyContent: 'space-around', 
      flexDirection: 'column',
      paddingTop: 30
    }}>
      <Pressable style={{
        borderRadius: '50%', 
        backgroundColor: 'lightseagreen', 
        flexDirection: 'row',
        alignItems: 'center',
        padding:8,
      }}>
        <Text 
          style={{color: 'white', flex:1}} 
          numberOfLines={1}>
        {theme.loading? 'loading...':theme.location.coords.latitude}
        </Text>
      </Pressable>
      <Pressable 
        style={{
          borderRadius: '50%', 
          backgroundColor: 'lightseagreen', 
          flexDirection: 'row',
          alignItems: 'center',
          padding:8,
        }}
        onPress={() => {}}
        >
        <Text 
          style={{color: 'white', flex:1}} 
          numberOfLines={1}>
        filters..
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  inputfield: {
    borderRadius: '50%', 
    backgroundColor: 'lightseagreen', 
    marginRight: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    padding:8,
  }
})

export default FilterBar