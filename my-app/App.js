import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Cronometro from './components/semana05/Cronometro'
import { setStatusBarBackgroundColor } from 'expo-status-bar'

export default function App() {
  return (
    <View style={styles.container}> 

      <Cronometro />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  }
})