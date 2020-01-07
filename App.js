import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import './src/config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
console.tron.log('hello');
