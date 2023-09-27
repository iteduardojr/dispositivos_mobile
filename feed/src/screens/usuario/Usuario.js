import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../services/Api'
import { Avatar, Button, Card } from 'react-native-paper'

export default function Usuario(props) {
    const [usuario, setUsuario] = useState()
    const usuarioId = props.route.params.id
    const navigation = props.navigation

    useEffect(() => {

        Api.get('/users/' + usuarioId)
            .then(response => {
                setUsuario(response.data)

            })

            .catch(error => {
                console.error("Deu erro ao buscar Usuarios", error)
            })

    }, [])



    return (
        <View>
            <Card onPress={() => {
                navigation.navigate('Posts', usuario)
             }}>
                <Card.Title
                    title={usuario?.username}
                    subtitle={usuario?.email}
                    left={() => <Avatar.Image size={48} source={{ uri: usuario?.image }} />}
                    right={() => <Button size={48} icon="chevron-right" />}
                />

                <Card.Cover source={{ uri: usuario?.image }} />
                <Card.Content>
                    <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <Text variant="titleLarge">Name:</Text>
                    <Text variant="titleLarge">{usuario?.firstName} {usuario?.lastName}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <Text variant="titleLarge">Email:</Text>
                    <Text variant="titleLarge">{usuario?.email}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <Text variant="titleLarge">Número:</Text>
                    <Text variant="titleLarge">{usuario?.phone}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <Text variant="titleLarge">Idade:</Text>
                    <Text variant="titleLarge">{usuario?.age}</Text>
                    </View>
                  
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({})