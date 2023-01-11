import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import CardList from './components/CardList';

export default function App() {

  // Get animals
  const animals = [
    {
      'key': 0,
      'binomial': 'Mustela Putorius',
      'commonName': 'European Polecat',
      'summary': 'Best animal ever.',
      'image': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Storm_the_polecat.jpg'
    },
    {
      'key': 1,
      'binomial': 'Alcedo atthis',
      'commonName': 'Common Kingfisher',
      'summary': 'The flight of the kingfisher is fast, direct and usually low over water.',
      'image': 'https://upload.wikimedia.org/wikipedia/commons/9/92/%E2%99%82_Common_Kingfisher_%28Alcedo_atthis%29_Photograph_By_Shantanu_Kuveskar%2C_Mangaon%2C_Maharashtra%2C_India.jpg'
    },

  ]

  return (
    <View style={styles.cardListContainer}>
      <CardList animals={animals}/>
    </View>
  );
}

const styles = StyleSheet.create({
  cardListContainer: {
      flex: 1,
  }
})