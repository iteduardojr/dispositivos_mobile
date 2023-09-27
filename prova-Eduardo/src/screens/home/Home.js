import { StyleSheet, View } from 'react-native'
import React, { useEffect, useInsertionEffect, useState } from 'react'
import Api from '../../services/Api'
import { FlatList } from 'react-native-gesture-handler'
import { Card, Text, Avatar, IconButton, Button } from 'react-native-paper'

export default function Home(props) {

    const navigation = props.navigation
    const [restaurantes, setRestaurantes] = useState([])

    useEffect(() => {

        Api.get('/food/restaurantes')
            .then(response => {
                
                setRestaurantes(response.data.restaurantes)
            })


    }, [])

    return (
        <View>

            <FlatList

                data={restaurantes}
                renderItem={({ item, index }) => {
                    return (<Card onPress={() =>{
                        navigation.navigate('Restaurantes', {id:item.id})
                    }}>
                        <Card.Title
                            title={item.nome}
                            subtitle={item.tipo_cozinha}
                            left={() => <Avatar.Image size={48} source={{ uri: item.imagem }} />}
                            right={() => <Button size={48} icon="chevron-right"/>}
                        />
                    </Card>
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({})