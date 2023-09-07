import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile from './components/semana05/Profile'

export default function App() {
  return (
    <View style={styles.container}>
      <Profile 
      imgUri='https://www.fakepersongenerator.com/Face/female/female1022545970764.jpg'
      genero='Feminino'
      nome='Ana Anabel Analia'
      email='abracadabra@gmail.com'
      telefone='33443-324234-32432'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})