import { StyleSheet, View } from 'react-native'
import React, { useEffect, useInsertionEffect, useState } from 'react'
import Api from '../../services/Api'
import { FlatList } from 'react-native-gesture-handler'
import { Card, Text, Avatar, IconButton, Button } from 'react-native-paper'

export default function Home(props) {

    const navigation = props.navigation
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {

        Api.get('/users')
            .then(response => {
                console.log(response.data.users)
                setUsuarios(response.data.users)
            })

            .catch(error => {
                console.error("Deu erro ao buscar Usuarios", error)
            })

    }, [])

    return (
        <View>

            <FlatList

                data={usuarios}
                renderItem={({ item, index }) => {
                    return (<Card onPress={() =>{
                        navigation.navigate('Usuario', {id:item.id})
                    }}>
                        <Card.Title
                            title={item.username}
                            subtitle={item.email}
                            left={() => <Avatar.Image size={48} source={{ uri: item.image }} />}
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