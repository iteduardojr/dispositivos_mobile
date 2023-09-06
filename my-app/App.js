import React from 'react';
import { View, StyleSheet } from 'react-native';
import BiscoitoSorte from './components/semana05/BiscoitoSorte';
// import BiscoitoSorte from './BiscoitoSorte';

export default function App() {
  return (
    <View style={styles.container}>
      <BiscoitoSorte/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});