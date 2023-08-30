import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function digiteseunome() {

    const[nome, setNome] = useState('')
    const[valorDigitado, setValorDigitado] = useState('')

  return (
    <View>
      <Text style={styles.texto}>digite seu nome</Text>
      <Text style={styles.texto}>{nome}</Text>

      <TextInput style={styles.input}
      onChangeText={e => setValorDigitado(e)}/>

      <Button tittle='Enviar' onPress={() =>setNome(valorDigitado)} placeholder='Digite seu nome'/>
    

    </View>
  )
}

const styles = StyleSheet.create({
    texto:{
        fontSize:30,
        fontWeight:'bold',
    },

    input:{
        fontSize:30,
        color:'red',
        borderWidth: 2,
        margin: 10,
    }
})