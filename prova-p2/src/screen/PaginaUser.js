import { StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Api from '../services/Api'
import { Card, Text } from 'react-native-paper'

export default function PaginaUser(props) {
    const { navigation } = props

    const idPeaple = props.route.params
    const [topRated, setTopRated] = useState([])
    const [posts, setPosts] = useState([])

    console.log(posts)

    useEffect(() => {
        try {
            Api.get('/users/' + idPeaple).then(response => {
                setTopRated(response.data)
            })
            Api.get('/users/' + idPeaple + '/posts').then(response => {
                setPosts(response.data.posts)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: topRated.firstName });
    }, [navigation, topRated.firstName]);


    // console.log(topRated)

    return (
        <View style={{padding: 10}}>
            <Text style={{ color: 'white' }}>{topRated.firstName}</Text>
            <Card>
                <Card.Cover source={{ uri: topRated.image }} />
            </Card>
            <Text style={{ color: 'white' }}>{posts.body}</Text>

        </View>
    )
}

const styles = StyleSheet.create({})