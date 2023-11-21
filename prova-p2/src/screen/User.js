import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function User({ route }) {
    const { userData } = route.params;
    return (
        <View>
            <Text>Nome: {userData.nome}</Text>
            <Text>Email: {userData.email}</Text>
            <Text>CPF: {userData.cpf}</Text>
            <Text>CEP: {userData.cep}</Text>
            <Text>Localização: {userData.localizacao}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
