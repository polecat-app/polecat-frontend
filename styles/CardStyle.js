import { StyleSheet } from "react-native";


const cardStyle = StyleSheet.create({

    // Containers
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      height: 100,
      marginTop: 10,
    },
    textContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft: 3,
      height: 80,
      flex: 3,
    },
    imageContainer: {
      flex: 1,
      alignItems: "flex-end"
    },
  
    // Text
    commonName: {
      fontWeight: 'bold',
    },
    binomial: {
      fontStyle: 'italic',
      color: 'grey',
    },
    summary: {
      flex: 0,
      fontWeight: "300",
    },
  
    // Image
    image: {
      resizeMode: "cover",
      height: 80,
      width: 80,
      borderRadius: 40,
    }
  });

export default cardStyle