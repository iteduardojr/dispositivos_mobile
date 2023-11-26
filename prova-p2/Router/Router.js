import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { DarkTheme, NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../src/screen/home/MovieList'
import PaginaUser from '../src/screen/PaginaUser'
import Formulario from '../src/screen/Formulario' 
import { IconButton } from 'react-native-paper'
import User from '../src/screen/User'

const Stack = createStackNavigator()


export default function Router() {
    const navigation = useNavigation()
    return (
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerStyle: { borderColor: 'white', borderBottomWidth: 2 } }}>
                <Stack.Screen name="Cadastro" component={Formulario} />
                <Stack.Screen name='Home' component={Home} options={{
                    headerRight: () => {
                        return (
                            <IconButton icon='cart-plus' iconColor='white' size={20} onPress={() => navigation.navigate('Cadastro')} />
                        )
                    }
                }} />
                <Stack.Screen name='dinamica' component={PaginaUser} />
                <Stack.Screen name='User' component={User} />
            </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
