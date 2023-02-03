import React, { useState } from "react";


const LocationContext = React.createContext({})


function LocationProvider({children}) {

  // Set location state
  const [dummyState, setDummyState] = useState({});

  // Return context provider with state 
  return (
    <LocationContext.Provider value={dummyState}>
      {children}
    </LocationContext.Provider>
  )
}

export { LocationProvider, LocationContext}