import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.text} placeholder='Course goal'/>
        <Button title='Add goal'/>
        <Text>List of goals...</Text>
      </View>
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  // Text styling can be defined outside stylesheet object,
  // but within object VScode will autocomplete
  text: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 8
  }
});
