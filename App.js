import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Yannicks app wow insane</Text>
      <Button title='Tap me!'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Text styling can be defined outside stylesheet object,
  // but within object VScode will autocomplete
  text: {
    margin: 16,
    padding: 16
  }
});
