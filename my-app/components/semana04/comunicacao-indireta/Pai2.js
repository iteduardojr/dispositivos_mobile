import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Filho from './Filho2'

export default function Pai2() {

  const[numero, setNumero] = useState(0)

  function alterarNumero(valor){
    setNumero(valor)
  }

  

  return (
    <View>
      <Text style={{fontSize:30}}>O numero aleatorio é?</Text>
      <Text style={{fontSize:30}}>{numero}</Text>

      <Filho min={1} max={60}/>
    </View>
  )
}

const styles = StyleSheet.create({})