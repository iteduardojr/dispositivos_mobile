import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Usuario from '../components/semana06/Usuario';
import { NavigationContainer } from '@react-navigation/native';
import Posts from '../components/semana06/Posts';


const Tab = createBottomTabNavigator();


export default function Router() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Usuario" component={Usuario} />
                <Tab.Screen name="Posts" component={Posts} />
               
            </Tab.Navigator>
        </NavigationContainer>

    )
}

