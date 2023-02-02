import { GOOGLE_API_KEY } from 'react-native-dotenv'

function getMapPreview(lat, lng) {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=terrain&markers=color:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return mapPreviewUrl
}

export default getMapPreview