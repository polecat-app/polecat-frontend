import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <TextInput placeholder='Course goal'/>
        <Button title='Add goal'/>
      </View>
      <View>
        <Text>List of goals...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    alignItems: 'center',
    justifyContent: 'top',
  },
  // Text styling can be defined outside stylesheet object,
  // but within object VScode will autocomplete
  text: {
    margin: 16,
    padding: 16
  }
});
