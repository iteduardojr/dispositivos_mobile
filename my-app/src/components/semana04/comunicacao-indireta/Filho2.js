import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Filho2(props) {
  function gerarNumeroAleatorio(){
    const delta = max - min 
    const numeroAleatorio = Math.floor(Math.random() * delta) + min
    return numeroAleatorio;
  }


  return (
    <View>
      <Button tittle='Gerar número aleatório' 
      onPress={() => {
        const numeroAleatorio = gerarNumeroAleatorio(props.min, props.max);
        props.setNumero}}/>
    </View>
  )
}

const styles = StyleSheet.create({})