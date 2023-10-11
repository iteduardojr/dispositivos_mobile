import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

export default function Pessoa({ pessoa }) {


    const avatar = () => {
        return <Avatar.Image size={48} source={{ uri: pessoa.image }} />
    }

    return (
        <View>
            <Card>
                <Card.Title title={pessoa.username} left={avatar} />
                <Card.Content>
                    <View>
                        <Text>Name:</Text>
                        <Text >{pessoa.firstName} {pessoa.lastName}</Text>
                    </View>
                    <View>
                        <Text>Age:</Text>
                        <Text >{pessoa.age}</Text>
                    </View>
                    <View>
                        <Text>E-mail:</Text>
                        <Text >{pessoa.email}</Text>
                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}

