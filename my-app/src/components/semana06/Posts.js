import { FlatList, Text, View } from 'react-native'
import React, { useState } from 'react'
import Api from '../../services/ApiDummy'
import { Card } from 'react-native-paper'

export default function Posts() {
    const [posts, setPosts] = useState([])

    Api.get('/posts').then(response => {
        setPosts(response.data.posts)
    })

    return (
        <View >
            <FlatList 
                data={posts}
                renderItem={({ item }) =>
                    <View>
                        <Card mode='outlined'>
                            <Card.Title title={item.title} />
                            <Card.Content>
                                <Text>{item.body}</Text>
                            </Card.Content>
                        </Card>
                    </View>
                }
            />
        </View>
    )
}

