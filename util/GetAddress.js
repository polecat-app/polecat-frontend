import { HERE_API_KEY } from 'react-native-dotenv'

function getAddressFromCoordinates({ latitude, longitude, setLocationName }) {

  return new Promise((resolve) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${HERE_API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then((resJson) => {
        // the response had a deeply nested structure :/
        if (resJson
          && resJson.items
          && resJson.items[0].address
          && resJson.items[0].address.city
          && resJson.items[0].address.countryName) {
          setLocationName(resJson.items[0].address.city + ", " + resJson.items[0].address.countryName)
        } else {
          setLocationName("")
        }
      })
      .catch((e) => {
        console.log('Error in getAddressFromCoordinates', e)
        setLocationName("")
      })
  })
}

export default getAddressFromCoordinates