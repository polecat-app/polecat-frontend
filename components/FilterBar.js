import { useContext, useEffect, useState } from "react"
import { View, Text } from "react-native"
import { LocationContext } from "../store/locationContext"


function FilterBar() {

  // Get location and loading state from from context
  const theme = useContext(LocationContext)
  const [location, setLocation] = useState("loading...")
  useEffect(() => {
      if (!theme.loading) {
        setLocation(theme.location.coords.latitude)
      }
    }, [theme]
  )

  return (
    <View style={{padding: 20, height: 150, backgroundColor: 'teal', justifyContent: 'space-around', flexDirection: 'column'}}>
      <Text 
        style={{color: 'white', flex:1, fontSize: 25}} 
        numberOfLines={1}>
      {location}
      </Text>
    </View>
  )
}

export default FilterBar