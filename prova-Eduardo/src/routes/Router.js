import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../screens/home/Home'
import Restaurantes from '../screens/restaurantes/Restaurantes'
import Posts from '../screens/posts/Posts'

const Stack = createStackNavigator()

export default function Router() {
  return (
<NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Restaurantes' component={Restaurantes}/>
        <Stack.Screen name='Posts' component={Posts}/>

    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})