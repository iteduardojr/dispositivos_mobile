import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//Rota
import Home from '../screens/home/Home'
import Usuario from '../screens/usuario/Usuario'
import Posts from '../screens/posts/Posts'



const Stack = createStackNavigator()

export default function Router() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Usuario' component={Usuario}/>
        <Stack.Screen name='Posts' component={Posts}/>

    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})